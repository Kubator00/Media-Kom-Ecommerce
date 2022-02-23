import React from 'react'
import Axios from "axios"
import { Link } from 'react-router-dom'
import './MyCart.css'
import { fetchCart, productAmount } from '../services/MyCartService'
import { connect } from "react-redux";



class MyCart extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.props.cartFetch();
    }


    render() {
        const cart = this.props.cart; 
        if (cart)
            return (
                <div className="mycart-container">
                    {cart.length < 1 && `Brak przedmiotów w koszyku`}
                    {cart.length > 0 && <h1>Twój koszyk</h1>}
                    {cart.map((product) => (
                        <ul className="mycart-product">
                            <Link to={{
                                pathname: '/product:' + product.id
                            }} className="mycart-product-link">
                                <img src={`./products/${product.title_img}`} className='cart-img' />
                                {product.title}
                            </Link>
                            <div className='mycart-price-label'>
                                <button onClick={() => { this.props.changeAmount({ 'amount': product.amount - 1, 'productId': product.id }) }}>-</button>
                                {`Ilość:  ${product.amount}  `}
                                <button onClick={() => { this.props.changeAmount({ 'amount': product.amount + 1, 'productId': product.id }) }}>+</button><br />
                                {`Cena: ${product.price}zł`}
                            </div>
                        </ul>
                    ))}
                    {cart.length > 0 &&
                        <>
                            Całkowity koszt: {this.props.totalAmount}zł
                            <Link to=
                                {{
                                    pathname: '/orderform',
                                    state: { cart: this.props.cart, totalAmount: this.props.totalAmount }
                                }}>
                                <button>Przejdź do płatności</button>
                            </Link>
                        </>
                    }

                </div>
            );
        return <>Ladowanie...</>;
    }
}


const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.cart,
        totalAmount: state.cartReducer.totalAmount,
        inProgress: state.cartReducer.inprogress,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        cartFetch: () => {
            dispatch(fetchCart());
        },
        changeAmount: (props) => {
            dispatch(productAmount(props));
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(MyCart);