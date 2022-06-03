const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Product = require('../../models/Product');
const config = require('config');
// @Route           Post api/products
// @Description     Add New Product
// @Access          Public
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('description','Description is required').not().isEmpty(),
    check('price','Price is required').not().isEmpty(),
    check('available','Avalibility is required').not().isEmpty(),
    check('imageurl','Image is required').not().isEmpty()
], async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name,description,price,available,imageurl} = req.body;
    try {
        product = new Product({
            name,
            description,
            price,
            available,
            imageurl
        });
        await product.save();
        res.json({product});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        
    }
});

module.exports = router;