import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {
	//Now In Redux
	// state = {
	// 	ingredients: null,
	// 	price: 0
	// };

	//Nos in Redux
	// componentWillMount() {
	// 	const query = new URLSearchParams(this.props.location.search);
	// 	const ingredients = {};
	// 	let price = 0;
	// 	for (let param of query.entries()) {
	// 		if (param[0] === 'price') {
	// 			price = param[1];
	// 		} else {
	// 			ingredients[param[0]] = +param[1];
	// 		}
	// 	}
	// 	this.setState({ingredients: ingredients, totalPrice: price});
	// }

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.props.ings}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}
				/>
				<Route
					path={this.props.match.path + '/contact-data'}
					component = {ContactData}
					//Now in Redux
					// render={props => (
					// 	<ContactData
					// 		ingredients={this.state.ingredients}
					// 		price={this.props.price}
					// 		{...props}
						/>
					)}
				/>
			</div>
		);
	}
}

const mapStatetoProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	};
};

export default connect(mapStatetoProps)(Checkout);
