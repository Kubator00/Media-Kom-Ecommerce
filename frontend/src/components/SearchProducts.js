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
    const [filteredProducts, setfilteredProducts] = useState(products);

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

    useEffect(() => {
        setfilteredProducts(products);
    }, [products])

    useEffect(() => {
        console.log(filteredProducts);
    })



    const [priceFilter, setPriceFiter] = useState({
        from: 0,
        to: 999999
    })

    const priceFilterHandler = (event) => {
        setPriceFiter((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }

    const filterPrice = () => {
        const a = products.filter((b) => { return b.price >= priceFilter.from && b.price <= priceFilter.to });
        console.log(a);
        setfilteredProducts(a);
    }

    const sortProducts = (event) => {
        if (event.target.value === 'priceAscending')
            setfilteredProducts(tmp => [...tmp.sort((a, b) => {
                if (a.price < b.price)
                    return 1;
                if (a.price > b.price)
                    return -1;
                return 0;
            })]);

        else if (event.target.value === 'priceDescanding')
            setfilteredProducts(tmp => [...tmp.sort((a, b) => {
                if (a.price < b.price)
                    return -1;
                if (a.price > b.price)
                    return 1;
                return 0;
            })]);

        else
            setfilteredProducts(tmp => [...tmp.sort((a, b) => {
                if (a.productId < b.productId)
                    return -1;
                if (a.productId > b.productId)
                    return 1;
                return 0;
            })]);
    }


    if (loaded === false || inProgress)
        return (
            <div class='searchProducts-container'>
                Ładowanie...
            </div>
        );

    if (filteredProducts?.length < 1)
        return (
            <div class='searchProducts-container'>
                <h1>{keyword ? `Wyniki wyszukiwania dla "${keyword}":` : category.toUpperCase()}</h1>
                Brak wyników
            </div>
        );

    if (filteredProducts?.length > 0)
        return (
            <div class='searchProducts-container'>
                <div class='searchProducts-filterContainer'>
                    <h2>Filtry</h2>
                    <div class='searchProducts-filters'>
                        <div class='searchProducts-filter'>
                            <h3>Sortowanie</h3>
                            <select class='nav-search-select' onChange={sortProducts}>
                                <option defaultValue value='default'>Domyślnie</option>
                                <option value='priceAscending'>Cena rosnąco</option>
                                <option value='priceDescanding'>Cena malejąco</option>
                            </select>
                        </div>
                        <div class='searchProducts-filter'>
                            <h3>Cena</h3>
                            <span>
                                Od <input type='number' class='searchProducts-filter-number' placeholder='Od' onChange={priceFilterHandler} name="from" value={priceFilter.from} />
                                Do <input type='number' class='searchProducts-filter-number' placeholder='Do' onChange={priceFilterHandler} name="to" value={priceFilter.to} />
                            </span>
                        </div>
                    </div>
                    <button onClick={filterPrice}>Filtruj</button>
                </div>
                <div class='searchProducts-productContainer'>
                    <h1>{keyword ? `Wyniki wyszukiwania dla "${keyword}":` : category.toUpperCase()}</h1>
                    {filteredProducts.map((product) => (
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
            </div>
        );

}


export default SearchProducts;