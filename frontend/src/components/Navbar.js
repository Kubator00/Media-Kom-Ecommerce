import React, {useState, useEffect} from 'react'
import {Link, Navigate} from 'react-router-dom';
import './Navbar.css'
import {useDispatch, useSelector} from "react-redux";
import {logOutUser} from "../actions/userAction";
import categories from './productsComponents/categoryData';
import {productRedirect} from '../actions/searchAction'
import {setKeyword, setCategory} from '../actions/searchAction'
import verifyToken from "../services/VerifyToken";

const SearchInput = () => {

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(productRedirect(true));
    }
    const dispatch = useDispatch();
    const textChangeHandler = (event) => {
        dispatch(setKeyword(event.target.value));
    }
    const selectHandler = (event) => {
        dispatch(setCategory(event.target.value.toLowerCase()));
    }
    return (
        <form class="nav-search-section" onSubmit={submitHandler}>
            <input type="text" class="nav-search" placeholder='Wyszukaj...' onChange={textChangeHandler} name='search'/>
            <input type="submit" hidden/>
            <select onChange={selectHandler} class='nav-search-select'>
                <option defaultValue value=''>Wszędzie</option>
                {categories.map((category) => (
                    <option value={category.name}>{category.name}</option>
                ))}
            </select>
            <button type='submit'>
                <img src='./icons/search.svg' class='icons'/>
            </button>
        </form>
    );
}

const AccountMenu = () => {
    const [isClicked, isClickedSet] = useState(false);
    const clickHandler = (p) => {
        isClickedSet(p);
    }
    const dispatch = useDispatch();
    const user = useSelector((state) => state.usersReducer.user);
    const inProgress = useSelector((state) => state.usersReducer.inprogress);
    if (!inProgress && user.token)
        return (
            <>
                <ul class="nav-dropdownMenu-container" onClick={() => {
                    clickHandler(!isClicked)
                }} onMouseEnter={() => {
                    clickHandler(true)
                }} onMouseLeave={() => {
                    clickHandler(false)
                }}>
                    <li class='nav-button' id="your-account" style={{"border-bottom": "none"}}>
                        <img src='./icons/user.svg' class='icons'/>
                        Twoje konto
                    </li>
                    <ul class={isClicked ? "nav-dropdownMenu-show" : 'nav-dropdownMenu'}
                        id={isClicked && "accountMenu"}>
                        <li>
                            <h4>{`Witaj, ${user.name}`}</h4>
                        </li>
                        <Link to="/orderslist" className="nav-dropdownMenu-link">
                            <img src='./account/notebook.svg' class='nav-dropdownMenu-icon'/> Moje zamówienia
                        </Link>
                        <Link to="/account" className="nav-dropdownMenu-link">
                            <img src='./account/settings.svg' class='nav-dropdownMenu-icon'/> Ustawienia konta
                        </Link>
                        {user.isAdmin === 1 &&
                            <Link to="/admin/panel" className="nav-dropdownMenu-link">
                                <img src='./account/admin.svg' class='nav-dropdownMenu-icon'/> Admin
                            </Link>
                        }
                        <button onClick={() => {
                            dispatch(logOutUser())
                        }} className="nav-dropdownMenu-link">
                            <img src='./account/logout.svg' class='nav-dropdownMenu-icon'
                                 style={{"margin-left": "2px"}}/> Wyloguj się
                        </button>
                    </ul>
                </ul>


                <Link to="/cart" class='nav-button'>
                    <img src='./icons/cart-shopping-solid.svg' class='icons'/>
                    Koszyk
                </Link>
            </>
        );

    return (
        <Link to="/login" class='nav-button'>
            <img src='./icons/user.svg' class='icons'/>
            Zaloguj się
        </Link>
    );
}

const Categories = () => {
    const [isMobileActive, isMobileActiveSet] = useState(false);
    const [categoryButtonIsActive, categoryButtonIsActiveSet] = useState(false);
    const dispatch = useDispatch();

    const showCategoryButton = () => {
        if (window.innerWidth <= 1350)
            isMobileActiveSet(true);
        else
            isMobileActiveSet(false);
    }

    useEffect(() => {
        dispatch(verifyToken())
        window.addEventListener('resize', showCategoryButton);
        showCategoryButton();

    }, [])

    const mobileCategoryHandler = () => {
        categoryButtonIsActiveSet((prevState) =>
            !prevState
        );
    }

    if (isMobileActive)
        return (
            <div class='nav-categories-container'>
                <div class='nav-categoryButton' onMouseEnter={mobileCategoryHandler}
                     onMouseLeave={mobileCategoryHandler}>
                    <span>
                        {<img src="./icons/menu.svg" class='nav-category-icons'/>}
                        <label>Kategorie</label>
                    </span>
                    {categoryButtonIsActive &&

                        <div class="nav-dropdownMenu-container">
                            <div class={"nav-dropdownMenu-show"}>
                                {categories.map((category) => (
                                    <Link to={`/search?category=${category.name}`} class='nav-category'>
                                        {<img src={category.img} class='nav-category-icons'/>}
                                        <label>{category.name}</label>
                                    </Link>
                                ))
                                }
                            </div>
                        </div>

                    }
                </div>
            </div>
        );
    return (
        <div class='nav-categories-container'>
            {categories.map((category) => (
                <Link to={`/search?category=${category.name}`} class='nav-category'>
                    {<img src={category.img} class='nav-category-icons'/>}
                    <label> {category.name} </label>
                </Link>
            ))
            }
        </div>
    );
}

function Navbar() {
    const redirect = useSelector((state) => state.searchProductsReducer.redirect);
    const searchValue = useSelector((state) => state.searchProductsReducer.keyword);
    const searchCategory = useSelector((state) => state.searchProductsReducer.category);
    const [positionFixed, setPositionFixed] = useState(false);
    const [mobileSearch, setMobileSearch] = useState(false);

    const navPositionFixed = () => {
        if (window.scrollY > document.getElementById('nav').clientHeight
            && window.innerHeight > document.getElementById('nav').clientHeight
            && window.innerWidth > 1350)
            setPositionFixed(true);
        if (window.scrollY <= 0)
            setPositionFixed(false);

    }
    const searchInput = () => {
        if (window.innerWidth <= 1350)
            setMobileSearch(true);
        else
            setMobileSearch(false);
    }

    useEffect(() => {
        window.addEventListener('resize', searchInput);
        window.addEventListener('scroll', navPositionFixed);
        searchInput();
    }, [])


    return (
        <div class="nav-container">
            <div class={positionFixed ? 'nav-fixed' : 'nav'}>
                <div id='nav' className='nav-main'>
                    <div className='nav-up'>
                        <div class="nav-left">
                            <Link to='/' class='nav-logo'>
                                <img src='logo.png'/>
                            </Link>
                            {!mobileSearch && <SearchInput/>}
                        </div>
                        <div class="nav-right">
                            <Link to="#" class='nav-button'>
                                <img src='./icons/headset.svg' class='icons'/>
                                Kontakt
                            </Link>
                            <AccountMenu/>
                        </div>
                    </div>
                    <div className='nav-down'>
                        <Categories/>
                        {mobileSearch && <SearchInput/>}
                        {(redirect) &&
                            <Navigate to=
                                          {`/search?${searchValue && "keyword=" + searchValue}${(searchValue&&searchCategory) && "&"}${searchCategory && "category=" + searchCategory}`}/>}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Navbar;
