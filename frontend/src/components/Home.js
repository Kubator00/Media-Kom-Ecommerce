import React from 'react'
import { Link, Redirect, Route } from "react-router-dom";
import './Home.css'
import { useState, useEffect } from 'react'



class Home extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div class="home-container">
            
                <h1>Polecane produkty</h1>
          
            </div>
        );

    }
}

export default Home