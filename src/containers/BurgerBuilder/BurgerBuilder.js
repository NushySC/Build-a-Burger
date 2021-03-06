import React, {Component} from 'react';
import {connect} from 'react-redux';

import Auxi from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

// const INGREDIENT_PRICES = {
// 	salad: 0.5,
// 	cheese: 0.4,
// 	meat: 1.3,
// 	bacon: 0.7,
// 	tomato: 0.6
// };

class BurgerBuilder extends Component {
	// constructor(props) {
	//     super(props);
	//     this.state = {...}
	// }
	state = {
		//ingredients: null,
		//totalPrice: 4,
		//purchasable: false,
		purchasing: false
		// loading: false,
		// error: false
	};

	componentDidMount() {
		this.props.onInitIngredients();
		////TO REDUX
		// axios
		// 	.get('https://build-a-burger-nsh.firebaseio.com/ingredients.json')
		// 	.then(response => {
		// 		this.setState({ingredients: response.data});
		// 	})
		// 	.catch(error => {
		// 		this.setState({error: true});
		// 	});
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	}

	//BEFORE REDUX
	// addIngredientHandler = type => {
	// 	const oldCount = this.state.ingredients[type];
	// 	const updatedCount = oldCount + 1;
	// 	const updatedIngredients = {
	// 		...this.state.ingredients
	// 	};
	// 	updatedIngredients[type] = updatedCount;
	// 	const priceAddition = INGREDIENT_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = oldPrice + priceAddition;
	// 	this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
	// 	this.updatePurchaseState(updatedIngredients);
	// };

	// removeIngredientHandler = type => {
	// 	const oldCount = this.state.ingredients[type];
	// 	if (oldCount <= 0) {
	// 		return;
	// 	}
	// 	const updatedCount = oldCount - 1;
	// 	const updatedIngredients = {
	// 		...this.state.ingredients
	// 	};
	// 	updatedIngredients[type] = updatedCount;
	// 	const priceDeduction = INGREDIENT_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = oldPrice - priceDeduction;
	// 	this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
	// 	this.updatePurchaseState(updatedIngredients);
	// };

	purchaseHandler = () => {
		this.setState({purchasing: true});
	};

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	};

	purchaseContinueHandler = () => {
		//     this.setState({ loading:true })
		//     const order = {
		//         ingredients: this.state.ingredients,
		//         price: this.state.totalPrice,
		//         customer: {
		//             name: "Anuska",
		//             address: {
		//                 street: "Awesome St",
		//                 zipCode: 100700,
		//                 country: "Czechia"
		//             },
		//             email: "email@gmail.com",
		//             deliveryMethod: "fast"
		//         }
		//     }
		//     axios.post('/orders.json', order)
		//     .then( response => {
		//         this.setState({ loading: false, purchasing: false });
		//     } )
		//     .catch(error => {
		//         this.setState({ loading: false, purchasing: false });
		// } );

		//Now in Redux
		// const queryParams = [];
		// for (let i in this.state.ingredients) {
		// 	queryParams.push(
		// 		encodeURIComponent(i) +
		// 			'=' +
		// 			encodeURIComponent(this.state.ingredients[i])
		// 	);
		// }

		// const queryString = queryParams.join('&');
		this.props.history.push(
			'/checkout'
			// pathname: '/checkout',
			// search: '?' + queryString
		);
	};

	render() {
		const disabledInfo = {
			//...this.state.ingredients
			...this.props.ings
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;

		if (this.state.ingredients) {
			orderSummary = (
				<Auxi>
					<OrderSummary
						ingredients={this.props.ings}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
						price={this.props.price}
					/>
				</Auxi>
			);
		}

		// if (this.state.loading) {
		// 	orderSummary = <Spinner />;
		// }
		// {salad: true, meat: false, ...}
		let burger = this.props.error ? (
			<p> Ingredients can't be loaded </p>
		) : (
			<Spinner />
		);

		if (this.props.ings) {
			burger = (
				<Auxi>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						//BEFORE REDUX
						//ingredientAdded={this.addIngredientHandler}
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchasable={this.updatePurchaseState(this.props.ings)}
						price={this.props.price}
						ordered={this.purchaseHandler}
					/>
				</Auxi>
			);
		}
		return (
			<Auxi>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Auxi>
		);
	}
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));