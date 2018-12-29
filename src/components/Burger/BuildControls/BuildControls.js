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
        {controls.map(ctrl => ( // for each ingredient...
            <BuildControl 
                key={ctrl.label} // needs key because returning array 
                label ={ctrl.label} // ingredient name
                added={() => props.ingredientAdded(ctrl.type)} // add ingredient
                />
        ))}
    </div>
);

export default buildControls;