const mysql2 = require('mysql2');

const con = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "binance"
});

con.connect((err) => {
if (err) throw err;
console.log("Connected");

var sql =" CREATE TABLE polkadot_prices (last_price VARCHAR(255))";

con.query(sql, (err,result) => {
    if (err) throw err;
    console.log("Table created");
});

});