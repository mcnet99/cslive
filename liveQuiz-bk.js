/*    var express = require("express");
 var app = express();
 var http = require("http").Server(app);
 
 const io = require("socket.io")(http, {
   cors: {
     origin: "*",
     methods: ["GET", "POST"],
     allowedHeaders: ["Access-Control-Allow-Origin"],
     credentials: true,
   },
 });

 console.log('ddd888dd')

   const nsp = io.of("/liveQuiz");
nsp.on("connection", function (socket) {
  console.log("someone connectedxxxx");
});
nsp.emit("hi", "everyone!");
 */

 

 // console.log('ooooo') 


  module.exports = function (io) {
      const  nsp = io.of("/liveQuiz");

      let users = {};
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

      let totalPlayed = 0;

      let openAnswer = 0;
      let openTopScore = null;

      let userTopScore = null;

      let totalTime = null;

      let msg = new Array();
    


    nsp.on("connection", function (socket) {
      //console.log("ppppp pfff");


         socket.on("setMsg", function (val) {
 //console.log(val);
            msg.unshift(val );

            const index = msg.indexOf(50);
            
            
            

            if (msg.length > 50) {
            
          
             msg.splice(index, 1);

             
            }

           // console.log(msg)

        
         nsp.emit("msg", {
           msg,
         });
       });

          socket.on("getMsg", function() {
            nsp.emit("msg", {
              msg,
            });
          });


     
       socket.on("setUserTopScore", function (val) {
         userTopScore = val;
         nsp.emit("userTopScore", {
           userTopScore,
         });
       });

       socket.on("getUserTopScore", function () {
         nsp.emit("userTopScore", {
           userTopScore,
         });
       });

       socket.on("setOpenTopScore", function (val) {
         openTopScore = val;
         nsp.emit("openTopScore", {
           openTopScore,
         });
       });

       socket.on("getOpenTopScore", function () {
         nsp.emit("openTopScore", {
           openTopScore,
         });
       });

       socket.on("setOpenAnswer", function (q_no) {
         openAnswer = q_no;
         nsp.emit("openAnswer", {
           openAnswer,
         });
       });

       socket.on("getOpenAnswer", function () {
         nsp.emit("openAnswer", {
           openAnswer,
         });
       });

       socket.on("setTotalplayed", function (total) {
         totalPlayed = total;
         nsp.emit("totalPlayed", {
           totalPlayed,
         });
       });

       socket.on("getTotalplayed", function () {
         nsp.emit("totalPlayed", {
           totalPlayed,
         });
       });

       socket.on("setUserPlayST", function (data) {
         let qData = memberPlayData[data.member_id];

         //console.log(qData);

         if (qData) {
           qData.total_true = data.total_true;
           qData.total_wrong = data.total_wrong;
           qData.total_answer = data.total_answer;
           qData.total_empty = data.total_empty;
           qData.answer = data.answer;
           qData.q_true = data.q_true;
           qData.q_wrong = data.q_wrong;
           qData.q_empty = data.q_empty;
           qData.cssClass = data.cssClass;

           memberPlayData[data.member_id] = qData;

           nsp.emit("memberPlayData", {
             memberPlayData,
           });
         }
       });

       socket.on("setQuestionST", function (data) {
         let qData = questionData[data.question_no];

         qData.total_true = data.total_true;
         qData.total_answer = data.total_answer;
         qData.total_wrong = data.total_wrong;
         qData.total_empty = data.total_empty;

         questionData[data.question_no] = qData;

         nsp.emit("questionData", {
           questionData,
         });
       });

       socket.on("setUserQuestionAnswer", function (data) {
         let qData = questionData[data.question_no];

         qData.member_answer[data.member_id] = data.choice_no;
         //console.log(qData);

         questionData[data.question_no] = qData;

         nsp.emit("questionData", {
           questionData,
         });

         nsp.emit("updateQuestionData", {
           qData,
         });
       });

       socket.on("setUserAnswer", function (data) {
         if (memberPlayData[data.member_id]) {
           let memberData = memberPlayData[data.member_id];
           memberData.answer = data.answer;

           memberPlayData[data.member_id] = memberData;
         }
         nsp.emit("memberPlayData", {
           memberPlayData,
         });
       });

       socket.on("setQuestionPlayNo", function (no) {
         questionPlayNo = no;
         nsp.emit("questionPlayNo", {
           questionPlayNo,
         });
       });

       socket.on("getQuestionPlayNo", function () {
         nsp.emit("questionPlayNo", {
           questionPlayNo,
         });
       });

       socket.on("setQuestionData", function (data) {
         questionData[data.no] = data;

         nsp.emit("questionData", {
           questionData,
         });
       });

       socket.on("getQuestionData", function () {
         nsp.emit("questionData", {
           questionData,
         });
       });

       socket.on("setMemberPlayData", function (data) {
         memberPlayData[data.member_id] = data;
         //  console.log(memberPlayData);

         nsp.emit("memberPlayData", {
           memberPlayData,
         });
       });

       socket.on("getMemberPlayData", function () {
         nsp.emit("memberPlayData", {
           memberPlayData,
         });
       });

       socket.on("setGameStatus", function (game) {
         gameStatus = game.status;
         gameStartDate = game.start_date;
         nsp.emit("gameStatus", {
           gameStatus: gameStatus,
           gameStartDate: gameStartDate,
         });
       });

       socket.on("setQuestion", function (val) {
         questionList = val.questionList;
         questionTotal = val.questionTotal;

         nsp.emit("questionDetail", {
           questionList: questionList,
           questionTotal: questionTotal,
         });
       });

       socket.on("getQuestion", function () {
         nsp.emit("questionDetail", {
           questionList: questionList,
           questionTotal: questionTotal,
         });
       });

       socket.on("setMemberPlay", function (val) {
         memberPlayList = val.userList;
         memberPlayTotal = val.userTotal;

         nsp.emit("memberPlay", {
           memberPlayList: memberPlayList,
           memberPlayTotal: memberPlayTotal,
         });
       });

       socket.on("getMemberPlay", function () {
         nsp.emit("memberPlay", {
           memberPlayList: memberPlayList,
           memberPlayTotal: memberPlayTotal,
         });
       });

       socket.on("setYoutube", function (val) {
         youtubeID = val;
         nsp.emit("YoutubeID", youtubeID);
       });

       socket.on("getYoutube", function () {
         nsp.emit("YoutubeID", youtubeID);
       });


         socket.on("setTotalTime", function(val) {
           totalTime = val;
           nsp.emit("totalTime", totalTime);
         });
         socket.on("getTotalTime", function() {
           nsp.emit("totalTime", totalTime);
         });



       socket.on("getUserOnline", function () {
         nsp.emit("userOnline", users);
       });

       socket.on("getTotalOnline", function () {
         nsp.emit("totalOnline", Object.keys(users).length);
       });

       socket.on("setMember", function (val) {
         users[val.member_id] = val;
         socketList[socket.id] = val.member_id;

         // console.log(socketList);

         nsp.emit("userOnline", users);
       });

       socket.on("disconnect", function () {
         let member_id = socketList[socket.id];
         let memberData = memberPlayData[member_id];

         //console.log("mmm");
         //console.log(memberData);
         if (memberData) {
           memberData.cssClass = "memberPlayOffline";
         }
         // memberPlayData[member_id].cssClass = 'memberPlayOffline';

         memberPlayData[member_id] = memberData;

         nsp.emit("memberPlayData", {
           memberPlayData,
         });

         console.log("offline" + socket.id);
         delete users[socketList[socket.id]];
         nsp.emit("userOnline", users);
         nsp.emit("totalOnline", Object.keys(users).length);
       });

       // รับเฉพาะ Event ข้อความ จาก client
       socket.on("chat message", function (msg) {
         //console.log("socket by : ", socket.id, " message: " + msg);
         // ส่งข้อมูลกลับไปหาผู้ส่งมา
         nsp.emit(
           "chat message",
           "socket by : " + socket.id + " message: " + msg
         );
       });




       ///////////

socket.on("userStart", function (msg) {

     nsp.emit("userTopScore", {
       userTopScore,
     });
     nsp.emit("openTopScore", {
       openTopScore,
     });
     nsp.emit("openAnswer", {
       openAnswer,
     });
     nsp.emit("totalPlayed", {
       totalPlayed,
     });
     nsp.emit("memberPlayData", {
       memberPlayData,
     });

      nsp.emit("memberPlay", {
        memberPlayList: memberPlayList,
        memberPlayTotal: memberPlayTotal,
      });

        nsp.emit("questionDetail", {
          questionList: questionList,
          questionTotal: questionTotal,
        });

     nsp.emit("questionData", {
       questionData,
     });
     nsp.emit("questionPlayNo", {
       questionPlayNo,
     });
     nsp.emit("totalTime", totalTime);
   
     nsp.emit("YoutubeID", youtubeID);

    nsp.emit("userOnline", users);
   nsp.emit("totalOnline", Object.keys(users).length);

     
        
       });


       ////////////////////
     

       socket.on("resetData", function (val) {
         currentQuestion = 0;
         gameStatus = "H";
         gameStartDate = null;
          

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

         nsp.emit("userTopScore", {
           userTopScore,
         });
         nsp.emit("openTopScore", {
           openTopScore,
         });
         nsp.emit("openAnswer", {
           openAnswer,
         });
         nsp.emit("totalPlayed", {
           totalPlayed,
         });
         nsp.emit("memberPlayData", {
           memberPlayData,
         });
         nsp.emit("questionData", {
           questionData,
         });
         nsp.emit("questionPlayNo", {
           questionPlayNo,
         });
        
         nsp.emit("YoutubeID", youtubeID);
    
           nsp.emit("userOnline", users);
           nsp.emit("totalOnline", Object.keys(users).length);

         nsp.emit("resetGame", {
           questionData,
         });
       });

      // other listeners will go here.
    });
  };