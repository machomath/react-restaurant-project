import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

//this is reducer function for the reducer inside the 
//component. It sits outside the component
const cartReducer = (state, action) => { //action is the object sent by the dispatched
    if(action.type === 'ADD'){
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price*action.item.amount;
        return (
            {
                items: updatedItems,
                totalAmount:updatedTotalAmount
            }
        );
    }
    if(action.type === 'REMOVE'){
        //need to fix it further
    }
    return defaultCartState;
};


const CartProvider = props =>{
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    
    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item: item}); //this is the dispatch of an action
    };
    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE', id: id}); //this is the dispatch of an action
    };

    const cartContext = {
        items: cartState.items, 
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;