import React from 'react';
const CartContext = React.createContext({
    items: [], //These values are only for auto complete
    totalAmount: 0,
    addItem: (item)=>{},
    removeItem: (id)=>{}
});

export default CartContext;