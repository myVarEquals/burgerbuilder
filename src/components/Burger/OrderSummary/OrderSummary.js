import React from 'react';

const orderSummary = props => {
    
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return (
            <li key={ingredientKey}>
                <span style={{textTransform: "capitalize"}}>{ingredientKey}</span>: {props.ingredients[ingredientKey]}
            </li>
            )
        })

    return (
        <>
            <h3>Your Order:</h3>
            <p>Burger:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Checkout Now!</p>
        </>
    )
};

export default orderSummary;