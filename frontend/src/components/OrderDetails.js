import React from 'react'
import './OrderDetails.css'
import { Link, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { userOrderDetails } from '../services/UserOrderDetailsService'



class OrderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: parseInt(props.location.pathname.slice(7, (props.location.pathname.length))),
            cartAmount: 0,
        }
      
    }
    componentDidMount() {
        this.props.userOrderDetails(this.state.orderId);

    }
    componentDidUpdate(prevState) {
        if (!prevState.details && this.props.details) {
            let tmp = 0;
            this.props.details.products.forEach(element => {
                tmp += element.price*element.amount;
            });
            this.setState({ cartAmount: tmp });
        }
    }

    render() {
        const order = this.props.details;
        if (this.props.error == 'user_id_error')
            return <Redirect to='/' />;

        if (order && !this.props.inProgress)
            return (
                <div className='orderdetails-container'>
                    <div className='orderdetails-details'>
                        <h1>Zamówienie nr {order.id}</h1>
                        <span>złożone {`${order.date.slice(8, 10)}.${order.date.slice(5, 7)}.${order.date.slice(0, 4)}`}</span>
                        <h2>Dostawa</h2>
                        <span>{order.deliveryName}</span>
                        <h2>Dane do wysyłki</h2>
                        <span>{order.name} {order.surname} </span>
                        <span>ul. {order.street} </span>
                        <span>{order.postal_code} {order.town} </span>
                        <span>{order.phone}</span>
                    </div>
                    <div className='orderdetails-products'>
                        <h2>Zamówienie</h2>
                        {order.products.map((product) => (
                            <div className='orderdetails-products-product'>
                                <Link to={`/product:${product.id}`} className='orderdetails-products-product-left'>
                                    <img src={`products/${product.title_img}`} className='orderdetails-products-product-img' />
                                    <span>{product.title}</span>
                                </Link>
                                <div className='orderdetails-products-product-right'>
                                    <span>{product.amount} szt.</span>
                                    <span>{product.price} zł</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='orderdetails-amount'>
                        <span>Wartość koszyka: {this.state.cartAmount} zł</span>
                        <span>Koszt dostawy: {order.delivery_cost} zł</span>
                        <span>Razem: {order.totalAmount} zł</span>
                    </div>
                </div >
            );
        return <div>Ładowanie...</div>
    }
}

const mapStateToProps = (state) => {
    return {
        details: state.userOrderDetailsReducer.order,
        inProgress: state.userOrderDetailsReducer.inprogress,
        error: state.userOrderDetailsReducer.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userOrderDetails: (orderId) => {
            dispatch(userOrderDetails(orderId));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);