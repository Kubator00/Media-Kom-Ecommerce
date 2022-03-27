import React, { useState, useEffect } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import './OrderForm.css'
import { newOrder } from '../services/OrderService'
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveryTypes } from "../services/DeliveryTypesService"
import MyInput from './MyInput';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from "formik";


const OrderForm = () => {
    let location = useLocation();
    const { cart, productsAmount } = location.state;
    const [totalAmount, setTotalAmount] = useState(productsAmount);
    const deliveryTypes = useSelector((state) => state.deliveryTypesReducer.deliveryTypes);
    const msg = useSelector((state) => state.newOrderReducer.msg);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDeliveryTypes());
    }, [dispatch])

    const sumbitHandler = (values) => {
        let productsData = [];
        for (let prod of cart)
            productsData.push({ productId: prod.productId, productAmount: prod.productAmount })

        let data = values;
        data['products'] = productsData;
        dispatch(newOrder(data));
    }

    const deliveryHandler = (event) => {
        const delivery = deliveryTypes[event.target.value - 1];
        setTotalAmount(productsAmount + delivery.price);
    }

    if (!cart)
        return <Navigate to='/' />

    if (msg)
        return (
            <div class='orderform-placed-order'>
                <span>{msg}</span>
                <span>Wkrótce otrzymasz maila z danymi do płatności.</span>
                <span>
                    <Link to='/myorders' class='orderform-form-details-button'>
                        Moje zamówienia
                    </Link>
                </span>
            </div>
        );
    console.log(deliveryTypes);

    return (
        <div class='orderform-container'>
                <Formik
                    initialValues={{
                        name: "",
                        surname:'',
                        town: "",
                        postalCode: "",
                        street: "",
                        deliveryTypeId: '',
                        phone:'',
                    }}
                    onSubmit={(values) => {sumbitHandler(values)}}
                    validationSchema={validate}
                >
                    <Form  class='orderform-form-container' >
                        <h1>1. Dostawa</h1>
                        <ErrorMessage name='deliveryTypeId' component="div" class='form-errorMsg' />
                        {deliveryTypes &&
                            <div class='orderform-delivery' id='orderform-delivery' onChange={deliveryHandler}>
                                {deliveryTypes.map((delivery) => (
                                    <label>
                                        <Field type="radio" value={delivery.deliveryId.toLocaleString()} name="deliveryTypeId" />
                                        {delivery.name} - {delivery.price} zł
                                    </label>
                                ))}
                            </div>
                        }
                        <div class='orderform-form-details'>
                            <h1>2. Dane do wysyłki</h1>
                            <label htmlFor="name">Imię</label>
                            <ErrorMessage name='name' component="div" class='form-errorMsg' />
                            <Field name="name" class="form-control" />

                            <label htmlFor="surname">Nazwisko</label>
                            <ErrorMessage name='surname' component="div" class='form-errorMsg' />
                            <Field name="surname" class="form-control" />

                            <label htmlFor="town">Miejscowość</label>
                            <ErrorMessage name='town' component="div" class='form-errorMsg' />
                            <Field name="town" class="form-control" />

                            <label htmlFor="postalCode">Kod pocztowy</label>
                            <ErrorMessage name='postalCode' component="div" class='form-errorMsg' />
                            <Field name="postalCode" class="form-control" />

                            <label htmlFor="street">Ulica i numer</label>
                            <ErrorMessage name='street' component="div" class='form-errorMsg' />
                            <Field name="street" class="form-control" />

                            <label htmlFor="phone">Telefon</label>
                            <ErrorMessage name='phone' component="div" class='form-errorMsg' />
                            <Field name="phone" class="form-control" />

                        </div>
                        <div class='orderform-form-button-details-button-container'>
                            <button type="submit" class='orderform-form-details-button'>Zamawiam i płacę</button>
                        </div>
                    </Form>
                </Formik>
            <div className='orderform-cart-container'>
                <div className='orderform-cart-cart'>
                    {cart.map((product) => (
                        <Link to={{
                            pathname: '/product/' + product.productId
                        }} className="orderform-cart-product-link">
                            <img src={`products/${product.titleImg}`} className='orderform-img' />
                            <label>{product.title}</label><br />
                            {product.productAmount}szt
                        </Link>
                    ))}
                </div>
                <div class="orderform-cart-container-totalAmountLabel">
                    <h3>Całkowitka kwota: {totalAmount} zł</h3>
                </div>
            </div>
        </div >
    );


}


export default OrderForm;





const validate = yup.object().shape({
    name: yup.string()
        .min(2, "Imię powinno się składać z conajmniej 2 znaków")
        .max(20, "Imię powinno się składać z maksymalnie 20 znaków")
        .matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, "Wpisz poprawne imie")
        .required("Pole jest wymagane"),
    surname: yup.string()
        .min(2, "Imię powinno się składać z conajmniej 2 znaków")
        .max(20, "Imię powinno się składać z maksymalnie 20 znaków")
        .matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, "Wpisz poprawne imie")
        .required("Pole jest wymagane"),
    town: yup.string()
        .min(3, "Miejscowość powinna się składać z conajmniej 3 znaków")
        .max(30, "Miejscowość powinna się składać z maksymalnie 30 znaków")
        .required("Pole jest wymagane"),
    street: yup.string()
        .min(3, "Ulica powinno się składać z conajmniej 3 znaków")
        .max(30, "Ulica powinno się składać z maksymalnie 30 znaków")
        .required("Pole jest wymagane"),
    postalCode: yup.string()
        .min(5, "Kod powinien się składać z conajmniej 5 znaków")
        .max(6, "Kod powinien się składać z maksymalnie 6 znaków")
        .required("Pole jest wymagane"),
    phone: yup.string()
        .min(8, "Telefon powinnien składać się z minimalnie z 8cyfr")
        .max(12, "Telefon powinnien składać się z maksymalnie 12 cyfr")
        .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            "Wpisz poprawny numer telefonu"
        )
        .required("Pole jest wymagane"),
    deliveryTypeId: yup.string("Pole jest wymagane").required("Pole jest wymagane")
})
