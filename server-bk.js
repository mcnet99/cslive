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
 

  
 require("./liveQuiz")(io);

 

/*  const nsp = io.of("/liveQuiz");
 nsp.on("connection", function (socket) {
   console.log("someone connectedxxxx");
 });
 nsp.emit("hi", "everyone!");
 */
/* const users = {};
io.on("connection", function (socket) {
  console.log("a user connected");

  socket.on("login", function (data) {
    console.log("a user " + data.userId + " connected");
    // saving userId to object with socket ID
    users[socket.id] = data.userId;
  });

  socket.on("disconnect", function () {
    console.log("user " + users[socket.id] + " disconnected");
    // remove saved socket from users object
    delete users[socket.id];
  });
}); */

/* let users = {};
let socketList = {};
let currentQuestion = 0;
let gameStatus = "H";
let gameStartDate = null;
let youtubeID = null;

let memberPlayList = {};
let memberPlayTotal = 0;

let memberPlayData = {};

let questionList = {};
let questionTotal = 0;

let questionData = {};

let questionPlayNo = 0;

let totalPlayed = 0

let openAnswer = 0
let openTopScore = null;

let userTopScore = null;

 

// บ่งบอกสถานะคนที่เข้ามาใช้งาน โดยจะมีหมายเลข socket.id เเตกต่างกันครับ
io.on("connection", function (socket) {
  console.log(io.engine.clientsCount);
  
 


      socket.on("setUserTopScore", function (val) {
        userTopScore = val;
        io.emit("userTopScore", {
          userTopScore,
        });
      });

      socket.on("getUserTopScore", function () {
        io.emit("userTopScore", {
          userTopScore,
        });
      });


      socket.on("setOpenTopScore", function (val) {
        openTopScore = val;
        io.emit("openTopScore", {
          openTopScore,
        });
      });

      socket.on("getOpenTopScore", function () {
        io.emit("openTopScore", {
          openTopScore,
        });
      });




     socket.on("setOpenAnswer", function (q_no) {
       openAnswer = q_no;
       io.emit("openAnswer", {
         openAnswer,
       });
     });

     socket.on("getOpenAnswer", function () {
       io.emit("openAnswer", {
         openAnswer,
       });
     });



   socket.on("setTotalplayed", function (total) {
     totalPlayed = total;
     io.emit("totalPlayed", {
       totalPlayed,
     });
   });

   socket.on("getTotalplayed", function () {
     io.emit("totalPlayed", {
       totalPlayed,
     });
   });






   socket.on("setUserPlayST", function (data) {
     let qData = memberPlayData[data.member_id];

     console.log(qData);

     if(qData) { 
     qData.total_true = data.total_true;
        qData.total_wrong = data.total_wrong;
     qData.total_answer = data.total_answer;
     qData.answer = data.answer;
      qData.q_true = data.q_true;
       qData.q_wrong = data.q_wrong;
         qData.cssClass = data.cssClass;

   memberPlayData[data.member_id] = qData;

     io.emit("memberPlayData", {
       memberPlayData,
     });

    }

   });



  socket.on("setQuestionST", function (data) {
    let qData = questionData[data.question_no];

    qData.total_true= data.total_true;
    qData.total_answer= data.total_answer;
    qData.total_wrong= data.total_wrong;
 
    questionData[data.question_no] = qData;

    io.emit("questionData", {
      questionData,
    });
 
  });




  socket.on("setUserQuestionAnswer", function (data) {
    let qData = questionData[data.question_no];

    qData.member_answer[data.member_id] = data.choice_no;
    //console.log(qData);

    questionData[data.question_no] = qData;

    io.emit("questionData", {
      questionData,
    });

       io.emit("updateQuestionData", {
         qData,
       });


  });

  

  socket.on("setUserAnswer", function (data) {
    if (memberPlayData[data.member_id]) {
      let memberData = memberPlayData[data.member_id];
      memberData.answer = data.answer;

      memberPlayData[data.member_id] = memberData;
    }
    io.emit("memberPlayData", {
      memberPlayData,
    });
  });

  socket.on("setQuestionPlayNo", function (no) {
    questionPlayNo = no;
    io.emit("questionPlayNo", {
      questionPlayNo,
    });
  });

  socket.on("getQuestionPlayNo", function () {
    io.emit("questionPlayNo", {
      questionPlayNo,
    });
  });

  socket.on("setQuestionData", function (data) {
    questionData[data.no] = data;

    io.emit("questionData", {
      questionData,
    });
  });

  socket.on("getQuestionData", function () {
    io.emit("questionData", {
      questionData,
    });
  });

  socket.on("setMemberPlayData", function (data) {
    memberPlayData[data.member_id] = data;
  //  console.log(memberPlayData);

    io.emit("memberPlayData", {
      memberPlayData,
    });
  });

  socket.on("getMemberPlayData", function () {
    io.emit("memberPlayData", {
      memberPlayData,
    });
  });

  socket.on("setGameStatus", function (game) {
    gameStatus = game.status;
    gameStartDate = game.start_date;
    io.emit("gameStatus", {
      gameStatus: gameStatus,
      gameStartDate: gameStartDate,
    });
  });

  socket.on("setQuestion", function (val) {
    questionList = val.questionList;
    questionTotal = val.questionTotal;

    io.emit("questionDetail", {
      questionList: questionList,
      questionTotal: questionTotal,
    });
  });

  socket.on("getQuestion", function () {
    io.emit("questionDetail", {
      questionList: questionList,
      questionTotal: questionTotal,
    });
  });

  socket.on("setMemberPlay", function (val) {
    memberPlayList = val.userList;
    memberPlayTotal = val.userTotal;

    io.emit("memberPlay", {
      memberPlayList: memberPlayList,
      memberPlayTotal: memberPlayTotal,
    });
  });

  socket.on("getMemberPlay", function () {
    io.emit("memberPlay", {
      memberPlayList: memberPlayList,
      memberPlayTotal: memberPlayTotal,
    });
  });

  socket.on("setYoutube", function (val) {
    youtubeID = val;
    io.emit("YoutubeID", youtubeID);
  });

  socket.on("getYoutube", function () {
    io.emit("YoutubeID", youtubeID);
  });

  socket.on("getUserOnline", function () {
    io.emit("userOnline", users);
  });

  socket.on("getTotalOnline", function () {
    io.emit("totalOnline", Object.keys(users).length);
  });

  socket.on("setMember", function (val) {
    users[val.member_id] = val;
    socketList[socket.id] = val.member_id;

   // console.log(socketList);

    io.emit("userOnline", users);
  });

  socket.on("disconnect", function () {
    let member_id = socketList[socket.id];
    let memberData = memberPlayData[member_id];

    console.log("mmm");
    console.log(memberData);
    if (memberData) {
      memberData.cssClass = "memberPlayOffline";
    }
    // memberPlayData[member_id].cssClass = 'memberPlayOffline';

    memberPlayData[member_id] = memberData;

    io.emit("memberPlayData", {
      memberPlayData,
    });

    console.log("offline" + socket.id);
    delete users[socketList[socket.id]];
    io.emit("userOnline", users);
    io.emit("totalOnline", Object.keys(users).length);
  });

  // รับเฉพาะ Event ข้อความ จาก client
  socket.on("chat message", function (msg) {
    console.log("socket by : ", socket.id, " message: " + msg);
    // ส่งข้อมูลกลับไปหาผู้ส่งมา
    io.emit("chat message", "socket by : " + socket.id + " message: " + msg);
  });





  socket.on("resetData", function (val) {
    currentQuestion = 0;
    gameStatus = "H";
    gameStartDate = null;
    youtubeID = null;

    memberPlayList = {};
    memberPlayTotal = 0;

    memberPlayData = {};

    questionList = {};
    questionTotal = 0;

    questionData = {};

    questionPlayNo = 0;

    totalPlayed = 0;

    openAnswer = 0;
    openTopScore = null;

    userTopScore = null;

    io.emit("userTopScore", {
      userTopScore,
    });
    io.emit("openTopScore", {
      openTopScore,
    });
    io.emit("openAnswer", {
      openAnswer,
    });
    io.emit("totalPlayed", {
      totalPlayed,
    });
    io.emit("memberPlayData", {
      memberPlayData,
    });
    io.emit("questionData", {
      questionData,
    });
    io.emit("questionPlayNo", {
      questionPlayNo,
    });
    socket.on("getYoutube", function () {
      io.emit("YoutubeID", youtubeID);
    });

      io.emit("resetGame", {
        questionData,
      });

  });


}); */

http.listen(port, function () {
  console.log("Run Port // localhost:", port);
});

process.on("uncaughtException", function(err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});