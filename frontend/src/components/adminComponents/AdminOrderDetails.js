import React, { useEffect,useState } from 'react'
import '../ordersComponents/OrderDetails.css'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import orderStatus from "../orderStatus";

import { adminOrderDetails, changeOrderStatus } from '../../services/admin/adminOrderDetailsService'


const AdminOrderDetails = () => {

    const { id } = useParams();

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(adminOrderDetails(id));
    }, [])

    const order = useSelector(state => state.adminOrderDetailsReducer.order);
    const inProgress = useSelector(state => state.adminOrderDetailsReducer.inprogress);
    
    if (order && !inProgress)
        return (
            <div className='page-content'>
                <div className='orderdetails-details'>
                    <h1>Zamówienie nr {order.orderId}</h1>
                    <span>złożone {`${order.date.slice(8, 10)}.${order.date.slice(5, 7)}.${order.date.slice(0, 4)}`}</span>
                    <h2>Status</h2>
                    {order.status}
                    <h2>Dostawa</h2>
                    <span>{order.deliveryName}</span>
                    <h2>Dane do wysyłki</h2>
                    <span>{order.name} {order.surname} </span>
                    <span>ul. {order.street} </span>
                    <span>{order.postal_code} {order.town} </span>
                    <h2>Kontakt</h2>
                    <span>Nazwa użytkownika: {order.username}</span>
                    <span>Email: {order.userEmail}</span>
                    <span>Telefon: {order.phone}</span>
                </div>
                <div className='orderdetails-buttons'>
                    <h2>Zmiana statusu</h2>
                    {orderStatus.map((status)=>
                        <button onClick={() => { dispatch(changeOrderStatus(id, status)) }}>{status} </button>
                    )}
                </div>
                <div className='orderdetails-products'>
                    <h2>Zamówienie</h2>
                    {order.products.map((product) => (
                        <div className='orderdetails-products-product'>
                            <Link to={`/product/${product.id}`} className='orderdetails-products-product-left'>
                                <img src={`products/${product.titleImg}`} className='orderdetails-products-product-img' />
                                <span>{product.title}</span>
                            </Link>
                            <div className='orderdetails-products-product-right'>
                                <span>{product.productAmount} szt.</span>
                                <span>{product.productPrice} zł</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='orderdetails-amount'>
                    <span>Wartość koszyka: {order.cartAmount} zł</span>
                    <span>Koszt dostawy: {order.deliveryPrice} zł</span>
                    <span>Razem: {order.totalAmount} zł</span>
                </div>
            </div >
        );
    return <div>Ładowanie...</div>

}



export default AdminOrderDetails;

