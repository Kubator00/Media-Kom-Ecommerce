import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import './Cart.css'
import {fetchCart, changeProductAmount} from '../../services/MyCartService'
import {useDispatch, useSelector} from "react-redux";
import Loading from "../Loading";


const UserCart = () => {
    const cart = useSelector(state => state.cartReducer.cart);
    const totalAmount = useSelector(state => state.cartReducer.totalAmount);
    const inProgress = useSelector(state => state.cartReducer.inprogress);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCart());
    }, [])

    const deleteAll = () => {
        cart.forEach(element => {
            dispatch(changeProductAmount(element.productId, 0));
        });
    };

    if (inProgress)
        return Loading();

    if (cart?.length < 1)
        return (
            <div className='cart cart--noProducts content'>
                <h1>Brak produktów w koszyku</h1>
            </div>
        );
    if (cart)
        return (
            <div className="cart content">
                <div className="cart__content">
                    <div className="cart__header">
                        <h1>Twój koszyk</h1>
                        <div class="cart__deleteAll" onClick={() => {
                            deleteAll()
                        }}>
                            <img src='./icons/trash.svg' alt='kosz'/>
                            Wyczyść wszystko
                        </div>
                    </div>
                    {cart.map((product) => (
                        <div className="cart__product">
                            <Link to={{
                                pathname: '/product/' + product.productId
                            }}>
                                <div class='cart__productImg'>
                                    <img src={`./products/${product.titleImg}`} alt={`${product.title}`}/>
                                </div>
                                {product.title}
                            </Link>
                            <div className='cart__priceAmount'>
                                <h3> {product.price.toLocaleString('pl-PL', {style: 'currency', currency: 'PLN'})} </h3>
                                <div className='cart__changeAmount'>
                                    <img src='./icons/minus.svg' alt='minus' onClick={() => {
                                        dispatch(changeProductAmount(product.productId, product.productAmount - 1))
                                    }} class="cart__icon" style={{"margin-right": "3px", "margin-left": "3px"}}/>
                                    <span>
                                        {`Ilość:  ${product.productAmount}  `}
                                    </span>
                                    <img src='./icons/add.svg' alt='plus' onClick={() => {
                                        dispatch(changeProductAmount(product.productId, product.productAmount + 1))
                                    }} class="cart__icon" style={{"margin-left": "3px"}}/>
                                </div>
                                <img src='./icons/trash.svg' alt='kosz' onClick={() => {
                                    dispatch(changeProductAmount(product.productId, 0))
                                }} class="cart__icon" style={{"margin-left": "10px"}}/>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cart__summary">
                    <>
                        <span>
                            <h3> Całkowity koszt </h3>
                            <h3> {totalAmount.toLocaleString('pl-PL', {style: 'currency', currency: 'PLN'})} </h3>
                        </span>
                        <Link to={'/orderform'}
                              state={{cart: cart, productsAmount: totalAmount}}
                              class>
                            Przejdź do dostawy
                        </Link>
                    </>
                </div>
            </div>
        );
    return <>Ladowanie...</>;

}


export default UserCart;