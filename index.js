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
    res.sendStatus(400);
  }else{
    const id = parseInt(req.params.id);

    const game = DB.games.find(g => g.id == id);

    if(game != undefined){
      res.statusCode = 200;
      res.json(game);
    }else{
      res.sendStatus(404);
    }
  }
})

app.post("/game", (req, res) => {
  const {title, price, year} = req.body;

  DB.games.push({
    id: 2332,
    title,
    price,
    year,
  });

  res.sendStatus(200);

})

app.delete("/game/:id", (req, res) => {

  if(isNaN(req.params.id)){
    res.sendStatus(400);
  }else{
    const id = parseInt(req.params.id);
    const index = DB.games.findIndex(g => g.id == id);

    if(index == -1){
      res.sendStatus(404);
    }else{
      DB.games.splice(index,1);
      res.sendStatus(200);
    }
  }
})

app.put("/game/:id", (req, res) => {
  if(isNaN(req.params.id)){
    res.sendStatus(400);
  }else{
    const id = parseInt(req.params.id);

    const game = DB.games.find(g => g.id == id);

    if(game != undefined){
       
      const {title, price, year} = req.body;
       
      if(title != undefined){
        game.title = title;
      }

      if(price != undefined){
        game.price = price;
      }

      if(year != undefined){
        game.year = year;
      }   

      res.sendStatus(200);
    }else{
      res.sendStatus(404);
    }
  }
})

app.listen("8080", () => {
  console.log("API RODANDO!");
})