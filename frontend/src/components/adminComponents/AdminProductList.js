import {Formik, Form, Field, ErrorMessage, FieldArray} from "formik";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {addToCart} from "../../services/MyCartService";
import PageButtons from "../PageButtons";
import {productsSearch} from "../../services/SearchService";
import {useDispatch, useSelector} from "react-redux";
import '../productsComponents/SearchProducts.css'
import './AdminEditProductList.css'


const AdminProductList = () => {
    const dispatch = useDispatch()
    const elementsOnPage = 4;
    const inProgress = useSelector((state) => state.searchProductsReducer.inprogress);
    const products = useSelector((state) => state.searchProductsReducer.products);
    const rowsFound = useSelector((state) => state.searchProductsReducer.rowsFound);
    let keyword = '';
    const [details, setDetails] = useState({
        keyword: '',
        category: '',
        filter: null,
        limit: {beginning: 0, numOfRows: elementsOnPage}
    })
    const keywordHandler = (event) => keyword = event.target.value;

    const searchHandler = () => {
        console.log(details)
        setDetails((prevState) => ({
            ...prevState,
            keyword: keyword
        }));
        dispatch(productsSearch(details));
    }


    return (
        <div className='searchProducts-productContainer'>
            <div className='editProduct-list-searchProduct-container'>
                <div class='editProduct-list-searchProduct'>
                    <label> Wyszukaj produktu:</label> <input type='text' onChange={keywordHandler}/>
                    <button onClick={searchHandler}>Wyszukaj</button>
                </div>
            </div>
            {products?.length > 0 ?
                products.map((product) => (
                    <div class='searchProducts-product-container'>
                        <div className='searchProducts-product-left'>
                            <img src={`./products/${product.titleImg}`} className='searchProducts-product-left-img'/>
                            <div className='searchProducts-product-left-label'>
                                <label>{product.title}</label>
                                <h4>{product.price} zł</h4>
                            </div>
                        </div>
                        <div className='searchProducts-product-right'>
                            <Link to={`/admin/editproduct/${product.productId}`}>
                                Edytuj
                            </Link>
                        </div>
                    </div>
                )) :
                <div> Brak wyników </div>
            }

            <PageButtons rowsFound={rowsFound} elementsOnPage={elementsOnPage} reducerFunction={productsSearch}
                         argsFunction={details}/>

        </div>
    )
}

export default AdminProductList;