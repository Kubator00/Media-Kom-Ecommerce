import React, {useEffect, useState} from "react";
import {adminEditProduct} from '../../services/admin/adminEditProduct'
import {adminDeleteProduct} from '../../services/admin/adminDeleteProduct'
import {useDispatch, useSelector} from "react-redux";
import EditProductDetailsPanel from "./EditProductDetailsPanel";
import {productFetch} from "../../services/ProductService";
import {Navigate ,useParams} from "react-router-dom";

const AdminEditProduct = (props) => {
    const dispatch = useDispatch();
    const {productId} = useParams();
    const updateProductHandler = (values) => {
        dispatch(adminEditProduct(values));
    };
    const deleteProductHandler = () => {
        dispatch(adminDeleteProduct(productId));
        setNeedRedirect(true);
    };
    const msg = useSelector((state) => state.adminEditProductReducer.msg);
    const err = useSelector((state) => state.adminEditProductReducer.error);
    const [initialValues, setInitialValues] = useState({
        productId: null,
        name: '',
        description: '',
        parameters: [],
        titleImagePath: '',
        categoryName: '',
        price: 0
    });
    const [needRedirect, setNeedRedirect] = useState(false);
    useEffect(() => {
        dispatch(productFetch(productId));
    }, [])

    const productDetails = useSelector(state => state.productReducer.productDetails);
    const productParameters = useSelector(state => state.productReducer.productParameters);
    useEffect(async () => {
        setInitialValues(
            {
                productId: productDetails.productId,
                name: productDetails.title,
                description: productDetails.description,
                titleImagePath: productDetails.titleImg,
                categoryName: productDetails.categoryName,
                price: productDetails.price,
                parameters: productParameters,
            }
        );
    }, [productDetails, productParameters])
    if (needRedirect)
        return <Navigate to={`/admin/editproduct/list`}/>

    return (
        <div>
            <h1>Edytuj produkt</h1>
            <button onClick={deleteProductHandler}>Usuń</button>
            <EditProductDetailsPanel initialValues={initialValues} err={err} msg={msg} productId={productId}
                                     onClickFunction={updateProductHandler}/>
        </div>
    );
}

export default AdminEditProduct;