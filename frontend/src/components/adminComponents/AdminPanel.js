import React from 'react'
import {Link} from 'react-router-dom'
import './AdminPanel.css'

class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div class='adminpanel-conatiner'>
                <h1>Panel administracyjny</h1>
                <Link to='/admin/allorders' class='adminpanel-link'>
                    Wszystkie zamówienia
                </Link>
                <Link to='/admin/addproduct' class='adminpanel-link'>
                    Dodaj nowy produkt
                </Link>
                <Link to='/admin/editproduct/list' class='adminpanel-link'>
                    Edytuj produkt
                </Link>
            </div>
        );
    }
}

export default AdminPanel;