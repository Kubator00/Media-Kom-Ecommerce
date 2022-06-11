import React from 'react'
import {useEffect} from 'react'
import {Link, useParams} from "react-router-dom";
import './Product.css'
import {useSelector, useDispatch} from 'react-redux'
import {addToCart} from '../../services/MyCartService'
import {productFetch} from '../../services/ProductService'


const Product = () => {
    const {productId} = useParams();

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

    if (inProgress) {
        return <div>Ładowanie...</div>
    }

    if (productParameters && productDetails)
        return (
            <div className="product content">
                <div className="product__category">
                    <Link to={`/`}> Media-Kom >  &nbsp;</Link>
                    <Link to={`/search?category=${productDetails.categoryName}`}>  {productDetails.categoryName} </Link>
                </div>
                <div className="product__main">
                    <div className="product__img">
                        <img src={`../products/${productDetails.titleImg}`} className={`product-img`} alt={`zdjęcie ${productDetails.title}`}/>
                    </div>
                    <div className="product__info">
                        <div className="product__name">
                            <h1>{productDetails.title}</h1>
                            <h1>
                                {productDetails.price.toLocaleString('pl-PL', {
                                    style: 'currency',
                                    currency: 'PLN'
                                })}
                            </h1>
                        </div>
                        {msg && msg}
                        <div className="product__purchase">
                            <button className="product__button" onClick={() => {
                                addToCart1(productId, 1)
                            }}>Dodaj do koszyka
                            </button>

                            <Link to={'/orderform'}
                                  state={{
                                      cart: [{
                                          title: productDetails.title,
                                          productPrice: productDetails.price,
                                          titleImg: productDetails.titleImg,
                                          productAmount: 1,
                                          productId: productDetails.productId
                                      }],
                                      productsAmount: productDetails.price,
                                  }}
                            >
                                <button className="product__button">Kup Teraz</button>
                            </Link>

                        </div>
                    </div>
                </div>
                <div class='product__description'>
                    <h2>Opis</h2>
                    {productDetails.description}
                </div>
                {productParameters.length > 0 &&
                    <div class='product__parameter'>
                        <h2>Specyfikacja</h2>
                        {productParameters.map((parameter) => (
                            <ul>
                                <li>
                                    <span>
                                        <h3>{parameter.name}</h3>
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        {parameter.description}
                                    </span>
                                </li>
                            </ul>
                        ))}
                    </div>
                }
            </div>


        );

    return <> Ładowanie... </>

};


export default (Product);