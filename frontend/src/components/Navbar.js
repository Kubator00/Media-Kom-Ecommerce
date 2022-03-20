import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom';
import './Navbar.css'
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../actions/userAction";
import categories from './Category';
import { productRedirect } from '../actions/searchAction'
import { setKeyword, setCategory } from '../actions/searchAction'
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
            <input type="text" class="nav-search" placeholder='Wyszukaj...' onChange={textChangeHandler} name='search' />
            <input type="submit" hidden />
            <select onChange={selectHandler} class='nav-search-select'>
                <option defaultValue value=''>Wszędzie</option>
                {categories.map((category) => (
                    <option value={category.name}>{category.name}</option>
                ))}
            </select>
            <button type='submit'>
                <img src='./icons/search.svg' class='icons' />
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
    const inprogress = useSelector((state) => state.usersReducer.inprogress);

    if (!inprogress && user.token)
        return (
            <>
                <div class="nav-dropdownMenu-container1">
                    <div class="nav-dropdownMenu-container" onClick={() => { clickHandler(!isClicked) }} onMouseEnter={() => { clickHandler(true) }} onMouseLeave={() => { clickHandler(false) }} >
                        <button class='nav-button' style={{ "border-bottom": "none" }}>
                            <img src='./icons/user.svg' class='icons' />
                            Twoje konto
                        </button>
                        <div class={isClicked ? "nav-dropdownMenu-show" : 'nav-dropdownMenu'}>
                            <Link to="/myorders" className="nav-dropdownMenu-link">
                                <img src='./account/clipboard.svg' class='nav-dropdownMenu-icon' /> Moje zamówienia
                            </Link>
                            <Link to="/myaccount" className="nav-dropdownMenu-link">
                                <img src='./account/settings.svg' class='nav-dropdownMenu-icon' /> Ustawienia konta
                            </Link>
                            {user.isAdmin === 1 &&
                                <Link to="/admin/panel" className="nav-dropdownMenu-link">
                                    <img src='./account/admin.svg' class='nav-dropdownMenu-icon' />  Admin
                                </Link>
                            }
                            <button onClick={() => { dispatch(logOutUser()) }} className="nav-dropdownMenu-link" >
                                <img src='./account/logout.svg' class='nav-dropdownMenu-icon' style={{ "margin-left": "2px" }} /> Wyloguj się
                            </button>
                        </div>
                    </div>
                </div>


                <Link to="/mycart" className="nav-cart">
                    <button onClick class='nav-button' >
                        <img src='./icons/cart-shopping-solid.svg' class='icons' />
                        Koszyk
                    </button>
                </Link>
            </>
        );

    return (
        <Link to="/login">
            <button class='nav-button'>
                <img src='./icons/user.svg' class='icons' />
                Zaloguj się
            </button>
        </Link>
    );
}

const Categories = () => {
    const [isMobileActive, isMobileActiveSet] = useState(false);
    const [categoryButtonIsActive, categoryButtonIsActiveSet] = useState(false);
    const dispatch = useDispatch();

    const showCategoryButton = () => {
        if (window.innerWidth <= 1000)
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
                <div class='nav-categoryButton' onClick={mobileCategoryHandler} onMouseEnter={mobileCategoryHandler} onMouseLeave={mobileCategoryHandler}>
                    <span>
                        {<img src="./categories/bars.svg" class='nav-category-icons' />}
                        <label>Kategorie</label>
                    </span>
                    {categoryButtonIsActive &&
                        <div class='nav-dropdownMenu-container1'>
                            <div class="nav-dropdownMenu-container">
                                <div class={"nav-dropdownMenu-show"}>
                                    {categories.map((category) => (
                                        <Link to={`/search/category/${category.name}`} class='nav-category'>
                                            {<img src={category.img} class='nav-category-icons' />}
                                            <label>{category.name}</label>
                                        </Link>
                                    ))
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    return (
        <div class='nav-categories-container'>
            {categories.map((category) => (
                <Link to={`/search/category/${category.name}`} class='nav-category'>
                    {<img src={category.img} class='nav-category-icons' />}
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

    const navPositionFixed = () => {
        console.log(document.getElementById('nav').clientHeight);
        console.log(window.innerHeight);
        if (window.scrollY > document.getElementById('nav').clientHeight && window.innerHeight>document.getElementById('nav').clientHeight*2)
            setPositionFixed(true);
        if (window.scrollY <= 0)
            setPositionFixed(false);

    }

    useEffect(() => {
        window.addEventListener('scroll', navPositionFixed);
    }, [])

    useEffect(() => {
        console.log(positionFixed);
    })

    return (
        <div class="nav-container">
            <div class="nav-container1">
                <div id='nav' className={positionFixed ? 'nav-main-fixed' : 'nav-main'}>
                    <div class="nav-left">
                        <Link to='/' class="nav-title">
                            <img src='logo.png' class='nav-logo' />
                        </Link>
                        <SearchInput />
                    </div>
                    <div class="nav-right">
                        <button class='nav-button'>
                            <img src='./icons/headset.svg' class='icons' />
                            Kontakt
                        </button>
                        <AccountMenu />
                    </div>
                </div>
                <Categories />
                {(redirect) &&
                    <Navigate to=
                        {`/search/keyword/${searchValue}/category/${searchCategory}`} class='nav-search-button' />}
            </div>
        </div>
    );

}

export default Navbar;
