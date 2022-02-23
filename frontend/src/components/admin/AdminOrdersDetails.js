import React from 'react'
import '../OrderDetails.css'
import { connect } from "react-redux";
import { adminOrderDetails, changeOrderStatus } from '../../services/admin/adminOrderDetailsService'
import { Link } from 'react-router-dom'

class AdminOrderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: parseInt(props.location.pathname.slice(13, (props.location.pathname.length))),
            cartAmount: 0,
        }

    }

    componentDidMount() {
        this.props.orderDetails(this.state.orderId);
    }

    componentDidUpdate(prevState) {
        if (!prevState.order && this.props.order) {
            let tmp = 0;
            this.props.order.products.forEach(element => {
                tmp += element.price;
            });
            this.setState({ cartAmount: tmp });
        }
    }


    render() {
        const order = this.props.order;
        if (order && !this.props.inProgress)
            return (
                <div className='orderdetails-container'>
                    <div className='orderdetails-details'>
                        <h1>Zamówienie nr {order.id}</h1>
                        <span>złożone {`${order.date.slice(8, 10)}.${order.date.slice(5, 7)}.${order.date.slice(0, 4)}`}</span>
                        <h2>Status</h2>
                        {order.status}
                        <h2>Dostawa</h2>
                        <span>{order.delivery_type}</span>
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
                        <button onClick={() => { this.props.newStatus(this.state.orderId, 'w przygotowaniu') }}>W przygotowaniu</button>
                        <button onClick={() => { this.props.newStatus(this.state.orderId, 'wysłane') }}>Wysłane</button>
                        <button onClick={() => { this.props.newStatus(this.state.orderId, 'zakończono') }}>Zakończono</button>
                        <button onClick={() => { this.props.newStatus(this.state.orderId, 'zwrócono') }}>Zwrócono</button>
                        <button onClick={() => { this.props.newStatus(this.state.orderId, 'anulowano') }}>Anulowano</button>
                    </div>
                    <div className='orderdetails-products'>
                        <h2>Zamówienie</h2>
                        {order.products.map((product) => (
                            <div className='orderdetails-products-product'>
                                <Link to={`/product:${product.id}`} className='orderdetails-products-product-left'>
                                    <img src={`products/${product.title_img}`}className='orderdetails-products-product-img' />
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
        order: state.adminOrderDetailsReducer.order,
        inProgress: state.adminOrderDetailsReducer.inprogress,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        orderDetails: (orderId) => {
            dispatch(adminOrderDetails(orderId));
        },
        newStatus: (orderId, status) => {
            dispatch(changeOrderStatus(orderId, status));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrderDetails);

