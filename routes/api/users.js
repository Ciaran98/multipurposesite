const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// Todo - Change Jwt expiration date
// @Route           POST api/users
// @Description     Validate input data, if errors return 400, else register user
// @Access          Public
router.post('/',[
    check('name','Name is required')
    .not()
    .isEmpty(),
    check('email','Please include a valid email')
    .isEmail(),
    check('password','Please include a password that is at least 6 characters in length')
    .isLength({min: 6})
],
async (req, res) => {
    const errors = validationResult(req);
    // Return 400 error
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    // Retrieve data from request body
    const {name, email, password} = req.body;
    try {
        // Check if user already exists on DB
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({errors:[{msg:'User already exists'}]});
        }
        // Get user gravatar
        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            default:'mm'
        });
        // Initialise new user
        user = new User({
            name,
            email,
            avatar,
            password
        });
        // Encrypt Password
        const salt = await bcrypt.genSalt(10);
        
        user.password = await bcrypt.hash(password,salt);
        
        await user.save();
        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }
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