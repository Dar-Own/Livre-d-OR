let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'tuto',
  insecureAuth : true,
});

connection.connect();

module.exports = connection