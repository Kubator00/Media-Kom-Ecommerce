import React from 'react'
import '../MyOrders.css'
import { connect } from "react-redux";
import { adminAllOrders } from '../../services/admin/adminAllOrders'
import { Link } from 'react-router-dom';
import { adminOrdersReset } from '../../actions/adminOrderAction'

class AdminAllOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnd: false,
            ordersStatus: [
                { id: 0, name: 'w przygotowaniu', isChecked: false },
                { id: 1, name: 'wysłane', isChecked: false },
                { id: 2, name: 'zakończono', isChecked: false },
                { id: 3, name: 'zwrócono', isChecked: false },
                { id: 4, name: 'anulowano', isChecked: false },
            ],
        }
    }

    handlerScroll = (event) => {
        if (this.props.inProgress)
            return;
        if (this.props.limits.end > this.props.rowsFound + 5) {
            this.setState({ isEnd: true });
            return;
        }
        if (event.srcElement.documentElement.scrollHeight <=
            event.srcElement.documentElement.scrollTop +
            window.innerHeight+1) {
            this.props.ordersFetch(this.props.limits);
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handlerScroll);
        this.props.ordersFetch(this.props.limits);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handlerScroll);
        this.props.reset();
    }

    statusHandler = (event) => {
        const id = event.target.value;
        let orders = [...this.state.ordersStatus];
        const editedOrder = {
            ...orders[id],
            isChecked: !orders[id].isChecked,
        }
        orders[id] = editedOrder;
        this.setState({ ordersStatus: orders });
    }

    statusSubmit = () => {
        let result = [];
        this.state.ordersStatus.forEach(s => {
            s.isChecked && result.push(s.name);
        });
        return result;
    }

    render() {
        const orders = this.props.orders;
        if (orders.length > 0)
            return (
                <div className='userOrders-container'>
                    {/* <form onSubmit={this.submitHandler} onChange={this.statusHandler} class='userOrders-status-container'>
                        <h2>Status:</h2>
                        {
                            this.state.ordersStatus.map((status) => (
                                <span>
                                    <span><input type="checkbox" value={status.id} name="orderStatus" />{status.name}</span>
                                </span>
                            ))
                        }
                        <br></br>
                        <buttton type='submit'>Filtruj</buttton>
                    </form> */}
                    {orders.map((order) => (
                        <Link to={`/admin/order:${order.id}`} class='userOrders-order'>
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
                    {this.state.isEnd && 'Koniec wyników'}
                    {this.props.inProgress && `Ładowanie`}
                </div>
            );
        return <div>Ładowanie...</div>
    }
}


const mapStateToProps = (state) => {
    return {
        orders: state.adminAllOrdersReducer.orders,
        rowsFound: state.adminAllOrdersReducer.rowsFound,
        inProgress: state.adminAllOrdersReducer.inprogress,
        limits: state.adminAllOrdersReducer.limits,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ordersFetch: (limits) => {
            dispatch(adminAllOrders(limits));
        },
        reset: () => {
            dispatch(adminOrdersReset());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAllOrders);

