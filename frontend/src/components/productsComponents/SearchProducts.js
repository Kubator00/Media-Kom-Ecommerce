import React, {useState, useEffect} from 'react'
import {Link, useParams} from "react-router-dom";
import './Product.css'
import './searchProducts.css'
import {useSelector, useDispatch} from "react-redux";
import {productsSearch} from '../../services/SearchService'
import {addToCart} from '../../services/MyCartService'
import {productRedirect} from '../../actions/searchAction'
import PageButtons from "../PageButtons";
import prevState from "../../customHooks/prevState";


const SearchProducts = () => {
    const {keyword, category} = useParams();
    const [firstLoad, setFirstLoad] = useState(false);
    const inProgress = useSelector((state) => state.searchProductsReducer.inprogress);
    const products = useSelector((state) => state.searchProductsReducer.products);
    const rowsFound = useSelector((state) => state.searchProductsReducer.rowsFound);
    const [filteredProducts, setfilteredProducts] = useState(products);
    const [showFilterButton, setShowFilterButton] = useState(false);
    const [mobileFilterMenu, setMobileFilterMenu] = useState(false);
    const elementsOnPage = 2;
    const [details, setDetails] = useState({
        keyword: keyword,
        category: category,
        filter: null,
        limit: {beginning: 0, numOfRows: elementsOnPage}
    })

    const dispatch = useDispatch()
    useEffect(async () => {
        window.addEventListener('resize', showFilterButtonF);
        showFilterButtonF();
    }, [])


    useEffect(() => {
        console.log(details)
        setDetails((prevState) => ({
            ...prevState,
            keyword: keyword,
            category: category
        }))
    }, [keyword, category])

    useEffect(() => {
        dispatch(productRedirect(false));
        dispatch(productsSearch(details));
        setFirstLoad(true);
    }, [details])


    useEffect(() => {
        setfilteredProducts(products);
    }, [products])


    const showFilterButtonF = () => {
        if (window.innerWidth <= 1200) {
            setShowFilterButton(true);
        } else
            setShowFilterButton(false);
    }


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
        setDetails((prevState) => ({
            ...prevState,
            filter: {...prevState.filter, price: {from: priceFilter.from, to: priceFilter.to}}
        }));
    }

    const sortProducts = (event) => {
        if (event.target.value === 'default')
            setDetails((prevState) => ({
                    ...prevState,
                    filter: {...prevState.filter, sort: null}
                }
            ));
        else
            setDetails((pervState) => ({
                    ...pervState,
                    filter: {...prevState.filter, sort: event.target.value}
                }
            ));
    }


    if (firstLoad === false || inProgress)
        return (
            <div class='searchProducts-container'>
                Ładowanie...
            </div>
        );


    return (
        <div class='searchProducts-container'>
            {mobileFilterMenu &&
                <div class="mobileFilter-container">
                    <ul className="mobileFilter-content">
                        <li>
                            <span>
                                <h2>Filtry</h2>
                                <img src="./icons/cross.svg" class="searchProducts-filterIcon"
                                     onClick={() => setMobileFilterMenu(false)}/>
                            </span>
                        </li>
                        <li>
                            <h3>Sortowanie</h3>
                            <select class='nav-search-select' onChange={sortProducts}>
                                <option defaultValue value='default'>Domyślnie</option>
                                <option value='price asc'>Cena rosnąco</option>
                                <option value='price desc'>Cena malejąco</option>
                            </select>
                        </li>
                        <li>
                            <h3>Cena</h3>
                            <span>
                                Od <input type='number' class='searchProducts-filter-number' placeholder='Od'
                                          onChange={priceFilterHandler} name="from" value={priceFilter.from}/>
                                Do <input type='number' class='searchProducts-filter-number' placeholder='Do'
                                          onChange={priceFilterHandler} name="to" value={priceFilter.to}/>
                            </span>
                        </li>
                        <li>
                            <button onClick={filterPrice} class='searchProducts-filter-button'>Filtruj</button>
                        </li>
                    </ul>
                </div>
            }


            {!showFilterButton &&
                <div class='searchProducts-filterContainer'>
                    <ul class='searchProducts-filters'>
                        <li class='searchProducts-filter'>
                            <h3>Sortowanie</h3>
                            <select class='nav-search-select' onChange={sortProducts}>
                                <option defaultValue value='default'>Domyślnie</option>
                                <option value='price asc'>Cena rosnąco</option>
                                <option value='price desc'>Cena malejąco</option>
                            </select>
                        </li>
                        <li class='searchProducts-filter'>
                            <h3>Cena</h3>
                            <span>
                                Od <input type='number' class='searchProducts-filter-number' placeholder='Od'
                                          onChange={priceFilterHandler} name="from" value={priceFilter.from}/>
                                Do <input type='number' class='searchProducts-filter-number' placeholder='Do'
                                          onChange={priceFilterHandler} name="to" value={priceFilter.to}/>
                            </span>
                        </li>
                        <li class='searchProducts-filter'>
                            <button onClick={filterPrice} class='searchProducts-filter-button'>Filtruj</button>
                        </li>
                    </ul>
                </div>
            }

            <div class='searchProducts-productContainer'>
                <div class='searchProducts-nav'>
                    {showFilterButton &&
                        <div class='searchProducts-filterContainer' onClick={() => setMobileFilterMenu(true)}>
                            <span><img src="./icons/filter.svg" class="searchProducts-filterIcon"/>Filtry</span>
                        </div>
                    }
                    <h1>{keyword ? `Wyniki wyszukiwania dla "${keyword}":` : category.toUpperCase()}</h1>
                </div>
                {filteredProducts?.length > 0 ?
                    filteredProducts.map((product) => (
                        <Link to={`/product/${product.productId}`} class='searchProducts-product-container'>
                            <div class='searchProducts-product-left'>
                                <img src={`./products/${product.titleImg}`} class='searchProducts-product-left-img'/>
                                <div class='searchProducts-product-left-label'>
                                    <label>{product.title}</label>
                                    <h4>{product.price} zł</h4>
                                </div>
                            </div>
                            <div class='searchProducts-product-right'>
                                <Link to='#'>
                                    <button class="searchProducts-button" onClick={() => {
                                        dispatch(addToCart(product.productId, 1))
                                    }}>Dodaj do koszyka
                                    </button>
                                </Link>
                            </div>
                        </Link>
                    )) :
                    <div> Brak wyników </div>
                }

                <PageButtons rowsFound={rowsFound} elementsOnPage={elementsOnPage} reducerFunction={productsSearch}
                             argsFunction={details}/>

            </div>
        </div>
    );

}


export default SearchProducts;