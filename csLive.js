module.exports = function(io) {
  const nsp = io.of("/csLive");
 
  let youtubeID = "";
   
  let users = {};
  let socketList = {};
  let connectCounter = 0;
  let msg = null;
  let questionInfo = null;
  let playingQuestionId = null;

  let pendingQuestion = null;

 
  
  let answerHistory = null;

  nsp.on("connection", function(socket) {
    connectCounter++;
    console.log('Connected');
    console.log(connectCounter);
 
    socket.on("setYoutube", function(val) {
      youtubeID = val;
      nsp.emit("YoutubeID", youtubeID);
    });

  
    socket.on("getYoutube", function() {
      nsp.emit("YoutubeID", youtubeID);
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
     
    });

    socket.on("startBrowser", function(val) { 
      nsp.emit("getStart", { 
        pendingQuestion:pendingQuestion,
        youtubeID: youtubeID, 
        connectCounter: connectCounter,
        userOnline: users,
        totalOnline: Object.keys(users).length,
        questionInfo:questionInfo,
        playingQuestionId:playingQuestionId
      });
    });


    socket.on("setMember", function(member) {
        users[member.member_id] = member ;
        socketList[socket.id] = member.member_id ;

        console.log(users)
  
        nsp.emit("userOnline", {
          connectCounter: connectCounter,
          userOnline: users,
          totalOnline: Object.keys(users).length,
        });
      });

      socket.on("setMsg", function(val) {
        console.log(val)
        msg = val;
        nsp.emit("Msg", msg);
      });

      socket.on("setAnswerHistory", function(val) {
        console.log(val)
        answerHistory = val;
        nsp.emit("answerHistory", answerHistory);
      });

      socket.on("setQuestion", function(val) {
        console.log(val)
        questionInfo = val;
        if(questionInfo) { 
        playingQuestionId = questionInfo.question_id
        }
        nsp.emit("playQuestion", questionInfo);
      });


      socket.on("pendingQuestion", function(val) {
       
       pendingQuestion = val;
       questionInfo=null
       playingQuestionId = null
        
        nsp.emit("pendingQuestion", pendingQuestion);
      });

      socket.on("sendPoint", function(val) { 
        console.log(val)
         nsp.emit("getPoint", val);
       });



      socket.on("resetServer", function(val) {
        
        if(val) { 
                playingQuestionId = null
                questionInfo = null
           nsp.emit("resetServer", true);
        }
        
      });
      
  });
};
