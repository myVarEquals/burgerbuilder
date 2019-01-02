import React from 'react';

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = props => {

    let transformedIngredients = Object.keys(props.ingredients) // make array of all ingredient names
        .map(ingredientKey => { // of each ingredient...
            return [...Array(props.ingredients[ingredientKey])].map((_, i) => { // make array with a length equal to amount of ingredient
                return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />; // return a component for each element in the array with ingredient type
            })
        }) // flatten arrays
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (transformedIngredients.length === 0) { // if no ingredients...
        transformedIngredients = <p>Add your ingredients</p>;
    }   

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;