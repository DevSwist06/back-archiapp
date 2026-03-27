var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://front-archiapp.onrender.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

// Ici faut faire faire quelque chose à notre app...
// On va mettre les "routes"  == les requêtes HTTP acceptéés par notre application.


// Route /test/*
app.get('/test/*', function(req, res) {
  let msg = req.url.substr(6); // retire '/test/'
  res.json({msg: msg});
});

// Micro-service compteur
let compteur = 0;
app.get('/cpt/query', function(req, res) {
  res.json({ compteur: compteur });
});
app.get('/cpt/inc', function(req, res) {
  let v = req.query.v;
  if (v === undefined) {
    compteur += 1;
    res.json({ code: 0 });
  } else {
    if (String(v).match(/^[-]?\d+$/)) {
      compteur += parseInt(v);
      res.json({ code: 0 });
    } else {
      res.json({ code: -1 });
    }
  }
});

// Micro-service de gestion de messages
var allMsgs = ["Hello World", "foobar", "CentraleSupelec Forever"];
app.get('/msg/get/*', function(req, res) {
  let numStr = req.url.substr(9); // retire '/msg/get/'
  let num = parseInt(numStr);
  if (!isNaN(num) && num >= 0 && num < allMsgs.length) {
    res.json({ code: 1, msg: allMsgs[num] });
  } else {
    res.json({ code: 0 });
  }
});
app.get('/msg/getAll', function(req, res) {
  res.json(allMsgs);
});
app.get('/msg/nber', function(req, res) {
  res.json(allMsgs.length);
});
app.get('/msg/post/*', function(req, res) {
  let msg = req.url.substr(10); // retire '/msg/post/'
  msg = unescape(msg);
  allMsgs.push(msg);
  res.json({ num: allMsgs.length - 1 });
});
app.get('/msg/del/*', function(req, res) {
  let numStr = req.url.substr(9); // retire '/msg/del/'
  let num = parseInt(numStr);
  if (!isNaN(num) && num >= 0 && num < allMsgs.length) {
    allMsgs.splice(num, 1);
    res.json({ code: 1 });
  } else {
    res.json({ code: 0 });
  }
});



app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");

