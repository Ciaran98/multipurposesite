const express = require('express');
const router = express.Router();

// @Route           GET api/transaction
// @Description     Test Route
// @Access          Public
router.get('/',(req,res) => res.send('Transaction Route'));

module.exports = router;