import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './MyCart.css'
import { fetchCart, changeProductAmount } from '../services/MyCartService'
import { useDispatch, useSelector } from "react-redux";



const MyCart = () => {
    const cart = useSelector(state => state.cartReducer.cart);
    const totalAmount = useSelector(state => state.cartReducer.totalAmount);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCart());
    }, [])

    if (cart)
        return (
            <div className="mycart-container">
                {cart.length < 1 && `Brak przedmiotów w koszyku`}
                {cart.length > 0 && <h1>Twój koszyk</h1>}
                {cart.map((product) => (
                    <ul className="mycart-product">
                        <Link to={{
                            pathname: '/product/' + product.id
                        }} className="mycart-product-link">
                            <div class='cart-img-container'>
                                <img src={`./products/${product.title_img}`} className='cart-img' />
                            </div>
                            {product.title}
                        </Link>
                        <div className='mycart-price-label'>
                            <button onClick={() => { dispatch(changeProductAmount(product.id, product.amount - 1)) }}>-</button>
                            {`Ilość:  ${product.amount}  `}
                            <button onClick={() => { dispatch(changeProductAmount(product.id, product.amount + 1)) }}>+</button><br />
                            {`Cena: ${product.price}zł`}
                        </div>
                    </ul>
                ))}
                {cart.length > 0 &&
                    <>
                        Całkowity koszt: {totalAmount}zł
                        <Link to={'/orderform'}
                            state={{ cart: cart, productsAmount: totalAmount }}
                        >
                            <button>Przejdź do płatności</button>
                        </Link>
                    </>
                }

            </div>
        );
    return <>Ladowanie...</>;

}



export default MyCart;