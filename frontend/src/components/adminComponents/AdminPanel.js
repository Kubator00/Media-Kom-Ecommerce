import React from 'react'
import {Link} from 'react-router-dom'
import './AdminPanel.css'

function AdminPanel() {

    return (
        <div className='adminPanel'>
            <h1>Panel administracyjny</h1>
            <Link to='/admin/allorders' className='adminPanel__link'>
                Wszystkie zamówienia
            </Link>
            <Link to='/admin/addproduct' className='adminPanel__link'>
                Dodaj nowy produkt
            </Link>
            <Link to='/admin/editproduct/list' className='adminPanel__link'>
                Edytuj produkt
            </Link>
        </div>
    );

}

export default AdminPanel;