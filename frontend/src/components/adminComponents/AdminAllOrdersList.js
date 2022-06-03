import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {adminAllOrders} from '../../services/admin/adminAllOrders'
import {adminOrdersReset} from '../../actions/adminOrderAction'
import DisplayOrderList from "../DisplayOrderList"

const AdminAllOrdersList = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.adminAllOrdersReducer.orders);
    const rowsFound = useSelector(state => state.adminAllOrdersReducer.rowsFound);
    const details =
        {
            limit: {beginning: 0, numOfRows: 4},
            filter: {
                status: useSelector(state => state.adminAllOrdersReducer.filter.status)
            }
        };

    useEffect(() => {
        dispatch(adminOrdersReset());
        dispatch(adminAllOrders(details));
    }, [])


    return <DisplayOrderList orders={orders} rowsFound={rowsFound} details={details} reducerFunction={adminAllOrders} orderLink={'/admin/order'}/>


}


export default AdminAllOrdersList;

