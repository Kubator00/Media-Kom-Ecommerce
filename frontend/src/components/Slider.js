import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "./Slider.css"

const Cart = (props) => {
    const {id, img, title, price} = props;
    return (
        <Link to={`/product/${id}`} class='card'>
            <div class="card__img">
                <div>
                    <img src={`./products/${img}`} alt={`produkt ${title}`}/>
                </div>
            </div>
            <span>{title}</span>
            <h3>{price} zł</h3>
        </Link>
    );
}


export const Slider = () => {

    const [elementOnScreen, setElementOnScreen] = useState(5);
    const [index, setIndex] = useState(Array.from(Array(elementOnScreen).keys()));

    const [products, setProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);


    async function read() {
        await axios.get(`http://localhost:3010/products/recommended`)
            .then(result => {
                setProducts(result.data?.products);
            })
            .catch(err => console.log(err));
    }

    useEffect(async () => {
        window.addEventListener('resize', resizeHandler);
        resizeHandler();
        await read();
        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    }, [])

    const resizeHandler = () => {
        if (window.innerWidth <= 700)
            return setElementOnScreen(1);
        if (window.innerWidth <= 900)
            return setElementOnScreen(2);
        if (window.innerWidth <= 1400)
            return setElementOnScreen(3);

        return setElementOnScreen(5);
    }


    const nextSlide = () => {
        let result = [];
        let lastElement = index[index.length - 1];
        if (index.filter(element => element >= products.length - 1).length > 0)
            return;

        for (let i = 0; i < elementOnScreen; i++) {
            lastElement += 1;
            if (lastElement >= products.length)
                lastElement = 0;
            result.push(lastElement);
        }
        setIndex(result);
    }
    const prevSlide = () => {
        let result = [];
        let firstIndex = index[0];
        if (firstIndex[0] === 0)
            return;

        for (let i = 0; i < elementOnScreen; i++) {
            firstIndex -= 1;
            if (firstIndex < 0)
                firstIndex = products.length - 1
            result.push(firstIndex);
        }
        result = result.sort((a, b) => {
            return a - b;
        });
        setIndex(result);
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
            <div class='content'>
                <h1>Polecane produkty</h1>
                <div class='slider'>
                    <div className="slider__arrow">
                        <img
                            style={index[0] === 0 ? {display: 'none'} : {display: 'inherit'}}
                            alt='strzałka w lewo'
                            onClick={prevSlide}
                            src='./icons/angle-left.svg'
                        />
                    </div>
                    {displayProducts.map((product) => (
                        <Cart img={product.titleImg} title={product.title} price={product.price}
                              id={product.productId}/>
                    ))}
                    <div className="slider__arrow">
                        <img
                            style={(index.filter(element => element >= products.length - 1).length > 0) ? {display: 'none'} : {display: 'inherit'}}
                            alt='strzałka w prawo'
                            onClick={nextSlide}
                            src='./icons/angle-right.svg'
                        />
                    </div>

                </div>
            </div>
        );

    return <div>Ładowanie...</div>

}