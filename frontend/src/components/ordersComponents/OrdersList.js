import React, {useEffect, useState} from 'react'
import './OrdersList.css'
import {useDispatch, useSelector} from "react-redux";
import DisplayOrderList from '../DisplayOrderList'
import {userOrders} from '../../services/OrderService'

const OrdersList = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.userOrdersReducer.orders);
    const rowsFound = useSelector(state => state.userOrdersReducer.rowsFound);
    const details =
        {
            limit: {beginning: 0, numOfRows: 4},
            filter: {
                status: useSelector(state => state.userOrdersReducer.filter.status)
            }
        };

    useEffect(() => {
        dispatch(userOrders(details));
    }, [])


    return <DisplayOrderList orders={orders} rowsFound={rowsFound} details={details} reducerFunction={userOrders}  orderLink={'order'}/>

}


export default OrdersList;