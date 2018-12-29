import React, {Component} from 'react';
import Aux from '../../hoc/AuxWrap';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.75,
    meat: 3,
    bacon: 1
}

class BurgerBuilder extends Component {
    
    state = {
        ingredients: { // item count
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]; // get old count
        const updatedCount = oldCount + 1; // create new count
        const updatedIngredients = {  // copy current ingredeints
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount; // update this ingredients count
        const priceAddition = INGREDIENT_PRICES[type]; // get cost
        const oldPrice = this.state.totalPrice; // get old price
        const newPrice = oldPrice + priceAddition; // create new price
        this.setState({ // set state
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
    }

    removeIngredientHandler = (type) => {
        
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;