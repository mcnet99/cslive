var express = require("express");
var app = express();

var http = require("http").Server(app);

 
var port = process.env.PORT || 3000;

const io = require("socket.io")(http, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true,
  },
});

var port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/", function (req, res) {
  res.send(
    `<h1> Hello Vue.js 2 socket. io </h1> <br> <li> yarn add socket </li> <li> function socket.io  </li>`
  );
});

app.get("/liveQuiz", function (req, res) {
  res.send(
    `<h1> Hello Vue.js 2 socket. io </h1> <br> <li> yarn add socket </li> <li> function socket.io  </li>`
  );
});
 
app.get("/csLive", function (req, res) {
  res.send(
    `<h1> csLive</li>`
  );

});
  
 require("./liveQuiz")(io);
 require("./csLive")(io);

  

http.listen(port, function () {
  console.log("Run Port // localhost:", port);
});

process.on("uncaughtException", function(err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

//nodemon server.js