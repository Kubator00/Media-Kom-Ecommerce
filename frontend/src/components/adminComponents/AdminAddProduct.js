import React from "react";
import {adminAddProduct} from '../../services/admin/adminAddProduct'
import {useDispatch, useSelector} from "react-redux";
import EditProductDetailsPanel from "./EditProductDetailsPanel";
import CategoryData from "../productsComponents/categoryData";


const AdminAddProduct = () => {
    const dispatch = useDispatch();
    const addProductHandler = (values) => {
        dispatch(adminAddProduct(values));
    };
    const msg = useSelector((state) => state.adminAddProductReducer.msg);
    const productId = useSelector((state) => state.adminAddProductReducer.productId);
    const err = useSelector((state) => state.adminAddProductReducer.error);
    const initialValues = {
        name: '',
        description: '',
        parameters: [{name: '', description: ''}],
        titleImagePath: '',
        categoryName: CategoryData[0].name,
        price: 0
    };

    return (
        <div>
            <h1>Dodaj produkt</h1>
            <EditProductDetailsPanel initialValues={initialValues} err={err} msg={msg} productId={productId}
                                     onClickFunction={addProductHandler}/>
        </div>
    );
}

export default AdminAddProduct;