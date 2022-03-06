import React, { useEffect, useState } from 'react'
import './MyOrders.css'
import { useDispatch, useSelector } from "react-redux";
import { userOrders } from '../services/OrderService'
import { Link } from 'react-router-dom'
import PageButtons from './PageButtons';


const MyOrders = () => {
    const orders = useSelector(state => state.userOrdersReducer.orders);
    const rowsFound = useSelector(state => state.userOrdersReducer.rowsFound);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(userOrders(0,4));
    },[])

    if (orders)
        return (
            <div className='userOrders-container'>
                {orders.map((order) => (
                    <Link to={`order/${order.id}`} className='userOrders-order' >
                        <div className='userOrders-order-details'>
                            <span>Status: <b>{order.status}</b></span>
                            <span>Data zamówienia: {`${order.date.slice(8, 10)}.${order.date.slice(5, 7)}.${order.date.slice(0, 4)}`}</span>
                            <span>Nr zamówienia: {order.id}</span>
                            <span>Łączna kwota: {order.totalAmount} zł</span>
                        </div>
                        <div className='userOrders-order-products'>
                            {order.products.map((product) => (
                                <div className='userOrders-order-products-product'>
                                    <div class='userOrders-order-products-img-container' >
                                        <img src={`products/${product.title_img}`} className='userOrders-order-products-img' />
                                    </div>
                                    {product.title}
                                </div>
                            ))}
                        </div>
                    </Link>
                ))}
                <PageButtons rowsFound={rowsFound} elementsOnPage={4} reducerFunction={userOrders} />
            </div>
        );

    return (
        <div>
            Ładowanie...
        </div>
    );
}


export default MyOrders;