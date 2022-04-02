import React from 'react'
import { Link } from 'react-router-dom'
import './AdminPanel.css'

class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div class='adminpanel-conatiner'>
                <Link to='/admin/allorders' class='adminpanel-link'>
                    <label>Wszystkie zamówienia</label>
                </Link>
            </div>
        );
    }
}

export default AdminPanel;