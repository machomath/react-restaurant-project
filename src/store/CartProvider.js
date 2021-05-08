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
        const updatedTotalAmount = state.totalAmount + action.item.price*action.item.amount;
        let updatedItems;
        const existingCartItemIndex = state.items.findIndex(item=>item.id === action.item.id);
        
        if(existingCartItemIndex === -1){
            updatedItems = state.items.concat(action.item);
        }else{
            state.items[existingCartItemIndex].amount += action.item.amount;
            updatedItems = [...state.items];
        }
        return (
            {
                items: updatedItems,
                totalAmount:updatedTotalAmount
            }
        );
    }
    if(action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex(item=>item.id === action.id);
        const updatedTotalAmount = state.totalAmount - state.items[existingCartItemIndex].price;

        if(state.items[existingCartItemIndex].amount > 1){
            state.items[existingCartItemIndex].amount--;
        }else{
            state.items.splice(existingCartItemIndex, 1);
        }
        let updatedItems = [...state.items];
        return (
            {
                items: updatedItems,
                totalAmount:updatedTotalAmount
            }
        );
        
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