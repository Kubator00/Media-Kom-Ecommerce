import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import './Product.css'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../services/MyCartService'
import { productFetch } from '../../services/ProductService'



const Product = () => {
    const { productId } = useParams();

    const dispatch = useDispatch()
    const addToCart1 = (productId, amount) => {
        dispatch(addToCart(productId, amount));
    };

    useEffect(async () => {
        dispatch(productFetch(productId));
    }, [])

    const productDetails = useSelector(state => state.productReducer.productDetails);
    const productParameters = useSelector(state => state.productReducer.productParameters);
    const inProgress = useSelector(state => state.productReducer.inprogress);
    const msg = useSelector(state => state.cartReducer.msg);

    if(inProgress){
        return <div>Ładowanie...</div>
    }
    
    if (productParameters && productDetails)
        return (
            <div className="product-container">
                <div className="section1">
                    <div className="product-photos-section">
                        <img src={`../products/${productDetails.titleImg}`} className={`product-img`} />
                    </div>
                    <div className="product-purchase">
                        <div className="product-title">
                            <h1>{productDetails.title}</h1>
                            <h1>{productDetails.price.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}</h1>
                        </div>
                        {msg && msg}
                        <div className="product-buttons">
                            <button className="product-button" id="product-cart-button" onClick={() => { addToCart1(productId, 1) }}>Dodaj do koszyka</button>

                            <Link to={'/orderform'}
                                state={{
                                    cart: [{ title: productDetails.title, productPrice: productDetails.price, titleImg: productDetails.titleImg, productAmount: 1, productId: productDetails.productId }],
                                    productsAmount: productDetails.price,
                                }}
                            >
                                <button className="product-button" id="product-cart-button" >Kup Teraz</button>
                            </Link>

                        </div>
                    </div>
                </div>
                <div class='product-description'>
                    <h2>Opis</h2>
                    {productDetails.description}
                </div>
                {productParameters.length > 0 &&
                    <div class='product-parameter-container'>
                        <h2>Specyfikacja</h2>
                        {productParameters.map((parameter) => (
                            <div class='product-parameter'>
                                <div class='product-parameter-parameter'>
                                    <label>
                                        <h4>{parameter.name}</h4>
                                    </label>
                                </div>
                                <div class='product-parameter-parameter'>
                                    <label>
                                        {parameter.description}
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div >
                }
            </div >


        );

    return <> Ładowanie... </>

};



export default (Product);