module.exports = function(io) {
  const nsp = io.of("/liveQuiz");
  let gameID = null;
  let openTicker = null;
  let openChat = null;
  let questionPlayNo = 0;
  let playTime = null;
  let questionStatus = null;
  let openAnswer = 0;
  let youtubeID = "";
  let msg = null;
  let gameStatus = null;
  let gameStartDate = null;
  let questionData = {};
  let questionViewNo = 0;

  let users = {};
  let socketList = {};
  let connectCounter = 0;

  let countAnswer = 0;
  let countAnswerTrue = 0;
  let countAnswerWrong = 0;
  let countAnswerEmpty = 0;

  let userScore = {};
  let userAnswer = {};

  nsp.on("connection", function(socket) {
    connectCounter++;
    console.log('Connected');
    console.log(connectCounter);

 

    socket.on("setOpenAnswer", function(q_no) {
      openAnswer = q_no;
      nsp.emit("openAnswer", {
        openAnswer,
      });
    });

    socket.on("setQuestionData", function(data) {
      questionData = data;

      console.log(questionData);
    });

    socket.on("setGameStatus", function(game) {
      gameStatus = game.status;
      gameStartDate = game.start_date;
      nsp.emit("gameStatus", {
        gameStatus: gameStatus,
        gameStartDate: gameStartDate,
      });
    });


           socket.on("setGameControlID", function(val) {
         gameID = val;
          nsp.emit("gameID", {
            gameID,
          });
        });



        socket.on("setOpenChat", function(val) {
          openChat = val;
          nsp.emit("openChat", {
            openChat,
          });
        });

  socket.on("setOpenTicker", function(val) {
    openTicker = val;
    nsp.emit("openTicker", {
      openTicker,
    });
  });





    socket.on("setStartQuestion", function(val) {
      playTime = val.PlayTime;
      questionPlayNo = val.QuestionPlayNo;
      questionStatus = "PLAY";
      countAnswer = 0;
      countAnswerTrue = 0;
      countAnswerWrong = 0;
      countAnswerEmpty = 0;

      console.log(val);

      if (questionData[questionPlayNo]) {
        questionData[questionPlayNo].play = questionStatus;

        console.log("qData No " + questionPlayNo);
        console.log(questionData[questionPlayNo]);
      } else {
        console.log("Not Question Data " + questionPlayNo);
      }

      nsp.emit("startQuestion", {
        questionData: questionData,
        countAnswer: countAnswer,
        countAnswerTrue: countAnswerTrue,
        countAnswerWrong: countAnswerWrong,
        countAnswerEmpty: countAnswerEmpty,
        playTime: playTime,
        questionPlayNo: questionPlayNo,
        questionStatus: "PLAY",
      });
    });






    socket.on("setQuestionStatus", function(val) {
      questionStatus = val.questionStatus;
      questionPlayNo = val.questionPlayNo;

      if (questionData[questionPlayNo]) {
        questionData[questionPlayNo].play = val.questionStatus;

        console.log("qData No " + questionPlayNo);
        console.log(questionData[questionPlayNo]);

        if (questionStatus == "COMPLETE") {
          questionPlayNo = 0;
        }
      } else {
        console.log("Not Question Data " + questionPlayNo);
      }

      nsp.emit("questionStatus", {
        questionData: questionData,
        questionStatus: questionStatus,
        questionPlayNo: questionPlayNo,
      });
    });




    socket.on("setMsg", function(val) {
      msg = val;
      nsp.emit("Msg", msg);
    });



    socket.on("setMember", function(member_id) {
      users[member_id] = member_id;
      socketList[socket.id] = member_id;

      nsp.emit("userOnline", {
        connectCounter: connectCounter,
        userOnline: users,
        totalOnline: Object.keys(users).length,
      });
    });


      socket.on("updateUserList", function(val) {
       
        nsp.emit("getUserList",true);
      });



    socket.on("setYoutube", function(val) {
      youtubeID = val;
      nsp.emit("YoutubeID", youtubeID);
    });




    socket.on("getYoutube", function() {
      nsp.emit("YoutubeID", youtubeID);
    });




    socket.on("setMemberAnswer", function(data) {
      console.log(data);

      if (data) {
        if (data.collect) {
          if (data.collect != "C") {
            countAnswer++;
          }
          if (data.collect == "T") {
            countAnswerTrue++;
          }
          if (data.collect == "W") {
            countAnswerWrong++;
          }
          if (data.collect == "C") {
            countAnswerEmpty++;
          }

          console.log(countAnswer);
          nsp.emit("countAnswer", {
            countAnswer: countAnswer,
            countAnswerTrue: countAnswerTrue,
            countAnswerWrong: countAnswerWrong,
            countAnswerEmpty: countAnswerEmpty,
          });
        }
      }
 
    });


    socket.on("setQuestionView", function(data) { 
      questionViewNo = data
       console.log(questionViewNo);
        nsp.emit("questionView", questionViewNo);

    });
 





    socket.on("disconnect", function() {
      console.log("offline : " + socket.id);
      connectCounter--;
      console.log(connectCounter);

      delete users[socketList[socket.id]];
      nsp.emit("userOnline", {
        connectCounter:connectCounter,
        userOnline: users,
        totalOnline: Object.keys(users).length,
      });
    });

    socket.on("resetData", function(val) {
      questionPlayNo = 0;
      totalTime = null;
      questionStatus = null;
      openAnswer = 0;

      userScore = val.userScore;
      userAnswer = val.userAnswer;

      console.log(userScore);
      console.log(userAnswer);

      gameStatus = "H";
      gameStartDate = null;
      nsp.emit("gameStatus", {
        reSetAll:true,
        gameStatus: gameStatus,
        gameStartDate: gameStartDate,
      });
    });

    socket.on("startBrowser", function(val) {
      nsp.emit("getStart", {
        gameID:gameID,
        openTicker: openTicker,
        openChat: openChat,
        questionStatus: questionStatus,
        questionPlayNo: questionPlayNo,
        userOnline: users,
        playTime: playTime,
        gameStatus: gameStatus,
        youtubeID: youtubeID,
        gameStartDate: gameStartDate,
        totalOnline: Object.keys(users).length,
      });
    });
  });
};
