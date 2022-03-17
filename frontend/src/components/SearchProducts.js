import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import './Product.css'
import './searchProducts.css'
import { useSelector, useDispatch } from "react-redux";
import { productsSearch } from '../services/SearchService'
import { addToCart } from '../services/MyCartService'
import { productRedirect } from '../actions/searchAction'

const SearchProducts = () => {
    const { keyword, category } = useParams();

    const [loaded, setLoaded] = useState(false);
    const inProgress = useSelector((state) => state.searchProductsReducer.inprogress);
    const products = useSelector((state) => state.searchProductsReducer.products);

    const dispatch = useDispatch()
    useEffect(async () => {
        dispatch(productRedirect(false));
        dispatch(productsSearch(keyword, category));
        setLoaded(true);
    }, [])


    useEffect(() => {
        dispatch(productRedirect(false));
        dispatch(productsSearch(keyword, category));

    }, [keyword, category])

    if (loaded === false || inProgress)
        return (
            <div class='searchProducts-container'>
                Ładowanie...
            </div>
        );

    if (products?.length < 1)
        return (
            <div class='searchProducts-container'>
                Brak wyników
            </div>
        );

    if (products?.length > 0)
        return (
            <div class='searchProducts-container'>
                <h1>{keyword ? `Wyniki wyszukiwania dla "${keyword}":` : category.toUpperCase()}</h1>
                {products.map((product) => (
                    <Link to={`/product/${product.productId}`} class='searchProducts-product-container'>
                        <div class='searchProducts-product-left'>
                            <img src={`./products/${product.titleImg}`} class='searchProducts-product-left-img' />
                            <div class='searchProducts-product-left-label'>
                                <label>{product.title}</label>
                                <h4>{product.price} zł</h4>
                            </div>
                        </div>
                        <div class='searchProducts-product-right'>
                            <Link to='#'>
                                <button class="searchProducts-button" onClick={() => { dispatch(addToCart(product.productId, 1)) }}>Dodaj do koszyka</button>
                            </Link>
                        </div>
                    </Link>
                ))}
            </div>
        );

}


export default SearchProducts;