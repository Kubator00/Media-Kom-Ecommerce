import React, {useState, useEffect} from 'react'
import {Link, useLocation} from "react-router-dom";
import './Product.css'
import './SearchProducts.css'
import {useSelector, useDispatch} from "react-redux";
import {productsSearch} from '../../services/SearchService'
import {addToCart} from '../../services/MyCartService'
import {productRedirect} from '../../actions/searchAction'
import PageButtons from "../PageButtons";
import prevState from "../../customHooks/prevState";

const mobileFilterMenu = (setMobileFilterMenu, sortProducts, priceFilterHandler, priceFilter, filterPrice) => {
    return (
        <div className="mobileFilter-container">
            <ul className="mobileFilter-content">
                <li>
                    <span>
                        <h2>Filtry</h2>
                        <img src="./icons/cross.svg" className="searchProducts-filterIcon"
                             onClick={() => setMobileFilterMenu(false)}/>
                    </span>
                </li>
                <li>
                    <h3>Sortowanie</h3>
                    <select className='nav-search-select' onChange={sortProducts}>
                        <option defaultValue value='default'>Domyślnie</option>
                        <option value='price asc'>Cena rosnąco</option>
                        <option value='price desc'>Cena malejąco</option>
                    </select>
                </li>
                <li>
                    <h3>Cena</h3>
                    <span>
                                Od <input type='number' className='searchProducts-filter-number' placeholder='Od'
                                          onChange={priceFilterHandler} name="from" value={priceFilter.from}/>
                                Do <input type='number' className='searchProducts-filter-number' placeholder='Do'
                                          onChange={priceFilterHandler} name="to" value={priceFilter.to}/>
                            </span>
                </li>
                <li>
                    <button onClick={filterPrice} className='searchProducts-filter-button'>Filtruj</button>
                </li>
            </ul>
        </div>
    );
}

const desktopFilterMenu = (sortProducts, priceFilterHandler, priceFilter, filterPrice) => {
    return (
        <div className='searchProducts-filterContainer'>
            <ul className='searchProducts-filters'>
                <li className='searchProducts-filter'>
                    <h3>Sortowanie</h3>
                    <select className='nav-search-select' onChange={sortProducts}>
                        <option defaultValue value='default'>Domyślnie</option>
                        <option value='price asc'>Cena rosnąco</option>
                        <option value='price desc'>Cena malejąco</option>
                    </select>
                </li>
                <li className='searchProducts-filter'>
                    <h3>Cena</h3>
                    <span>
                                Od <input type='number' className='searchProducts-filter-number' placeholder='Od'
                                          onChange={priceFilterHandler} name="from" value={priceFilter.from}/>
                                Do <input type='number' className='searchProducts-filter-number' placeholder='Do'
                                          onChange={priceFilterHandler} name="to" value={priceFilter.to}/>
                            </span>
                </li>
                <li className='searchProducts-filter'>
                    <button onClick={filterPrice} className='searchProducts-filter-button'>Filtruj</button>
                </li>
            </ul>
        </div>
    );
}


const SearchProducts = () => {
    const queryParams = new URLSearchParams(useLocation().search);
    const keyword = queryParams.get("keyword")
    const category = queryParams.get("category")
    const [firstLoad, setFirstLoad] = useState(false);
    const inProgress = useSelector((state) => state.searchProductsReducer.inprogress);
    const products = useSelector((state) => state.searchProductsReducer.products);
    const rowsFound = useSelector((state) => state.searchProductsReducer.rowsFound);

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [isMobileFilterMenu, setIsMobileFilterMenu] = useState(false);
    const [isActiveMobileFilterMenu, setIsActiveMobileFilterMenu] = useState(false);
    const elementsOnPage = 10;
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
        setFilteredProducts(products);
    }, [products])


    const showFilterButtonF = () => {
        if (window.innerWidth <= 1200) {
            setIsMobileFilterMenu(true);
        } else
            setIsMobileFilterMenu(false);
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
            <div className='searchProducts-container'>
                Ładowanie...
            </div>
        );

    if (!keyword && !category)
        return (
            <div className='searchProducts-container'>
                Brak wyników
            </div>
        );

    return (
        <div className='searchProducts-container'>
            {isActiveMobileFilterMenu && mobileFilterMenu(setIsActiveMobileFilterMenu, sortProducts, priceFilterHandler, priceFilter, filterPrice)}

            {!isMobileFilterMenu && desktopFilterMenu(sortProducts, priceFilterHandler, priceFilter, filterPrice)}

            <div className='searchProducts-productContainer'>
                <div className='searchProducts-nav'>
                    {isMobileFilterMenu &&
                        <div className='searchProducts-filterContainer' onClick={() => setIsActiveMobileFilterMenu(true)}>
                            <span><img src="./icons/filter.svg" className="searchProducts-filterIcon"/>Filtry</span>
                        </div>
                    }
                    <h1>{keyword ? `Wyniki wyszukiwania dla "${keyword}":` : category.toUpperCase()}</h1>
                </div>

                {filteredProducts?.length > 0 ?
                    filteredProducts.map((product) => (
                        <Link to={`/product/${product.productId}`} className='searchProducts-product-container'>
                            <div className='searchProducts-product-left'>
                                <img src={`./products/${product.titleImg}`} className='searchProducts-product-left-img'/>
                                <div className='searchProducts-product-left-label'>
                                    <label>{product.title}</label>
                                    <h4>{product.price} zł</h4>
                                </div>
                            </div>
                            <div className='searchProducts-product-right'>
                                <Link to='/cart'>
                                    <button className="searchProducts-button" onClick={() => {
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