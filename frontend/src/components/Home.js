import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import {Slider} from './Slider'


const Home = () => {

    return (
        <div class="home content">
            <Link className="home__banner" to={`search?category=Podzespoły komputerowe`}>
                <img src="./baner.png" alt='baner'/>
            </Link>
            <Slider />
        </div>
    );


}

export default Home