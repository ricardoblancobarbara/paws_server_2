var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var Service = sequelize.import('../models/service');


//GET ALL SERVICES FOR ALL USERS
router.get('/all', function (req, res) {
    //var userid = req.user.id;
    Service.findAll({
        //where: {
        //    owner: userid
        //}
    }).then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});


//CREATE ONE SERVICE FOR ONE USER
router.post('/create', function (req, res) {
    Service.create({
        owner: req.user.id,
        service: req.body.service.service,
        price: req.body.service.price,
        availability: req.body.service.availability
    }).then(
        function createSuccess(service) {
            res.json({
                service: service
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }        
    );
});


//DELETE ONE SERVICE FOR ONE USER
router.delete('/delete/:id', function (req, res) {
    Service.destroy({
        where: {
            id: req.params.id,
            owner: req.user.id
        }
    }).then(
        function deleteServiceSuccess(service) {
            res.send('Service removed successfully!');
        },
        function deleteServiceError(err) {
            res.send(500, err.message);
        }        
    );
});


//GET ALL SERVICES FOR ONE USER
router.get('/getall', function (req, res) {
    var userid = req.user.id;
    Service.findAll({
        where: {
            owner: userid
        }
    }).then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});


//GET ONE SERVICE FOR ONE USER
router.get('/getone/:id', function(req, res) {
    Service.findOne({
        where: {
            id: req.params.id,
            owner: req.user.id
        } 
    }).then(
        function findOneSuccess(data) {
            res.json(data);
        },
        function findOneError(err) {
            res.send(500, err.message)
        }
    )
})


//UPDATE ONE SERVICE FOR ONE USER
router.put('/update/:id', function(req, res) {
    Service.update({
        owner: req.user.id,
        service: req.body.service.service,
        price: req.body.service.price,
        availability: req.body.service.availability
    }, 
    {where: {
        id: req.params.id 
        }, returning: true
    }).then(
        function updateSuccess(service) {
            res.json({
                service: service
                //owner: req.user.id,
                //service: req.body.service.service,
                //price: req.body.service.price,
                //availability: req.body.service.availability
            });
        },
        function updateError(err) {
            res.send(500, err.message)
        }
    );
})


module.exports = router;
