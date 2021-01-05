//Imports
require('dotenv').confiq;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWT_SECRET = process.env.JWT_SECRET

//Models
// const User = require('../models/User')
const db = require('../models');

//GET Route for api/user/test (Public)
router.get('/test', (req, res) => {
    res.json({msg: 'User endpoint is OK'})
});

//POST Route for api/users.register (Public)
router.post('/register', (req, res)=>{
    //Find user by email
    db.User.findOne({ email: req.body.email})
    .then(user =>{
        //If email already exist we want to send a 400 response
        if (user) {
            return res.status(400).json({ msg: 'Email already exist'})
        } else {
            //Create a new user
            const newUser = new db.User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                imageURL: null
            });
            //Salt and has password, then save the user
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw Error;

                bcrypt.hash(newUser.password, salt, (error, hash) =>{
                    if (error) throw Error;
                    //Change password in newUser to hash
                    newUser.password = hash;
                    newUser.save()
                    .then(createdUser => res.json(createdUser))
                    .catch(err => console.log(err));
                })
            })
        }
    })
})

//POST Route api/users/login (Public)
router.post('/login', (req, res)=> {
    const email = req.body.email
    const password = req.body.password

    //Find a iser via email
    db.User.findOne({ email })
    .then(user => {
        console.log(user);
        //if no user
        if (!user) {
            res.status(400).json({ msg: 'User not Found' })
        } else {
        // User found in the db
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                //Check password for match
                if (isMatch) {
                    console.log(isMatch);
                    //User match, send a JSON Web Token
                    //Create token payload
                    const payload = {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        imageURL: user.imageURL
                    };

                    //Sign token
                    // 3600000 is 1 hour
                    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (error, token)=> {
                        res.json({
                            success: true,
                            token: `Bearer ${token}`
                        });
                    });
                } else {
                    return res.status(400).json({ password: 'Email or Password is incorrect' })
                }
            })
        }
    })
})

//
router.get('/current', passport.authenticate('jwt', { session: false }),(req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        imageURL: req.user.imageURL
    })
})

router.put('/update', (req, res)=> {
    db.User.findOneAndUpdate(
        {_id: req.body.userID},
        {email: req.body.email, name:req.body.name, imageURL: req.body.url}, // Changed in MongoDB 4.2
        {
          upsert: true
        }
     ).then(res =>{
        console.log('successful', res);
     })
})

<<<<<<< HEAD
router.put('/updateProfile', (req, res)=> {
    db.User.findOneAndUpdate(
        {_id: req.body.userID},
        {imageURL: url}, // Changed in MongoDB 4.2
        {
          upsert: true
        }
     ).then(res =>{
        console.log('successful');
     })
})
=======
// router.put('/updateProfile', (req, res)=> {
//     db.User.findOneAndUpdate(
//         {_id: req.body.userID},
//         {imageURL: req.body.url }, // Changed in MongoDB 4.2
//         {
//           upsert: true
//         }
//      ).then(res =>{
//         console.log('successful', res);
//      })
// })
>>>>>>> 94b840f2889325526771a50dddad88ad64bcebde

router.post('/newShop', (req, res)=>{
    //Find user by email
    console.log('creating shop');
    db.Tattoo.findOne({ name: req.body.name})
    .then(tattooShop =>{
        //If email already exist we want to send a 400 response
        if (tattooShop) {
            return res.status(400).json({ msg: 'Shop Already Exist'})
        } else {
            //Create a new user
            const newTattoo = new db.Tattoo({
                name: req.body.name,
                address: req.body.address,
                url: req.body.url,
                phone: req.body.phone,
                imageURL: req.body.imageURL
            })
            newTattoo.save()
            .then(createdShop => {
                res.json(createdShop)
            })
        }
    }).catch(error => {
        console.log(`Error creating shop----${error}`);
    })
})

router.get('/welcomeshops', (req, res)=> {
    console.log('Loaded Irezumi Top Picks');
    db.Tattoo.find()
    .then(foundShops => {
        res.json({foundShops})
    })
})

module.exports = router;