import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useContext, useState, useEffect } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCartButton = props =>{
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;
    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
    // console.log(cartCtx.items);
    const numberOfCartItems = cartCtx.items.reduce((acc,crr)=>acc+crr.amount,0);
    
    const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ""}`;

    useEffect(()=>{
        if(items.length === 0){
            return;
        }
        const timer = setTimeout(()=>{
            setButtonIsHighlighted(false);
        }, 300);
        setButtonIsHighlighted(true);
        return ()=>{
            clearTimeout(timer);
        }
    },[items]);

    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button> 

    );
}

export default HeaderCartButton;