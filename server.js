console.log('server side code is runningu');
  
  const mysql2 = require('mysql2');
  const puppeteer = require('puppeteer-core');
  const express = require("express");
  const app = express();
  app.use(express.static('./public'));

//connection to database

const con = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "pass",
  database: "binance"

});


app.listen(8080, () => {
    console.log('listening on 8080');
});

// starting the site
app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
});

/*

this was in for testing purposes 

app.get('/form',(req,res) => {
  res.sendFile(__dirname + '/public/form.html');
});
*/

//if the form with action /getcrypto was used : 

app.get("/getcrypto", function (request, response){
  var crypto = request.query.crypto;

  if (crypto != "") {
      console.log("Your are interested in " + crypto);
      
      
      //if BTC was selected it loads puppeteer with binance.com site and scrapes the target value with the full xjpath then console.logs it
      
      if (crypto == "BTC") {(async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
          await page.goto('https://www.binance.com/en/markets');
      
          const element = await page.$x('/html/body/div[1]/div[1]/main/div/div[1]/div/div[1]/a/div[2]/div[1]');
          const textObject = await element[0].getProperty('textContent');
          text = textObject._remoteObject.value;
            //inserts the result to the database 
          var sql = "INSERT INTO bitcoin_prices (last_price) VALUES ('" + text + "')";
              con.query(sql, (err, result) =>{
              if (err) throw err;
              console.log("record inserted");
      
          });
      
      
      
        await browser.close();
      
      
      
      })();
        
      }

      // does the same with ETH ...

      if (crypto == "ETH") {(async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
          await page.goto('https://www.binance.com/en/markets');
      
          const element = await page.$x('/html/body/div[1]/div[1]/main/div/div[1]/div/div[2]/a/div[2]/div[2]');
          const textObject = await element[0].getProperty('textContent');
          text = textObject._remoteObject.value;
               //inserts the result to the database 
               var sql = "INSERT INTO ethereum_prices (last_price) VALUES ('" + text + "')";
               con.query(sql, (err, result) =>{
               if (err) throw err;
               console.log("record inserted");
       
           });
      
      
      
        await browser.close();
      
      
      
      })();
        
      }

      // and with DOT

      if (crypto == "DOT") {(async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
          await page.goto('https://www.binance.com/en/markets');
      
          const element = await page.$x('/html/body/div[1]/div[1]/main/div/div[1]/div/div[3]/a/div[2]/div[2]');
          const textObject = await element[0].getProperty('textContent');
          text = textObject._remoteObject.value;
               //inserts the result to the database 
               var sql = "INSERT INTO polkadot_prices (last_price) VALUES ('" + text + "')";
               con.query(sql, (err, result) =>{
               if (err) throw err;
               console.log("record inserted");
       
           });
      
      
      
        await browser.close();
      
      
      
      })();
        
      }
  } 
  
    else {
      if (err) throw err;
  }
});

/*

app.post('/clicked', (req, res) => {
    const click = {clickTime: new Date()};
    console.log(click);
      res.sendStatus(201);
    });
*/  