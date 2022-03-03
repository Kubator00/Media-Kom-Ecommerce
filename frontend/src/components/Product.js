import React from 'react'
import { useState, useEffect } from 'react'
import { Link,useParams } from "react-router-dom";
import './Product.css'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../services/MyCartService'




function Product() {
    const { productId } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [titleImg, setTitleImg] = useState('');
    const msg = useSelector((state) => state.cartReducer.msg);

    const dispatch = useDispatch()
    const addToCart1 = (productId, amount) => {
        dispatch(addToCart(productId, amount));
    };

    async function read() {
        await axios.post(`http://localhost:3010/product`, { 'id': productId })
            .then(result => {
                setTitle(result.data.product.title);
                setPrice(result.data.product.price);
                setDescription(result.data.product.description);
                setTitleImg(result.data.product.title_img);
            });
    }

    useEffect(async () => {
        await read();
    }, [])


    return (
        <div className="product-container">
            <div className="section1">
                <div className="product-photos-section">
                    <img src={`../products/${titleImg}`} className={`product-img`} />
                </div>
                <div className="product-purchase">
                    <div className="product-title">
                        <h1>{title}</h1>
                        <h1>{price}zł</h1>
                    </div>
                    {msg && msg}
                    <div className="product-buttons">
                        <button className="product-button" id="product-cart-button" onClick={() => { addToCart1(productId, 1) }}>Dodaj do koszyka</button>

                        <Link to=
                            {{
                                pathname: '/orderform',
                                state: {
                                    cart:
                                        [{ title: title, price: price, title_img: titleImg, amount: 1, id: productId }],
                                    totalAmount: price,
                                },
                            }}>
                            <button className="product-button" id="product-cart-button" >Kup Teraz</button>
                        </Link>

                    </div>
                </div>
            </div>
            <h2>Opis:</h2>
            {description}
        </div>
    );
};



export default (Product);