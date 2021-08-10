const mysql2 = require("mysql2");

const conn = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "binance"

});

conn.connect((err) => {
    if (err) throw err;
    var sql = "SELECT * FROM polkadot_prices";
    conn.query(sql,(err,result,fields) => {
        if (err) throw err;
            console.log(result);

    });

});