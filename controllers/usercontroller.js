var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var sequelize = require('../db');
var User = sequelize.import('../models/user');


//SIGN UP
router.post('/signup', function(req, res) {
    User.create({
        firstName: req.body.user.firstname,
        lastName: req.body.user.lastname,
        email: req.body.user.email,
        passwordhash: bcrypt.hashSync(req.body.user.password, 10)
    }).then(
        function createSuccess(user) {
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.json({
                user: user,
                message: 'User successfully created!',
                sessionToken: token
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    )
})


//SIGN IN
router.post('/signin', function(req, res) {
    User.findOne({where: {email: req.body.user.email}})
    .then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, function(err,matches) {
                    if (matches) {
                        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: 'User successfully authenticated!',
                            sessionToken: token
                        })
                    } else {
                        res.status(502).send({error: 'User failed to authenticate'})
                    }
                });
            } else {
                res.status(500).send({error: 'User failed to authenticate'})
            }
        },
        function (err) {
            res.status(501).send({error: 'User failed to authenticate'})
        }
    )
})


module.exports = router