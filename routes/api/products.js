const express = require('express');
const router = express.Router();

// @Route           GET api/products
// @Description     Test Route
// @Access          Public
router.get('/',(req,res) => res.send('Products Route'));

module.exports = router;