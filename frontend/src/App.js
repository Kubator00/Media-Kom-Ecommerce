import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import ProdectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home'
import LogIn from './components/loginComponents/LogIn';
import Register from './components/loginComponents/Register';

import UserAccount from './components/userComponents/AccountSettings'
import Product from './components/productsComponents/Product';
import UserCart from './components/userComponents/Cart';
import OrderForm from './components/ordersComponents/OrderForm';
import OrderList from './components/ordersComponents/OrderList';
import OrderDetails from './components/ordersComponents/OrderDetails';
import AdminPanel from './components/adminComponents/AdminPanel';
import AdminAllOrdersList from './components/adminComponents/AdminAllOrdersList';
import AdminOrderDetails from './components/adminComponents/AdminOrderDetails';
import AdminAddProduct from './components/adminComponents/AdminAddProduct';
import AdminProductList from './components/adminComponents/AdminProductList';
import AdminEditProduct from './components/adminComponents/AdminEditProduct';
import SearchProducts from './components/productsComponents/SearchProducts';
import {useLayoutEffect} from 'react'

const Wrapper = ({children}) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
}


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <Wrapper>
                        <Navbar/>
                        <Routes>
                            <Route path='/' element={<Home/>}/>
                            <Route path='/login' element={<LogIn/>}/>
                            <Route path='/register' element={<Register/>}/>

                            <Route element={<ProdectedRoute/>}>
                                <Route path='cart' element={<UserCart/>}/>
                                <Route path='account' element={<UserAccount/>}/>
                                <Route path='ordersList' element={<OrderList/>}/>
                                <Route path='orderform' element={<OrderForm/>}/>
                                <Route path='orderslist/order/:id' element={<OrderDetails/>}/>
                            </Route>
                            <Route path='/product/:productId' exact element={<Product/>}/>

                            <Route path='search' element={<SearchProducts/>}/>

                            <Route element={<AdminRoute/>}>
                                <Route path='admin/panel' element={<AdminPanel/>}/>
                                <Route path='admin/allorders' element={<AdminAllOrdersList/>}/>
                                <Route path='admin/addproduct' element={<AdminAddProduct/>}/>
                                <Route path='admin/editproduct/list' element={<AdminProductList/>}/>
                                <Route path='admin/editproduct/:productId' element={<AdminEditProduct/>}/>
                                <Route path='admin/order/:id' element={<AdminOrderDetails/>}/>
                            </Route>
                        </Routes>
                        <Footer/>
                    </Wrapper>
                </BrowserRouter>

            </>
        );
    }

}

export default App;
