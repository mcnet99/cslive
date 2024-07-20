io.on("connection", function (socket) {
  console.log( 'RESET');

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
  });


});