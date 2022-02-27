import React from 'react'
import { Link, Redirect, Route } from "react-router-dom";
import './Product.css'
import axios from 'axios';
import { connect } from 'react-redux'
import { addToCart } from '../services/MyCartService'



class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: parseInt(props.location.pathname.slice(9, (props.location.pathname.length))),
            title: "",
            description: "",
        };
    }

    async read() {
        await axios.post(`http://localhost:3010/product`, { 'id': this.state.productId })
            .then(result => {
                console.log(result);
                this.setState({
                    title: result.data.product.title,
                    price: result.data.product.price,
                    description: result.data.product.description,
                    title_img: result.data.product.title_img,
                });
            });
    }


    componentDidMount() {
        this.read();
    }
    componentDidUpdate() {
        console.log(this.props.msg);
    }

    render() {
        return (
            <div className="product-container">
                <div className="section1">
                    <div className="product-photos-section">
                        <img src={`../products/${this.state.title_img}`} className={`product-img`} />
                    </div>
                    <div className="product-purchase">
                        <div className="product-title">
                            <h1>{this.state.title}</h1>
                            <h1>{this.state.price}zł</h1>
                        </div>
                        {this.props.msg&&this.props.msg}
                        <div className="product-buttons">
                            <button className="product-button" id="product-cart-button" onClick={() => { this.props.addToCart(this.state.productId, 1) }}>Dodaj do koszyka</button>

                            <Link to=
                                {{
                                    pathname: '/orderform',
                                    state: {
                                        cart:
                                            [{ title: this.state.title, price: this.state.price, title_img: this.state.title_img, amount: 1, id: this.state.productId }],
                                        totalAmount: this.state.price,
                                    },
                                }}>
                                <button className="product-button" id="product-cart-button" >Kup Teraz</button>
                            </Link>

                        </div>
                    </div>
                </div>
                <h2>Opis:</h2>
                {this.state.description}
            </div>
        );
    }

};


const mapStateToProps = (state) => {
    return {
        msg: state.cartReducer.msg,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (productId, amount) => {
            dispatch(addToCart(productId, amount));
        },
        // changeAmount: (props) => {
        //     dispatch(productAmount(props));
        // }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Product);