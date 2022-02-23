import React from 'react'
import '../MyOrders.css'
import { connect } from "react-redux";
import { adminAllOrders } from '../../services/admin/adminAllOrders'
import { Link } from 'react-router-dom';

class AdminAllOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            increase: 5,
            limit1: 0,
            limit2: 5,
            isEnd: false,
            ordersStatus: [
                { id: 0, name: 'w przygotowaniu', isChecked: false },
                { id: 1, name: 'wysłane', isChecked: false },
                { id: 2, name: 'zakończono', isChecked: false },
                { id: 3, name: 'zwrócono', isChecked: false },
                { id: 4, name: 'anulowano', isChecked: false },
            ]
        }
    }

    handlerScroll = (event) => {
        if (this.props.inProgress)
            return;
        if (this.state.limit2 > this.props.rowsFound + this.state.increase) {
            this.setState({ isEnd: true });
            return;
        }
        if (event.srcElement.documentElement.scrollHeight <=
            event.srcElement.documentElement.scrollTop +
            window.innerHeight) {
            this.setState(prevState => ({ limit1: prevState.limit1 + prevState.increase, limit2: prevState.limit2 + prevState.increase }));
            this.props.ordersFetch({ limit1: this.state.limit1 - this.state.increase, limit2: this.state.limit2 - this.state.increase, status: this.statusSubmit() });
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handlerScroll);
        this.props.ordersFetch({ limit1: this.state.limit1, limit2: this.state.limit2 });
        this.setState(prevState => ({ limit1: prevState.limit1 + prevState.increase, limit2: prevState.limit2 + prevState.increase, status: this.statusSubmit() }));
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
        console.log(result);
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ordersFetch: (props) => {
            dispatch(adminAllOrders(props));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAllOrders);

