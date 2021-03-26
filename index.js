const express = require("express");
const app = express();
const bodyParser = require("body-parser"); 

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const DB = {
  games: [
    {
      id:2,
      title: "Minecraft",
      year: 2012,
      price: 20
    },
    {
      id:34,
      title: "Need For Speed Underground",
      year: 2010,
      price: 30
    },
    {
      id:15,
      title: "Prince Of Persia",
      year: 2011,
      price: 45
    },
  ]
}

app.get("/games", (req, res) => {
  res.statusCode = 200;
  res.json(DB.games);
});

app.get("/game/:id", (req, res) => {
  if(isNaN(req.params.id)){
    res.send("ISSO NÃO É UM NÚMERO");
  }else{
    res.send("<h1>ISSO É UM NÚMERO</h1>");
  }
})

app.listen("8080", () => {
  console.log("API RODANDO!");
})