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
        <form class="nav__search" onSubmit={submitHandler}>
            <input type="text" class="nav__searchInput" placeholder='Wyszukaj...' onChange={textChangeHandler}
                   name='search'/>
            <input type="submit" hidden/>
            <select onChange={selectHandler} class='nav__searchSelect'>
                <option defaultValue value=''>Wszędzie</option>
                {categories.map((category) => (
                    <option value={category.name}>{category.name}</option>
                ))}
            </select>
            <button type='submit'>
                <img src='./icons/search.svg' class='nav__icon'/>
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
    const user = useSelector((state) => state.userAuthenticationReducer.user);
    const inProgress = useSelector((state) => state.userAuthorizationReducer.inprogress);
    if (!inProgress && user.token)
        return (
            <>
                <ul class="nav__dropdownMenu" onClick={() => {
                    clickHandler(!isClicked)
                }} onMouseEnter={() => {
                    clickHandler(true)
                }} onMouseLeave={() => {
                    clickHandler(false)
                }}>
                    <li class='nav__link nav__link--account' style={{"border-bottom": "none"}}>
                        <img src='./icons/user.svg' class='nav__icon'/>
                        Twoje konto
                    </li>
                    <ul class={isClicked ? "nav__dropdownMenu--show" : 'nav__dropdownMenu--hidden'}
                        id={isClicked && "accountMenu"}>
                        <li>
                            <h4>{`Witaj, ${user.name}`}</h4>
                        </li>
                        <Link to="/orderslist" className="nav__dropdownMenuLink">
                            <img src='./icons/account/notebook.svg' class='nav__dropdownMenuIcon'/> Moje zamówienia
                        </Link>
                        <Link to="/account" className="nav__dropdownMenuLink">
                            <img src='./icons/account/settings.svg' class='nav__dropdownMenuIcon'/> Ustawienia konta
                        </Link>
                        {user.isAdmin === 1 &&
                            <Link to="/admin/panel" className="nav__dropdownMenuLink">
                                <img src='./icons//account/admin.svg' class='nav__dropdownMenuIcon'/> Admin
                            </Link>
                        }
                        <button onClick={() => {
                            dispatch(logOutUser())
                        }} className="nav__dropdownMenuLink">
                            <img src='./icons/account/logout.svg' class='nav__dropdownMenuIcon'
                                 style={{"margin-left": "2px"}}/> Wyloguj się
                        </button>
                    </ul>
                </ul>


                <Link to="/cart" class='nav__link'>
                    <img src='./icons/cart-shopping-solid.svg' class='nav__icon'/>
                    Koszyk
                </Link>
            </>
        );

    return (
        <Link to="/login" class='nav__link'>
            <img src='./icons/user.svg' class='nav__icon'/>
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
            <div class='nav__categories'>
                <div class='nav__categoryButton' onMouseEnter={mobileCategoryHandler}
                     onMouseLeave={mobileCategoryHandler}>
                    <span>
                        {<img src="./icons/menu.svg" class='nav__categoryIcon'/>}
                        <label>Kategorie</label>
                    </span>
                    {categoryButtonIsActive &&

                        <div class="nav__dropdownMenu">
                            <div class={"nav__dropdownMenu--show"}>
                                {categories.map((category) => (
                                    <Link to={`/search?category=${category.name}`} class='nav__categoryLink'>
                                        {<img src={category.img} class='nav__categoryIcon'/>}
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
        <div class='nav__categories'>
            {categories.map((category) => (
                <Link to={`/search?category=${category.name}`} class='nav__categoryLink'>
                    {<img src={category.img} class='nav__categoryIcon'/>}
                    <span> {category.name} </span>
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
        if (!document.getElementById('nav'))
            return;

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


    if (redirect)
        return <Navigate
            to={`/search?${searchValue && "keyword=" + searchValue}${(searchValue && searchCategory) && "&"}${searchCategory && "category=" + searchCategory}`}/>


    return (
        <div class='nav'>
            <div id='nav' className={positionFixed ? 'nav--fixed' : 'nav--static'}>
                <div className='nav__content'>
                    <div className='nav__topBar'>
                        <div class="nav__main">
                            <Link to='/' class='nav__logo'>
                                <img src='logo.png'/>
                            </Link>
                            {!mobileSearch && <SearchInput/>}
                        </div>
                        <div class="nav__linksSection">
                            <Link to="#" class='nav__link'>
                                <img src='./icons/headset.svg' class='nav__icon'/>
                                Kontakt
                            </Link>
                            <AccountMenu/>
                        </div>
                    </div>
                    <div className='nav__bottomBar'>
                        <Categories/>
                        {mobileSearch && <SearchInput/>}
                    </div>

                </div>
            </div>
        </div>
    );

}

export default Navbar;
