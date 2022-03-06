import React, { useState, useEffect } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import './OrderForm.css'
import { newOrder } from '../services/OrderService'
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveryTypes } from "../services/DeliveryTypesService"

const MyInput = (props) => {
    const { label, type, name, value, className, onChange } = props;

    return (
        <div>
            <label htmlFor={name}>{label}: </label>
            <input
                name={name}
                id={name}
                type={type}
                value={value}
                className={className}
                onChange={onChange}
            />
        </div>
    )
}


const OrderForm = () => {
    let location = useLocation();
    const { cart, productsAmount } = location.state;
    const [totalAmount, setTotalAmount] = useState(productsAmount);
    let [deliveryData, setDeliveryData] = useState(
        {
            name: '', surname: '', town: '', postalCode: '',
            street: '', phone: '', deliveryTypeId: null, products: null,
        })

    const deliveryTypes = useSelector((state) => state.deliveryTypesReducer.deliveryTypes);
    const msg = useSelector((state) => state.newOrderReducer.msg);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDeliveryTypes());
    }, [dispatch])


    const deliveryHandler = (event) => {
        const delivery = deliveryTypes[event.target.value - 1];
        setDeliveryData(prevState => (
            {
                ...prevState,
                deliveryTypeId: delivery.id
            }
        ));
        setTotalAmount(productsAmount + delivery.price);
    }

    const changeHandler = event => {
        setDeliveryData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    const sumbitHandler = event => {
        event.preventDefault();
        let productsData = [];
        for (let prod of cart)
            productsData.push({ id: prod.id, amount: prod.amount })

        let data = deliveryData;
        data['products'] = productsData;
        dispatch(newOrder(data));
    }

    if (!cart)
        return <Navigate to='/' />

    if (msg)
        return (
            <div class='orderform-placed-order'>
                <span>{msg}</span>
                <span>Wkrótce otrzymasz maila z danymi do płatności.</span>
                <Link to='/myorders' class='orderform-form-details-button'>
                    Moje zamówienia
                </Link>
            </div>
        );


    return (
        <div class='orderform-container'>
            <div class='orderform-form-container'>
                <form onSubmit={sumbitHandler}>
                    <h1>1. Dostawa</h1>
                    {deliveryTypes &&
                        <div onChange={deliveryHandler} class='orderform-delivery'>
                            {deliveryTypes.map((delivery) => (
                                <span>
                                    <input type="radio" value={delivery.id} name="delivery-type" />{delivery.name} - {delivery.price} zł
                                </span>
                            ))}
                        </div>
                    }
                    <div class='orderform-form-details'>
                        <h1>2. Dane do wysyłki</h1>
                        <MyInput label="Imię" type="text" name="name" className="form-control" required onChange={changeHandler} />
                        <MyInput label="Nazwisko" type="text" name="surname" className="form-control" required onChange={changeHandler} />
                        <MyInput label="Miejscowość" type="text" name="town" className="form-control" required onChange={changeHandler} />
                        <MyInput label="Kod pocztowy" type="text" name="postalCode" className="form-control" required onChange={changeHandler} />
                        <MyInput label="Ulica i numer" type="text" name="street" className="form-control" required onChange={changeHandler} />
                        <MyInput label="Telefon" type="text" name="phone" className="form-control" required onChange={changeHandler} />
                    </div>
                    <div class='orderform-form-button-details-button-container'>
                        <button type="submit" class='orderform-form-details-button'>Zamawiam i płacę</button>
                    </div>
                </form>
            </div>
            <div className='orderform-cart-container'>
                {cart.map((product) => (
                    <Link to={{
                        pathname: '/product:' + product.id
                    }} className="orderform-cart-product-link">
                        <img src={`products/${product.title_img}`} className='orderform-img' />
                        <label>{product.title}</label><br />
                        {product.amount}szt
                    </Link>
                ))}
                Całkowitka kwota: {totalAmount} zł
            </div>
        </div>
    );


}


export default OrderForm;