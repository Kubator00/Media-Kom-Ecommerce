import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import './Home.css'
import { element } from 'prop-types';


const Cart = (props) => {
    const { id, img, title, price } = props;

    return (
        <Link to={`/product/${id}`} class="home-slider-product">
            <div class="home-slider-product-img-container">
                <img src={`./products/${img}`} alt='produkt' className='home-slider-product-img' />
            </div>
            <label>{title}</label>
            <label>Cena {price} zł</label>
        </Link>
    );
}

const Slider = () => {

    const [elementOnScreen, setelementOnScreen] = useState(4);
    const [index, setIndex] = useState(Array.from(Array(elementOnScreen).keys()));

    const [products, setProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);


    async function read() {
        await axios.post(`http://localhost:3010/products/recommended`)
            .then(result => {
                setProducts(result.data);
            })
            .catch(err => console.log(err));
    }

    useEffect(async () => {
        window.addEventListener('resize', handleResize);
        handleResize();
        await read();
    }, [])
    const handleResize = () => {
        if (window.innerWidth <= 700)
            return setelementOnScreen(1);
        if (window.innerWidth <= 1050)
            return setelementOnScreen(2);
        return setelementOnScreen(4);
    }
    const nextSlide = () => {
        let tmpIndex = [];
        index.forEach((element, i) => {
            element += elementOnScreen
            if (element >= products.length)
                element = element % elementOnScreen;
            tmpIndex.push(element);
        });
        setIndex(tmpIndex);
    }
    const prevSlide = () => {
        let tmpIndex = [];
        index.forEach((element, i) => {
            element -= elementOnScreen
            if (element < 0)
                element = products.length + element;
            tmpIndex.push(element);
        });
        setIndex(tmpIndex);
    }
    useEffect(() => {
        if (index.length > elementOnScreen)
            return setIndex(index.slice(0, elementOnScreen));
        else
            return setIndex(Array.from(Array(elementOnScreen).keys()));

    }, [elementOnScreen])

    useEffect(() => {
        let tmpProducts = [];
        index.forEach(element => {
            products[element] &&
                tmpProducts.push(products[element])
        });
        setDisplayProducts(tmpProducts);
    }, [products, index])


    if (displayProducts?.length > 0)
        return (
            <section class='slider'>
                <div class="home-slider">
                    <img onClick={prevSlide} src='./icons/circle-chevron-left-solid.svg' class='home-slider-buttons' />
                    {displayProducts.map((product) => (
                        <Cart img={product.title_img} title={product.title} price={product.price} id={product.id} />
                    ))}
                    <img onClick={nextSlide} src='./icons/circle-chevron-right-solid.svg' class='home-slider-buttons' />
                </div>
            </section >
        );

    return <div>Ładowanie...</div>
}

const Home = () => {

    return (
        <div class="home-container">
            <h1>Polecane produkty</h1>
            <Slider />
        </div>
    );


}

export default Home