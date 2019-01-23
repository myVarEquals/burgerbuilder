import React, {Component} from 'react';
import Aux from '../../hoc/AuxWrap';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import axiosInstance from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        totalPrice: 4,
        purchasable: false,
        checkingOut: false,
        loading: false
    }

    updatePurchaseState (ingredients) {
       
        const sum = Object.keys(ingredients)
            .map(ingredientKey => {
                return ingredients[ingredientKey];
            })
            .reduce((sum, curr) => {
                return sum + curr;
            }, 0);
        this.setState({purchasable: sum > 0});
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
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]; // get old count
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1; // create new count
        const updatedIngredients = {  // copy current ingredeints
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount; // update this ingredients count
        const priceDeduction = INGREDIENT_PRICES[type]; // get cost
        const oldPrice = this.state.totalPrice; // get old price
        const newPrice = oldPrice - priceDeduction; // create new price
        this.setState({ // set state
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    checkingOutHandler = () => {
        this.setState({checkingOut: true});
    }

    closeModalHandler = () => {
        this.setState({checkingOut: false});
    }

    continueCheckOut = () => {
        // alert("Checking out...");
        this.setState({loading: true});
        const order = {
            ingredeints: this.state.ingredients,
            price: this.state.totalPrice, // DONT NORMALLY DO THIS, do math on your server, not customers
            customer: {
                name: 'Roger',
                address: {
                    street: '234 Hello St',
                    zipCode: '45325',
                    country: 'USA',
                },
                email: 'roger@baker.com'
            },
            deliveryTime: 'now'
        };

        axiosInstance.post('/orders', order)
            .then(res => {
                this.setState({checkingOut: false, loading: false});
            })
            .catch(error => {                
                this.setState({checkingOut: false, loading: false});
                console.log(error);
            });
    }

    render() {

        const disabledInfo = { // copy state
            ...this.state.ingredients
        };

        for(let key in disabledInfo) { // loop to find if 0 of given ingredient
            disabledInfo[key] = disabledInfo[key] <= 0; // returns true or false
        }

        let orderSummary = <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        checkOutCancel={this.closeModalHandler}
                        checkOutCont={this.continueCheckOut} />;
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.checkingOut} modalClosed={this.closeModalHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo} // pass disabled obj in to disable buttons
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    checkOut={this.checkingOutHandler}/>
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axiosInstance);