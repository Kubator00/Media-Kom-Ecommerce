import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProdectedRoute from './ProtectedRoute';

import Navbar from './components/Navbar';
import Home from './components/Home'
import LogIn from './components/LogIn';

import MyAccount from './components/MyAccount';
import Product from './components/Product';
import MyCart from './components/MyCart';
import OrderForm from './components/OrderForm';
import MyOrders from './components/MyOrders';
import OrderDetails from './components/OrderDetails';
import AdminPanel from './components/admin/AdminPanel';
import AdminAllOrders from './components/admin/AdminAllOrders';
import AdminOrderDetails from './components/admin/AdminOrdersDetails';
import SearchProducts from './components/SearchProducts';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LogIn />} />

            <Route element={<ProdectedRoute />}>
              <Route path='mycart' element={<MyCart />} />
              <Route path='myaccount' element={<MyAccount />} />
              <Route path='myorders' element={<MyOrders />} />
              <Route path='orderform' element={<OrderForm />} />
              <Route path='myorders/order/:id' element={<OrderDetails />} />
              <Route path='admin/panel' element={<AdminPanel />} />
              <Route path='admin/allorders' element={<AdminAllOrders />} />
              <Route path='admin/order/:id' element={<AdminOrderDetails />} />
            </Route>
            <Route path='/product/:productId' exact element={<Product />} />
            <Route path="search">
              <Route path='keyword/:keyword/category/:category' element={<SearchProducts />} />
              <Route path='keyword/:keyword/category' element={<SearchProducts />} />
              <Route path='keyword//category/:category' element={<SearchProducts />} />
              <Route path='category/:category' element={<SearchProducts />} />
            </Route>

          </Routes>
        </BrowserRouter>

      </>
    );
  }

}

export default App;
