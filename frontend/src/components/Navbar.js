import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import './Navbar.css'
import { connect } from "react-redux";
import { logOutUser } from "../actions/userAction";
import categories from './Category';
import { productRedirect } from '../actions/searchAction'

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            search: '',
            serachCategory: '',
        }
    }

    clickHandler = (p) => {
        this.setState({ isClicked: p });
    }
    textChangeHandler = (event) => {
        this.setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }
    selectHandler = (event) => {
        this.setState({ serachCategory: event.target.value.toLowerCase() });
    }
    submitHandler = (e) => {
        e.preventDefault();
        this.props.productRedirect(true);
    }

    render() {
        return (
            <div class="nav-container">
                <div className='nav-main'>
                    <div class="nav-left">
                        <Link to='/' class="nav-title">
                            <img src='logo.png' class='nav-logo' />
                        </Link>
                        <form class="nav-search-section" onSubmit={this.submitHandler}>
                            <input type="text" class="nav-search" placeholder='Wyszukaj...' onChange={this.textChangeHandler} name='search' />
                            <input type="submit" hidden />
                            <select onChange={this.selectHandler} class='nav-search-select'>
                                <option defaultValue value=''>Wszędzie</option>
                                {categories.map((category) => (
                                    <option value={category.name}>{category.name}</option>
                                ))}
                            </select>
                            <button type='submit'>
                                <img src='./icons/search.svg' class='icons' />
                            </button>
                        </form>
                    </div>
                    <div class="nav-right">
                        <button class='nav-button'>
                            <img src='./icons/headphones-simple-solid.svg' class='icons' />
                            Kontakt
                        </button>
                        {((!this.props.inprogress) && this.props.user.token) ?
                            <>
                                <div class="nav-dropdownMenu-container1">
                                    <div class="nav-dropdownMenu-container" onClick={() => { this.clickHandler(true) }} onMouseEnter={() => { this.clickHandler(true) }} onMouseLeave={() => { this.clickHandler(false) }} >
                                        <button class='nav-button'>
                                            <img src='./icons/user-solid.svg' class='icons' />
                                            Twoje konto
                                        </button>
                                        <div class={this.state.isClicked ? "nav-dropdownMenu-show" : 'nav-dropdownMenu'}>
                                            <Link to="/myorders" className="nav-dropdownMenu-link">
                                                Moje zamówienia
                                            </Link>
                                            <Link to="/myaccount" className="nav-dropdownMenu-link">
                                                Ustawienia konta
                                            </Link>
                                            {this.props.user.isAdmin === 1 &&
                                                <Link to="/admin/panel" className="nav-dropdownMenu-link">
                                                    Admin
                                                </Link>
                                            }
                                            <button onClick={this.props.logOutUser} className="nav-dropdownMenu-link">
                                                Wyloguj się
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
                            :
                            <Link to="/login">
                                <button class='nav-button'>
                                    <img src='./icons/user-solid.svg' class='icons' />
                                    Zaloguj się
                                </button>
                            </Link>
                        }
                    </div>
                </div>
                <div class='nav-categories-container'>
                    {categories.map((category) => (
                        <Link to={`/search/category/${category.name}`} class='nav-category'>
                            {category.name}
                        </Link>
                    ))}
                </div>
                {(this.props.redirect) &&
                    <Navigate to=
                        {`/search/keyword/${this.state.search}/category/${this.state.serachCategory}`} class='nav-search-button' />}
            </div>
        );

    }
}

const mapStateToProps = (props) => {
    return {
        user: props.usersReducer.user,
        inprogress: props.usersReducer.inprogress,
        redirect: props.searchProductsReducer.redirect
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logOutUser: () => {
            dispatch(logOutUser());
        },
        productRedirect: (state) => {
            dispatch(productRedirect(state));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
