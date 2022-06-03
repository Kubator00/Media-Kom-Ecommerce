import React from "react";
import {Link} from "react-router-dom";
import {Field, FieldArray, Form, Formik} from "formik";
import categories from "../productsComponents/categoryData";
import './AdminEditProduct.css'

const EditProductDetailsPanel = (props) => {
    let {initialValues, err, msg, productId, onClickFunction} = props;
    return (
        <div class={'editProduct'}>
            {err && <h4 style={{"color": "red"}}>{err}</h4>}
            {msg && <h4 style={{"color": "green"}}>{msg}</h4>}
            {productId &&
                <Link to={'/product/' + productId}>
                    <h4 style={{"color": "blue"}}>
                        Link do produktu
                    </h4>
                </Link>
            }
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={(values) => {
                    onClickFunction(values)
                }}
            >
                {({values}) => (
                    <Form class="editProduct__form">
                        <label htmlFor="name">Nazwa produktu</label>
                        <Field name="name" class="editProduct__formControl"/>
                        <label htmlFor="categoryName">Nazwa kategorii</label>
                        <Field as="select" name="categoryName" class='editProduct__formSelect'>
                            {categories.map((category) => (
                                <option value={category.name}>{category.name}</option>
                            ))}
                        </Field>
                        <label htmlFor="description">Opis</label>
                        <Field as="textarea" name="description" class="editProduct__formControl"/>
                        <label htmlFor="price">Cena</label>
                        <Field name="price" class="editProduct__formControl"/>
                        <label htmlFor="titleImagePath">Ścieżka do zdjęcia</label>
                        <Field name="titleImagePath" class="editProduct__formControl"/>
                        <FieldArray name="parameters">
                            {({insert, remove, push}) => (
                                <div>
                                    {values.parameters.map((parameter, index) => (
                                        <div className="editProduct__parameter" key={index}>
                                            Parametr {index}
                                            <div className="editProduct__parameterForm">
                                                <label htmlFor={`parameters.${index}.name`}>Nazwa</label>
                                                <Field
                                                    name={`parameters.${index}.name`}
                                                    type="text"
                                                    class="editProduct__formControl"
                                                />
                                                <label htmlFor={`parameters.${index}.name`}>Opis</label>
                                                <Field
                                                    name={`parameters.${index}.description`}
                                                    type="text"
                                                    class="editProduct__formControl"
                                                />
                                                <button
                                                    type="button"
                                                    className={'editProduct__deleteParameterBtn'}
                                                    onClick={() => remove(index)}>
                                                    Usuń
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className={'editProduct__addParameterBtn'}
                                        onClick={() => push({name: '', description: ''})}>
                                        Dodaj parametr
                                    </button>
                                </div>
                            )}
                        </FieldArray>
                        <button type="submit" className="editProduct__addBtn">Dodaj produkt</button>
                    </Form>
                )}
            </Formik>
        </div>
    );

}
export default EditProductDetailsPanel;