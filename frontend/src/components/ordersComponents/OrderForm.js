import React, {useState, useEffect} from 'react'
import {Link, Navigate, useLocation} from 'react-router-dom'
import './OrderForm.css'
import {newOrder} from '../../services/OrderService'
import {useDispatch, useSelector} from "react-redux";
import {fetchDeliveryTypes} from "../../services/DeliveryTypesService"
import * as yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from "formik";


const OrderForm = () => {
    let location = useLocation();
    const {cart, productsAmount} = location.state;
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
            productsData.push({productId: prod.productId, productAmount: prod.productAmount})

        let data = values;
        data['products'] = productsData;
        dispatch(newOrder(data));
    }

    const deliveryHandler = (event) => {
        const delivery = deliveryTypes[event.target.value - 1];
        setTotalAmount(productsAmount + delivery.price);
    }

    if (!cart)
        return <Navigate to='/'/>

    if (msg)
        return (
            <div class='orderForm__placedOrder content'>
                <span>{msg}</span>
                <span>Wkrótce otrzymasz maila z danymi do płatności.</span>
                <span>
                    <Link to='/orderslist' class='orderForm__button {'>
                        Moje zamówienia
                    </Link>
                </span>
            </div>
        );

    return (
        <div class='orderForm content'>
            <Formik
                initialValues={{
                    name: "",
                    surname: '',
                    town: "",
                    postalCode: "",
                    street: "",
                    deliveryTypeId: '',
                    phone: '',
                }}
                onSubmit={(values) => {
                    sumbitHandler(values)
                }}
                validationSchema={validate}
            >
                <Form>
                    <h1>1. Dostawa</h1>
                    <ErrorMessage name='deliveryTypeId' component="div" class='orderForm__errorMsg'/>
                    {deliveryTypes &&
                        <div class='orderForm__delivery' onChange={deliveryHandler}>
                            {deliveryTypes.map((delivery) => (
                                <label>
                                    <Field type="radio" value={delivery.deliveryId.toLocaleString()}
                                           name="deliveryTypeId"/>
                                    {delivery.name} - {delivery.price} zł
                                </label>
                            ))}
                        </div>
                    }
                    <div class='orderForm__details'>
                        <h1>2. Dane do wysyłki</h1>
                        <label htmlFor="name">Imię</label>
                        <ErrorMessage name='name' component="div" class='orderForm__errorMsg'/>
                        <Field name="name"/>

                        <label htmlFor="surname">Nazwisko</label>
                        <ErrorMessage name='surname' component="div" class='orderForm__errorMsg'/>
                        <Field name="surname"/>

                        <label htmlFor="town">Miejscowość</label>
                        <ErrorMessage name='town' component="div" class='orderForm__errorMsg'/>
                        <Field name="town"/>

                        <label htmlFor="postalCode">Kod pocztowy</label>
                        <ErrorMessage name='postalCode' component="div" class='orderForm__errorMsg'/>
                        <Field name="postalCode"/>

                        <label htmlFor="street">Ulica i numer</label>
                        <ErrorMessage name='street' component="div" class='orderForm__errorMsg'/>
                        <Field name="street"/>

                        <label htmlFor="phone">Telefon</label>
                        <ErrorMessage name='phone' component="div" class='orderForm__errorMsg'/>
                        <Field name="phone"/>

                    </div>
                    <button className='orderForm__button' type="submit">Zamawiam i płacę</button>
                </Form>
            </Formik>
            <div className='orderForm__cart'>
                <div className='orderForm__productList'>
                    {cart.map((product) => (
                        <Link to={{
                            pathname: '/product/' + product.productId
                        }} className="orderForm__product">
                            <img src={`products/${product.titleImg}`} alt={`zdjęcie ${product.title}`}/>
                            <label>{product.title}</label><br/>
                            {product.productAmount}szt
                        </Link>
                    ))}
                </div>
                <div class="orderForm__totalAmount">
                    <h3>Całkowitka kwota: {totalAmount} zł</h3>
                </div>
            </div>
        </div>
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
