const mysql2 = require('mysql2');

const con = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "pass" 
});

con.connect( (err) => {
if (err) throw err;
con.query("CREATE DATABASE binance", (err,result) => {
    if (err) throw err;
    console.log("Database created");
});
*/
});
