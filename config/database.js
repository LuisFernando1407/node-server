    /**
 * Created by luis1 on 30/01/2017.
 */
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'mytasks'
});
//Query
module.exports.query = function(queryString, callback){
    try {
        connection.query(queryString, function (err, rows, fields) {
            if (err) {
                throw err;
            }
            callback(rows);
        });
    }catch (e){
        console.log(e);
    }
};