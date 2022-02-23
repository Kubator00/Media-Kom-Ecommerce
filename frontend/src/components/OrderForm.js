import React from 'react'
import Axios from "axios"
import { Link, Redirect } from 'react-router-dom'
import './OrderForm.css'
import { productAmount } from '../services/MyCartService'
import { newOrder } from '../services/OrderService'
import { connect } from "react-redux";

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


class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.state);
        this.state = {
            cart: this.props.location.state ? this.props.location.state.cart : undefined,
            productAmount: this.props.location.state ? this.props.location.state.totalAmount : undefined,
            totalAmount: this.props.location.state ? this.props.location.state.totalAmount : undefined,
            deliveryData: {
                name: '', surname: '', town: '', postalCode: '',
                street: '', phone: '', deliveryName: '',
                deliveryCost: null, products: null,
            },
            deliveryTypes: [
                { id: 1, name: 'List Polecony', price: 10 },
                { id: 2, name: 'Kurier DPD', price: 25 },
            ],
        }

    }


    deliveryHandler = (event) => {
        const delivery = this.state.deliveryTypes[event.target.value - 1];
        this.setState(prevState => ({
            totalAmount: this.state.productAmount + delivery.price,
            deliveryData: { ...prevState.deliveryData, deliveryName: delivery.name, deliveryCost: delivery.price }
        }));
    }

    changeHandler = event => {
        this.setState(prevState => ({
            deliveryData: {
                ...prevState.deliveryData,
                [event.target.name]: event.target.value
            }
        }));

    };

    sumbitHandler = event => {
        event.preventDefault();
        let productsData = [];
        for (let prod of this.state.cart)
            productsData.push({ id: prod.id, amount: prod.amount })

        let data = this.state.deliveryData;
        data['products'] = productsData;

        this.props.newOrder(data);
    }


    render() {
        if (!this.state.cart)
            return <Redirect to='/' />
        return (
            <div class='orderform-container'>
                <div class='orderform-form-container'>
                    <form onSubmit={this.sumbitHandler}>
                        <h1>1. Dostawa</h1>
                        <div onChange={this.deliveryHandler} class='orderform-delivery'>
                            <span><input type="radio" value={1} name="delivery-type" />{this.state.deliveryTypes[0].name}</span>
                            <span><input type="radio" value={2} name="delivery-type" />{this.state.deliveryTypes[1].name}</span>
                        </div>
                        <div class='orderform-form-details'>
                            <h1>2. Dane do wysyłki</h1>
                            <MyInput label="Imię" type="text" name="name" className="form-control" required onChange={this.changeHandler} />
                            <MyInput label="Nazwisko" type="text" name="surname" className="form-control" required onChange={this.changeHandler} />
                            <MyInput label="Miejscowość" type="text" name="town" className="form-control" required onChange={this.changeHandler} />
                            <MyInput label="Kod pocztowy" type="text" name="postalCode" className="form-control" required onChange={this.changeHandler} />
                            <MyInput label="Ulica i numer" type="text" name="street" className="form-control" required onChange={this.changeHandler} />
                            <MyInput label="Telefon" type="text" name="phone" className="form-control" required onChange={this.changeHandler} />
                        </div>
                        <div class='orderform-form-button-details-button-container'>
                            <button type="submit" class='orderform-form-details-button'>Zamawiam i płacę</button>
                        </div>
                    </form>
                </div>
                <div className='orderform-cart-container'>
                    {this.state.cart.map((product) => (
                        <Link to={{
                            pathname: '/product:' + product.id
                        }} className="orderform-cart-product-link">
                            <img src={`products/${product.title_img}`} className='orderform-img' />
                            <label>{product.title}</label><br />
                            {product.amount}szt
                        </Link>
                    ))}
                    Całkowitka kwota: {this.state.totalAmount} zł
                </div>
            </div>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
        newOrder: (deliveryData) => {
            dispatch(newOrder(deliveryData));
        },
    }
}


export default connect(null, mapDispatchToProps)(OrderForm);