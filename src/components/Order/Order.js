import React from 'react';

import styles from './Order.module.css';

const order = ( props ) => {
    const ingredients = [];

    for ( let ingredientName in props.ingredients ) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0.5rem ',
                border: '1px solid #ccc',
                padding: '0.2rem'
                }}
            key={ig.name}>{ig.name} ({ig.amount})</span>;
    });

    return (
        <div className={styles.Order}>
            <p className= {styles.ingredients}>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat( props.price ).toFixed( 2 )}</strong></p>
        </div>
    );
};

export default order;