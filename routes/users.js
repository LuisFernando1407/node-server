var express = require('express');
var router = express.Router();
var config = require('../config/database.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    config.query('SELECT * FROM users',function (response) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(response);
    });
});
/* Return user  by id */
router.get('/:id', function (req, res) {
    config.query('SELECT * FROM users WHERE id=' + '"' + req.params.id + '"', function (response) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(response);
    });
});
/* Return user  by email, password or forgot password*/
router.get('/:email/:password', function (req, res) {
    if(req.params.password === 'null'){
        config.query('SELECT * FROM users WHERE email=' + '"' + req.params.email + '"', function (response) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json(response);
        });
    }else{
        config.query('SELECT * FROM users WHERE email=' + '"' + req.params.email + '"' + 'AND password=' + '"' + req.params.password + '"', function (response) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json(response);
        });
    }
});
/* Return user login */
router.post('/user', function (req, res) {
    config.query('INSERT INTO users(firstname, lastname, email, password) VALUES (' + '"' + req.body.firstname + '", ' +
        '" ' + req.body.lastname + '", ' + '"' + req.body.email + '", ' + '"' +  req.body.password + '")' , function (response) {
    });
    config.query('SELECT id FROM users WHERE email=' + '"' + req.body.email + '"' + 'AND password=' + '"' + req.body.password + '"', function (response) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(response);
    });
});
/* Returns everything if OK */
router.put('/user', function (req, res) {
    config.query('UPDATE users SET password=' + '"' +  req.body.newPassword + '"' + 'WHERE id=' + '"' + req.body.id + '"', function (response) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(response);
    });
});
module.exports = router;
