import orderStatus from "./orderStatus";
import {Link} from "react-router-dom";
import PageButtons from "./PageButtons";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

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
        <div className='content'>
            <ul className='userOrders-filter'>
                <li className='userOrders-dropdownMenu-activeButton' onClick={filerStatusMenuHandler}>
                    <b>Filtruj</b>
                    <span>Pokaż wszystkie</span>
                </li>
                <ul className={filterStatusMenu ? 'userOrders-dropdownMenu-show' : 'userOrders-dropdownMenu'}>
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
                    }} className='userOrders-filter-button'>
                        Gotowe
                    </button>
                </ul>
            </ul>
            {orders.length < 1 ?
                <div className="userOrders-orderList">Brak wyników</div> :
                <div className="userOrders-orderList">{
                    orders.map((order) => (
                        <Link to={`${orderLink}/${order.orderId}`} className='userOrders-order'>
                            <div className='userOrders-order-details'>
                                <span>Status: <b>{order.status}</b></span>
                                <span>Data zamówienia: {`${order.date.slice(8, 10)}.${order.date.slice(5, 7)}.${order.date.slice(0, 4)}`}</span>
                                <span>Nr zamówienia: {order.orderId}</span>
                                <span>Łączna kwota: {order.totalAmount}zł</span>
                            </div>

                            <div className='userOrders-order-products'>
                                {order.products.map((product) => (
                                    <div className='userOrders-order-products-product'>
                                        <img src={`products/${product.titleImg}`}
                                             className='userOrders-order-products-img'/>
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