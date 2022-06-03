import orderStatus from "./orderStatus";
import {Link} from "react-router-dom";
import PageButtons from "./PageButtons";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import './ordersComponents/OrderList.css'

const DisplayOrderList = (props) => {
    const dispatch = useDispatch();
    const {orders, rowsFound, reducerFunction, orderLink} = props;
    const [details, setDetails] = useState(props.details);
    const [filterStatusMenu, setFilterStatusMenu] = useState(false);
    const filerStatusMenuHandler = () => setFilterStatusMenu(!filterStatusMenu);
    const filterStatusHandler = (event) => {
        const tmp = details.filter.status;
        if (tmp.includes(event.target.value))
            tmp.splice(tmp.findIndex((e) => e === event.target.value), 1)
        else
            tmp.push(event.target.value)
        dispatch(reducerFunction('status', tmp));
    }

    if (!orders)
        return <div> Ładowanie...</div>

    return (
        <div className='orders content'>
            <ul className='orders__filter'>
                <li className='orders__dropdownMenu' onClick={filerStatusMenuHandler}>
                    <b>Filtruj</b>
                    <span>Pokaż wszystkie</span>
                </li>
                <ul className={filterStatusMenu ? 'userOrders__dropdownMenu-show' : 'orders__dropdownMenu--hidden'}>
                    <b>Status:</b>
                    {orderStatus?.map((status) =>
                        <li>
                            <input type='checkbox' value={status} onChange={filterStatusHandler}
                                   defaultChecked={details.filter.status.includes(status)}/>
                            {status}
                        </li>
                    )}
                    <button onClick={() => {
                        filerStatusMenuHandler();
                        setDetails({...details, limit: {...details.limit, beginning: 0}});
                        dispatch(reducerFunction({...details, limit: {...details.limit, beginning: 0}}))
                    }} className='orders__filterButton'>
                        Gotowe
                    </button>
                </ul>
            </ul>
            {orders.length < 1 ?
                <div className="orders__list">Brak wyników</div> :
                <div className="orders__list">{
                    orders.map((order) => (
                        <Link to={`${orderLink}/${order.orderId}`} className='orders__order'>
                            <div className='orders__orderDetails'>
                                <span>Status: <b>{order.status}</b></span>
                                <span>Data zamówienia: {`${order.date.slice(8, 10)}.${order.date.slice(5, 7)}.${order.date.slice(0, 4)}`}</span>
                                <span>Nr zamówienia: {order.orderId}</span>
                                <span>Łączna kwota: {order.totalAmount}zł</span>
                            </div>

                            <div className='orders__images'>
                                {order.products.map((product) => (
                                    <div className='orders__img'>
                                        <img src={`products/${product.titleImg}`}/>
                                        {product.title}
                                    </div>
                                ))}
                            </div>
                        </Link>
                    ))
                }
                </div>
            }
            <PageButtons rowsFound={rowsFound} elementsOnPage={4} reducerFunction={reducerFunction}
                         argsFunction={details}/>
        </div>
    );
}
export default DisplayOrderList;