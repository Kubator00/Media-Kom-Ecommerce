import React, {useEffect} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {Field, FieldArray, Form, Formik} from "formik";
import categories from "../productsComponents/categoryData";


const EditProductDetailsPanel = (props) => {
    let {initialValues, err, msg, productId, onClickFunction} = props;
    return (
        <div class={'editProduct-container'}>
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
                    <Form class="editProduct-form-container">
                        <label htmlFor="name">Nazwa produktu</label>
                        <Field name="name" class="editProduct-form-control"/>
                        <label htmlFor="categoryName">Nazwa kategorii</label>
                        <Field as="select" name="categoryName" class='editProduct-form-select'>
                            {categories.map((category) => (
                                <option value={category.name}>{category.name}</option>
                            ))}
                        </Field>
                        <label htmlFor="description">Opis</label>
                        <Field as="textarea" name="description" class="editProduct-form-control"/>
                        <label htmlFor="price">Cena</label>
                        <Field name="price" class="editProduct-form-control"/>
                        <label htmlFor="titleImagePath">Ścieżka do zdjęcia</label>
                        <Field name="titleImagePath" class="editProduct-form-control"/>
                        <FieldArray name="parameters">
                            {({insert, remove, push}) => (
                                <div>
                                    {values.parameters.map((parameter, index) => (
                                        <div className="editProduct-parameter-container" key={index}>
                                            Parametr {index}
                                            <div className="editProduct-parameter">
                                                <label htmlFor={`parameters.${index}.name`}>Nazwa</label>
                                                <Field
                                                    name={`parameters.${index}.name`}
                                                    type="text"
                                                    class="editProduct-form-control"
                                                />
                                                <label htmlFor={`parameters.${index}.name`}>Opis</label>
                                                <Field
                                                    name={`parameters.${index}.description`}
                                                    type="text"
                                                    class="editProduct-form-control"
                                                />
                                                <button
                                                    type="button"
                                                    className={'editProduct-deleteParameter-button'}
                                                    onClick={() => remove(index)}>
                                                    Usuń
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className={'editProduct-addParameter-button'}
                                        onClick={() => push({name: '', description: ''})}>
                                        Dodaj parametr
                                    </button>
                                </div>
                            )}
                        </FieldArray>
                        <button type="submit" className="editProduct-button">Dodaj produkt</button>
                    </Form>
                )}
            </Formik>
        </div>
    );

}
export default EditProductDetailsPanel;