const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
// @Route           GET api/auth
// @Description     Test Route
// @Access          Public
router.get('/',auth, async (req,res) =>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @Route           POST api/auth
// @Description     Authenticate user & get token
// @Access          Public
router.post('/',[
    check('email','Please include a valid email')
    .isEmail(),
    check('password','Password is required')
    .exists()
],
async (req, res) => {
    const errors = validationResult(req);
    // Return 400 error
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    // Retrieve data from request body
    const {email, password} = req.body;
    try {
        // Check if user already exists on DB
        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({errors:[{msg:'Invalid credentials'}]});
        }
        
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res
            .status(400)
            .json({errors:[{msg:'Invalid credentials'}]});
        }
        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn:36000000},
            (err, token)=>{
                if(err) throw err;
                res.json({token});
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
    
    module.exports = router;