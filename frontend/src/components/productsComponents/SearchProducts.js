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
        <div className="mobileFilter">
            <ul>
                <li>
                    <span>
                        <h2>Filtry</h2>
                        <img src="./icons/cross.svg" className="filter__img"
                             alt='krzyżyk'
                             onClick={() => setMobileFilterMenu(false)}/>
                    </span>
                </li>
                <li>
                    <h3>Sortowanie</h3>
                    <select className='filter__select' onChange={sortProducts}>
                        <option defaultValue value='default'>Domyślnie</option>
                        <option value='price asc'>Cena rosnąco</option>
                        <option value='price desc'>Cena malejąco</option>
                    </select>
                </li>
                <li>
                    <h3>Cena</h3>
                    <span>
                                Od <input type='number' className='filter__inputNumber' placeholder='Od'
                                          onChange={priceFilterHandler} name="from" value={priceFilter.from}/>
                                Do <input type='number' className='filter__inputNumber' placeholder='Do'
                                          onChange={priceFilterHandler} name="to" value={priceFilter.to}/>
                            </span>
                </li>
                <li>
                    <button onClick={filterPrice} className='filter__button'>Filtruj</button>
                </li>
            </ul>
        </div>
    );
}

const desktopFilterMenu = (sortProducts, priceFilterHandler, priceFilter, filterPrice) => {
    return (
        <div className='filter'>
            <ul>
                <li>
                    <h3>Sortowanie</h3>
                    <select className='filter__select' onChange={sortProducts}>
                        <option defaultValue value='default'>Domyślnie</option>
                        <option value='price asc'>Cena rosnąco</option>
                        <option value='price desc'>Cena malejąco</option>
                    </select>
                </li>
                <li>
                    <h3>Cena</h3>
                    <span>
                                Od <input type='number' className='filter__inputNumber' placeholder='Od'
                                          onChange={priceFilterHandler} name="from" value={priceFilter.from}/>
                                Do <input type='number' className='filter__inputNumber' placeholder='Do'
                                          onChange={priceFilterHandler} name="to" value={priceFilter.to}/>
                    </span>
                </li>
                <li>
                    <button onClick={filterPrice} className='filter__button'>Filtruj</button>
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
    useEffect(() => {
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
        dispatch(productsSearch(details));
        setFirstLoad(true);
    }, [details, dispatch])


    useEffect(() => {
        dispatch(productRedirect(false));
    }, [queryParams, dispatch])

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
            <div className='searchProducts'>
                Ładowanie...
            </div>
        );

    if (!keyword && !category)
        return (
            <div className='searchProducts'>
                Brak wyników
            </div>
        );

    return (
        <div className='searchProducts content'>
            {isActiveMobileFilterMenu && mobileFilterMenu(setIsActiveMobileFilterMenu, sortProducts, priceFilterHandler, priceFilter, filterPrice)}

            {!isMobileFilterMenu && desktopFilterMenu(sortProducts, priceFilterHandler, priceFilter, filterPrice)}

            <div className='searchProducts__list'>
                <div className='searchProducts__nav'>
                    {isMobileFilterMenu &&
                        <div className='filter' onClick={() => setIsActiveMobileFilterMenu(true)}>
                            <span>
                                <img src="./icons/filter.svg" className="filter__img" alt='filtry'/>Filtry
                            </span>
                        </div>
                    }
                    <h1>{keyword ? `Wyniki wyszukiwania dla "${keyword}":` : category.toUpperCase()}</h1>
                </div>

                {filteredProducts?.length > 0 ?
                    filteredProducts.map((product) => (
                        <Link to={`/product/${product.productId}`} className='searchProducts__product'>
                            <div className='searchProducts__productInfo'>
                                <img className='searchProducts__productImg' src={`./products/${product.titleImg}`}
                                     alt={`${product.title}`}/>
                                <div>
                                    <span>{product.title}</span>
                                    <h4>{product.price} zł</h4>
                                </div>
                            </div>
                            <div className='searchProducts__purchase'>
                                <Link to='/cart'>
                                    <button className="searchProducts__button" onClick={() => {
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