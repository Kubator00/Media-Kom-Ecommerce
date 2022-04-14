import {Formik, Form, Field, ErrorMessage} from "formik";
import React from "react";


const AdminAddNewProduct = () => {

    const addProductHandler = () => {
        ````
    };

    return (
        <div class={'addProduct-container'}>
            <h1>Dodaj produkt</h1>
            <Formik
                initialValues={{
                    name: '',
                    description: '',
                    parameters: [],
                    titleImagePath: '',
                    price: 0
                }}
                onSubmit={(values) => {
                    addProductHandler(values)
                }}
                // validationSchema={validate}
            >

                <Form class="login-login-form">
                    <label htmlFor="name">Nazwa produktu</label>
                    {/*<ErrorMessage name='email' component="div" class='login-errorMsg' />*/}
                    <Field name="name" class="login-login-form-control"/>
                    <label htmlFor="description">Opis</label>
                    {/*<ErrorMessage name='password' component="div" class='login-errorMsg' />*/}
                    <Field name="description" class="login-login-form-control"/>
                    <label htmlFor="price">Cena</label>
                    {/*<ErrorMessage name='password' component="div" class='login-errorMsg' />*/}
                    <Field name="price" class="login-login-form-control"/>
                    <label htmlFor="titleImagePath">Ścieżka do zdjęcia</label>
                    {/*<ErrorMessage name='password' component="div" class='login-errorMsg' />*/}
                    <Field name="titleImagePath" class="login-login-form-control"/>
                    <button type="submit" class="login-button">Dodaj</button>
                </Form>
            </Formik>
        </div>
    );


}

export default AdminAddNewProduct;