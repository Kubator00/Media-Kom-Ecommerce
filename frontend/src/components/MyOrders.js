import React from 'react'
import './MyOrders.css'
import { connect } from "react-redux";
import { userOrders } from '../services/OrderService'
import { Link } from 'react-router-dom'

class MyOrders extends React.Component {
    constructor(props) {
        console.log('ooo');
        super(props);
    }

    componentDidMount() {
        this.props.ordersFetch();
    }
    render() {
        const orders = this.props.orders;
        if (orders)
            return (
                <div className='userOrders-container'>
                    {orders.map((order) => (
                        <Link to={`order:${order.id}`} className='userOrders-order' >
                            <div className='userOrders-order-details'>
                                <span>Status: <b>{order.status}</b></span>
                                <span>Data zamówienia: {`${order.date.slice(8, 10)}.${order.date.slice(5, 7)}.${order.date.slice(0, 4)}`}</span>
                                <span>Nr zamówienia: {order.id}</span>
                                <span>Łączna kwota: {order.totalAmount} zł</span>
                            </div>
                            <div className='userOrders-order-products'>
                                {order.products.map((product) => (
                                    <div className='userOrders-order-products-product'>
                                        <img src={`products/${product.title_img}`} className='userOrders-order-products-img' />
                                        {product.title}
                                    </div>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            );
        return <div>Ładowanie</div>

    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.userOrdersReducer.orders,
        inProgress: state.userOrdersReducer.orders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ordersFetch: () => {
            dispatch(userOrders());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);