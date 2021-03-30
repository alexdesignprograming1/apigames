const express = require("express");
const app = express();
const bodyParser = require("body-parser"); 
const cors = require("cors");
const jwt = require("jsonwebtoken");

const JWTSecret = "FtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjdiZDRhZjQxLWU5MTQtNDY0Mi05MzA5L"

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function auth(req, res, next){
  const authToken = req.headers['authorization'];
  if(authToken != undefined){
    const bearer = authToken.split(' ');
    var token = bearer[1];

    jwt.verify(token, JWTSecret, (err, data) => {
      if(err){
        res.status(401);
        res.json({err:"Token inválido"});
      }else {
        req.token = token;
        req.loggedUser = {id: data.id, email: data.email};
        next();
      }
    })
  }else{
    res.status(401);
    res.json({err: "Token inválido"});
  }
  next();
}

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
  ],
  users: [
    {
      "id": 39,
      "firstname": "Kylynn",
      "lastname": "Brenn",
      "city": "Buffalo",
      "country": "Haiti",
      "countryCode": "SV",
      "email": "Kylynn.Brenn@gmail.com",
      "age": 24,
      "password": "nodejs"
    },
    {
      "id": 100,
      "firstname": "Georgetta",
      "lastname": "Francene",
      "city": "Koror",
      "country": "Guernsey",
      "countryCode": "SR",
      "email": "Georgetta.Francene@gmail.com",
      "age": 81,
      "password": "nodejs"
    },
    {
      "id": 50,
      "firstname": "Ayn",
      "lastname": "Fitzsimmons",
      "city": "Lisbon",
      "country": "Saint Lucia",
      "countryCode": "NF",
      "email": "Ayn.Fitzsimmons@gmail.com",
      "age": 99,
      "password": "nodejs"
    },
    {
      "id": 85,
      "firstname": "Celestyna",
      "lastname": "Corabella",
      "city": "Hanover",
      "country": "Georgia",
      "countryCode": "VE",
      "email": "Celestyna.Corabella@gmail.com",
      "age": 45,
      "password": "nodejs"
    }
  ]
}

app.get("/games",auth, (req, res) => {
  res.statusCode = 200;
  res.json({user: req.loggedUser,games: DB.games});
});

app.get("/game/:id",auth, (req, res) => {
  
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

app.post("/game",auth, (req, res) => {
  const {title, price, year} = req.body;

  DB.games.push({
    id: 2332,
    title,
    price,
    year,
  });

  res.sendStatus(200);

})

app.delete("/game/:id",auth, (req, res) => {

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

app.put("/game/:id",auth, (req, res) => {
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

app.post("/auth",auth, (req, res) => {
  const  {email, password} = req.body;

  if(email != undefined){

    const user = DB.users.find(dados => dados.email == email);

      if(user != undefined){

        
        if (user.password == password) {
          jwt.sign({id: user.id, email: user.email}, JWTSecret,{expiresIn: '48h'},(err, token) => {
            if(err){
              res.status(400);
              res.json({err: "Falha interna"});
            }else{
              res.status(200);
              res.json({token: token});
            }
          });
        }else{
          res.status (401);
          res.json({err: "Credenciais inválidas!"});
        }
      }else{
        res.status(404);
        res.json({ err: "O E-mail inválido! não existe na base de dados!"});
      }

  }else{
    res.status(400);
    res.json({err: "O E-mail enviado é inválido!"})
  }

})

app.listen("8080", () => {
  console.log("API RODANDO!");
})