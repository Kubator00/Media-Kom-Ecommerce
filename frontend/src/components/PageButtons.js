import './PageButtons.css'
import React, { useEffect, useState } from 'react'
import { useDispatch} from "react-redux";
const PageButtons = (props) => {
    const { rowsFound, reducerFunction, elementsOnPage } = props
    const [currentNumber, setCurrentNumber] = useState(1);
    const [lastNumber, setLastNumber] = useState(Math.ceil(rowsFound / elementsOnPage));
    const [inputNumber, setInputNumber] = useState(1);

    useEffect(() => {
        setLastNumber(Math.ceil(rowsFound / elementsOnPage));
    }, [rowsFound])
  

    const dispatch = useDispatch();
    const clickHandler = (number) => {
        if (number < 1 || number > lastNumber)
            return;
        setCurrentNumber(number);
        dispatch(reducerFunction(number * elementsOnPage - elementsOnPage, elementsOnPage));
        window.scrollTo(0,0);
    }
    const inputHandler = (event) => {
        if (event.target.value === currentNumber)
            return;
        if (event.target.value < 1 || event.target.value > rowsFound)
            return;
        setInputNumber(parseInt(event.target.value, 10));

    }
    const inputKeyDownHandler = (event) => {
        if (event.key === 'Enter')
            clickHandler(inputNumber);
    }

    return (
        <div class='pagebuttons-container'>
            <div class='pagebuttons'>
                {
                    (lastNumber > 1) &&
                    <img src='./icons/circle-chevron-left-solid.svg' class='pagebuttons-nextbutton' onClick={() => { clickHandler(currentNumber - 1) }} />
                }
                <button onClick={() => { clickHandler(1) }}
                    class={currentNumber === 1 ? 'pagebuttons-current-button' : 'pagebuttons-button'}>
                    1
                </button>
                {
                    (currentNumber - 1 > 1) &&
                    <button onClick={() => { clickHandler(currentNumber - 1) }}
                        class='pagebuttons-button' >
                        {currentNumber - 1}
                    </button>
                }
                {
                    (currentNumber != 1 && currentNumber != lastNumber) &&
                    <button onClick={() => { clickHandler(currentNumber) }}
                        class={(currentNumber != 1 && currentNumber != lastNumber) ? 'pagebuttons-current-button' : 'pagebuttons-button'} >
                        {currentNumber}
                    </button>
                }
                {
                    (currentNumber + 1 < lastNumber) &&
                    <button onClick={() => { clickHandler(currentNumber + 1) }}
                        class='pagebuttons-button' >
                        {currentNumber + 1}
                    </button>
                }
                {(lastNumber > 2) &&
                    <input type='number' class='pagebuttons-input' onChange={inputHandler} onKeyDown={inputKeyDownHandler} />
                }
                {
                    (lastNumber > 1) &&
                    <>
                        <button onClick={() => { clickHandler(lastNumber) }}
                            class={currentNumber === lastNumber ? 'pagebuttons-current-button' : 'pagebuttons-button'}>
                            {lastNumber}
                        </button>

                        <img src='./icons/circle-chevron-right-solid.svg' class='pagebuttons-nextbutton' onClick={() => { clickHandler(currentNumber + 1) }} />

                    </>
                }
            </div>
        </div>
    );
}

export default PageButtons;