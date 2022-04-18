const express = require('express');
const router = express.Router();
const selectQuery = require('../../components/selectQuery')
const addProduct = require('../../components/addProduct')
const deleteProduct = require('../../components/deleteProduct')
const editProduct = require('../../components/editProduct')
const addProductSchema = require('../../components/validationSchemas/admin/addProductSchema')


router.post('/add', async (req, res) => {
    const schemaValidate = addProductSchema.validate({
        categoryName: req.body.categoryName,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        titleImagePath: req.body.titleImagePath
    });
    if (schemaValidate.error)
        return res.send('Niepoprawne dane');

    let productId;
    try {
        req.body['categoryId'] = (await selectQuery(`SELECT categoryId from categories where categoryName=LOWER('${req.body.categoryName}')`))[0]['categoryId'];
        productId = await addProduct(req);
    } catch (err) {
        console.log(err);
        return  res.status(400).send("Błąd dodawania produktu");
    }
    res.send({msg: "Produkt dodano pomyślnie", 'productId': productId})
})

router.post('/edit', async (req, res) => {
    const schemaValidate = addProductSchema.validate({
        categoryName: req.body.categoryName,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        titleImagePath: req.body.titleImagePath
    });
    if (schemaValidate.error)
        return res.status(400).send('Niepoprawne dane');

    try {
        req.body['categoryId'] = (await selectQuery(`SELECT categoryId from categories where categoryName=LOWER('${req.body.categoryName}')`))[0]['categoryId'];
        await editProduct(req);
    } catch (err) {
        console.log(err);
        return  res.status(400).send("Błąd edycji produktu");
    }
    res.send({msg: "Produkt dodano pomyślnie"})
})

router.post('/delete', async (req, res) => {
    try {
        await deleteProduct(req.body.productId);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Błąd usuwania produktu");

    }
    res.send({msg: "Produkt usuniety pomyślnie"})
})

module.exports = router;