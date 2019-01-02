import React from 'react';
import Button from '../../UI/Button/Button';

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
            <p><strong>Price</strong>: ${props.price.toFixed(2)}</p>
            <p>Checkout?</p>
            <Button clicked={props.checkOutCont} buttonType="Success">CONTINUE</Button>
            <Button clicked={props.checkOutCancel} buttonType="Danger">CANCEL</Button>
        </>
    )
};

export default orderSummary;