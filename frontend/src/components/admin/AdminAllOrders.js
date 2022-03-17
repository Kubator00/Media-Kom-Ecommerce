import React, { useState, useEffect } from 'react'
import '../MyOrders.css'
import { useDispatch, useSelector } from "react-redux";
import { adminAllOrders } from '../../services/admin/adminAllOrders'
import { Link } from 'react-router-dom';
import { adminOrdersReset } from '../../actions/adminOrderAction'
import PageButtons from '../PageButtons';

const AdminAllOrders = () => {

    const [ordersStatus, setOrderStatus] = useState(
        [
            { id: 0, name: 'w przygotowaniu', isChecked: false },
            { id: 1, name: 'wysłane', isChecked: false },
            { id: 2, name: 'zakończono', isChecked: false },
            { id: 3, name: 'zwrócono', isChecked: false },
            { id: 4, name: 'anulowano', isChecked: false },
        ]);

    const dispatch = useDispatch();
    const orders = useSelector(state => state.adminAllOrdersReducer.orders);
    const rowsFound = useSelector(state => state.adminAllOrdersReducer.rowsFound);
    useEffect(() => {
        dispatch(adminAllOrders(0, 4));
    }, [])
    useEffect(() => {
        return () => {
            dispatch(adminOrdersReset());
        }
    }, [])
    // componentWillUnmount() {
    //     this.props.reset();
    // }

    // statusHandler = (event) => {
    //     const id = event.target.value;
    //     let orders = [...this.state.ordersStatus];
    //     const editedOrder = {
    //         ...orders[id],
    //         isChecked: !orders[id].isChecked,
    //     }
    //     orders[id] = editedOrder;
    //     this.setState({ ordersStatus: orders });
    // }

    // statusSubmit = () => {
    //     let result = [];
    //     this.state.ordersStatus.forEach(s => {
    //         s.isChecked && result.push(s.name);
    //     });
    //     return result;
    // }
    console.log(orders);

    if (orders)
        return (
            <div className='userOrders-container'>
                {orders.map((order) => (
                    <Link to={`/admin/order/${order.orderId}`} class='userOrders-order'>
                        <div className='userOrders-order-details'>
                            <span>Status: <b>{order.status}</b></span>
                            <span>Data zamówienia: {`${order.date.slice(8, 10)}.${order.date.slice(5, 7)}.${order.date.slice(0, 4)}`}</span>
                            <span>Nr zamówienia: {order.orderId}</span>
                            <span>Łączna kwota: {order.totalAmount}zł</span>
                        </div>

                        <div className='userOrders-order-products'>
                            {order.products.map((product) => (
                                <div className='userOrders-order-products-product'>
                                    <img src={`products/${product.titleImg}`} className='userOrders-order-products-img' />
                                    {product.title}
                                </div>
                            ))}
                        </div>
                    </Link>
                ))}
                <PageButtons rowsFound={rowsFound} elementsOnPage={4} reducerFunction={adminAllOrders} />
            </div>
        );
    return (<div>
        Ładowanie...
    </div>);
}







export default AdminAllOrders;

