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

    const deleteAll = () => {
        cart.forEach(element => {
            dispatch(changeProductAmount(element.productId, 0));
        });
    };

    if (cart?.length < 1)
        return (
            <div className="mycart-container">
                <h1>Brak produktów w koszyku</h1>
            </div>
        );
    if (cart)
        return (
            <div className="mycart-container">
                <div className="mycart-cart">
                    <div className="mycart-cart-title">
                        <h1>Twój koszyk</h1>
                        <div class="mycart-cart-deleteAll" onClick={() => { deleteAll() }}>
                            <img src='./icons/trash.svg' class="mycart-cart-icon" style={{ "marginLeft": "10px" }} />
                            Wyczyść wszystko
                        </div>
                    </div>
                    {cart.map((product) => (
                        <div className="mycart-product">
                            <Link to={{
                                pathname: '/product/' + product.productId
                            }} className="mycart-product-link">
                                <div class='cart-img-container'>
                                    <img src={`./products/${product.titleImg}`} className='cart-img' />
                                </div>
                                {product.title}
                            </Link>
                            <div className='mycart-price-label'>
                                <h3> {`${product.price}zł`} </h3>
                                <div className='mycart-price-changeAmount'>
                                    <img src='./icons/minus.svg' onClick={() => { dispatch(changeProductAmount(product.productId, product.productAmount - 1)) }} class="mycart-cart-icon" style={{ "margin-right": "3px", "margin-left": "3px" }} />
                                    <label>
                                        {`Ilość:  ${product.productAmount}  `}
                                    </label>
                                    <img src='./icons/add.svg' onClick={() => { dispatch(changeProductAmount(product.productId, product.productAmount + 1)) }} class="mycart-cart-icon" style={{ "margin-left": "3px" }} />
                                </div>
                                <img src='./icons/trash.svg' onClick={() => { dispatch(changeProductAmount(product.productId, 0)) }} class="mycart-cart-icon" style={{ "margin-left": "10px" }} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mycart-summary">
                    <>
                        <span>
                            <h3> Całkowity koszt </h3>
                            <h3> {totalAmount}zł </h3>
                        </span>
                        <Link to={'/orderform'}
                            state={{ cart: cart, productsAmount: totalAmount }}
                            class="mycart-summary-button"
                        >
                            Przejdź do dostawy
                        </Link>
                    </>
                </div>
            </div>
        );
    return <>Ladowanie...</>;

}



export default MyCart;