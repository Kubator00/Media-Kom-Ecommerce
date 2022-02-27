import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
        <Router>
          <Navbar />
          <Switch>
            <Route path='/logIn' exact component=
              {LogIn} />
            <Route path='/' exact component=
              {Home} />
 
            <Route path='/product:id' component=
              {Product} />
            <Route path='/search/keyword=:keyword?/category=:category?' component= {SearchProducts} />
            <Route path='/search/category=:category?' component= {SearchProducts} />
            
            <ProdectedRoute path='/myaccount' component={MyAccount} />
            <ProdectedRoute path='/mycart' component={MyCart} />
            <ProdectedRoute path='/orderform' component={OrderForm} />
            <ProdectedRoute path='/myorders' component={MyOrders} />
            <ProdectedRoute exact path='/order:id' exact component={OrderDetails} />
            <ProdectedRoute path="/admin/panel" component={AdminPanel} />
            <ProdectedRoute path="/admin/allorders" component={AdminAllOrders} />
            <ProdectedRoute path='/admin/order:id' component={AdminOrderDetails} />
          </Switch>
        </Router>

      </>
    );
  }

}

export default App;
