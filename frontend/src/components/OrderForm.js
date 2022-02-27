import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import './OrderForm.css'
import { newOrder } from '../services/OrderService'
import { connect } from "react-redux";
import { deliveryTypes } from "../services/DeliveryTypesService"

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
        this.state = {
            cart: this.props.location.state ? this.props.location.state.cart : undefined,
            productAmount: this.props.location.state ? this.props.location.state.totalAmount : undefined,
            totalAmount: this.props.location.state ? this.props.location.state.totalAmount : undefined,
            deliveryData: {
                name: '', surname: '', town: '', postalCode: '',
                street: '', phone: '', deliveryTypeId: null, products: null,
            },

        }

    }

    componentDidMount() {
        this.props.fetchDeliveryTypes();
    }


    deliveryHandler = (event) => {
        const delivery = this.props.deliveryTypes[event.target.value - 1];
        this.setState(prevState => ({
            totalAmount: this.state.productAmount + delivery.price,
            deliveryData: { ...prevState.deliveryData, deliveryTypeId: delivery.id }
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
        if (this.props.msg)
            return (
                <div class='orderform-placed-order'>
                    {this.props.msg}
                    <Link to='/myorders' class='orderform-form-details-button'>
                        Moje zamówienia
                    </Link>
                </div>
            );

        const deliveryTypes = this.props.deliveryTypes;
        return (
            <div class='orderform-container'>
                <div class='orderform-form-container'>
                    <form onSubmit={this.sumbitHandler}>
                        <h1>1. Dostawa</h1>
                        {deliveryTypes &&
                            <div onChange={this.deliveryHandler} class='orderform-delivery'>
                                {deliveryTypes.map((delivery) => (
                                    <span>
                                        <input type="radio" value={delivery.id} name="delivery-type" />{delivery.name}
                                    </span>
                                ))}
                            </div>
                        }
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


const mapStateToProps = (state) => {
    return {
        deliveryTypes: state.deliveryTypesReducer.deliveryTypes,
        msg: state.newOrderReducer.msg
    };
};

const mapDispatchToProps = dispatch => {
    return {
        newOrder: (deliveryData) => {
            dispatch(newOrder(deliveryData));
        },
        fetchDeliveryTypes: () => {
            dispatch(deliveryTypes());
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);