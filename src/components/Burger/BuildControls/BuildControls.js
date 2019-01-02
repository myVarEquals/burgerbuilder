import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
];

const buildControls = props => (
    <div className={classes.BuildControls}>
        <p>Current Price: $<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => ( // for each ingredient...
            <BuildControl // make a control component
                key={ctrl.label} // needs key because returning array 
                label ={ctrl.label} // ingredient name
                added={() => props.ingredientAdded(ctrl.type)} // add ingredient
                removed={() => props.ingredientRemoved(ctrl.type)} // remove ingredient
                disabled={props.disabled[ctrl.type]} // true or false for given ingredient
                />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.checkOut}>ORDER NOW</button>
    </div>
);

export default buildControls;