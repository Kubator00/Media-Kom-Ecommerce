const express = require('express');
const router = express.Router();
const connection = require("../index").connection;


router.post('/recommended', async (req, res) => {
    const getRecommendedProductsId = () => {
        return new Promise((resolve) => {
            connection.query(
                `SELECT * FROM recommended_products LIMIT 10`,
                (error, result) => {
                    if (error)
                        return res.status(400).send('Błąd pobierania danych');
                    resolve(result)
                }
            );
        });
    }

    const recommendedProductsId = await getRecommendedProductsId();
    let ids = '';
    recommendedProductsId.forEach(element => {
        ids += `${element.product_id},`
    });
    ids = ids.substring(0, ids.length - 1);

    const getProducts = () => {
        return new Promise((resolve) => {
            connection.query(
                `SELECT id,title,price,title_img FROM products where id in (${ids}) `,
                (error, result) => {
                    if (error)
                        return res.status(400).send('Błąd pobierania danych');
                    resolve(result)
                }
            );
        });
    }
    const products = await getProducts();
    return res.send(products);
})


module.exports = router;