/**
 * Created by luis1 on 03/02/2017.
 */
var express = require('express');
var router = express.Router();
var config = require('../config/database.js');
/* GET tasks listing. */
router.get('/', function(req, res, next) {
    config.query('SELECT * FROM tasks ', function (response) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(response);
    });
});
/* Return taksUserLogin  by id */
router.get('/:id', function (req, res) {
    config.query('SELECT *, DATE_FORMAT(remember_me,"%d/%m/%Y" ) as remember FROM tasks WHERE user_id=' + '"' + req.params.id + '"', function (response) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(response);
    });
});
/* Post Task */
router.post('/task', function (req, res) {
    config.query('INSERT INTO tasks(user_id, title, task_user, remember_me, priority, favorite, status) VALUES (' + '"' + req.body.user_id + '", "' +
        req.body.title + '", "' + req.body.task + '", "' + req.body.remember + '", "' + req.body.priority + '", "' + req.body.favorite + '", 0)', function (response) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(response);
    });
});
/* Put task */
router.put('/task', function (req, res) {
    config.query('UPDATE tasks SET title=' + '"' +  req.body.title + '", ' + 'task_user=' + '"' + req.body.task_user + '", ' +
        'remember_me=' + '"' + req.body.remember + '", ' + 'priority=' + '"' + req.body.priority + '", ' + 'favorite=' + '"' + req.body.favorite + '" ' + 'WHERE id=' + '"' + req.body.id + '"', function (response) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(response);
    });
});
/* Delete task */
router.delete('/task/:id', function (req, res) {
    config.query('DELETE FROM tasks WHERE id=' + '"' +  req.params.id + '"', function (response) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(response);
    });
});
/* Finish tasks */
router.put('/task/finish/:id', function (req, res) {
    config.query('UPDATE tasks SET status = 1 WHERE id=' + '"' +  req.params.id + '"', function (response) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(response);
    });
});

/* Generate Report */
router.post('/task/greport', function (req, res) {
    config.query('SELECT title, task_user, DATE_FORMAT(remember_me,"%d/%m/%Y" ) as remember, priority, status FROM tasks WHERE user_id=' + req.body.id + ' AND remember_me >= ' +  "'" + req.body.date_i + "'" + ' AND remember_me <= ' + "'" + req.body.date_f + "'", function (response) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(response);
    });
});

module.exports = router;

