import React, { useEffect } from 'react'
import './OrderDetails.css'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { userOrderDetails } from '../../services/UserOrderDetailsService'


const OrderDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(userOrderDetails(id));
    }, [])

    const order = useSelector(state => state.userOrderDetailsReducer.order);
    const inProgress = useSelector(state => state.userOrderDetailsReducer.inprogress);
    const error = useSelector(state => state.userOrderDetailsReducer.error);

    if (error)
        return <Navigate to='/' />;

    if (order && !inProgress)
        return (
            <div className='orderDetails content'>
                <div className='orderDetails_info'>
                    <h1>Zamówienie nr {order.orderId}</h1>
                    <span>złożone {`${order.date.slice(8, 10)}.${order.date.slice(5, 7)}.${order.date.slice(0, 4)}`}</span>
                    <h2>Dostawa</h2>
                    <span>{order.deliveryName}</span>
                    <h2>Dane do wysyłki</h2>
                    <span>{order.name} {order.surname} </span>
                    <span>ul. {order.street} </span>
                    <span>{order.postalCode} {order.town} </span>
                    <span>{order.phone}</span>
                </div>
                <div className='orderDetails__productList'>
                    <h2>Zamówienie</h2>
                    {order.products.map((product) => (
                        <div className='orderDetails__product'>
                            <Link to={`/product/${product.productId}`} className='orderDetails_productName'>
                                <img src={`products/${product.titleImg}`} alt={`zdjęcie ${product.title}`} />
                                <span>{product.title}</span>
                            </Link>
                            <div className='orderDetails_productPriceAmount'>
                                <span>{product.productAmount} szt.</span>
                                <span> {product.productPrice.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <ul className='orderDetails__amount'>
                    <li>
                        <ul>Wartość koszyka:</ul> <ul>{order.cartAmount.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}</ul>
                    </li>
                    <li>
                        <ul>Koszt dostawy: </ul> <ul>{order.deliveryPrice.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}</ul>
                    </li>
                    <li>
                        <ul>Razem:</ul> <ul>{order.totalAmount.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}</ul>
                    </li>

                </ul >
            </div >
        );

    return <div>Ładowanie...</div>

}

export default OrderDetails;