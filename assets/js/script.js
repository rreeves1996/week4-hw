var currentQuestion = 1;
var currentScore = 0;
var secondsLeft = 90;
var userScore = localStorage.getItem("userScore");
var quizQuestions = 
  ["0",
  "What is the name of the popular JavaScript API that was so successful that it was eventually integrated in to JavaScript itself?",
  "What is the name of JavaScript's object literal syntax?",
  "What was JavaScript originally called?",
  "Arrays in JavaScript use what type of brackets?",
  "What is the command that is frequently/easily used for debugging JavaScript code?"];
var quizAnswers =
  ["0", 
  "SayBlurry", "Biden's Precipice", "JQuery", "Rock",
  "Robert", "JSON", "Bananaphone", "SONJAY",
  "Latte", "Oracle", "Mocha", "Ben",
  "Square brackets", "Parentheses", "Fantasy Football League brackets", "Curly brackets",
  "if()", "console.log()", "Order 66", "Simon says stand up"];
var button1 = document.getElementById("answer-1");
var button2 = document.getElementById("answer-2");
var button3 = document.getElementById("answer-3");
var button4 = document.getElementById("answer-4");
var submitButton = document.getElementById("submit");
var restartButton = document.getElementById("restart-button");
var scores = document.getElementById("scoreRecord");
var scoreHasBeenRecorded = false;
var previousScores = localStorage.getItem("scores");

button1.addEventListener("click", function() {
  if(currentQuestion === 4) {
    console.log("correct");
    currentScore++;
    correctIndicator();
  } else {
    console.log("wrong");
    secondsLeft = secondsLeft - 10;
    incorrectIndicator();
  }
  nextQuestion();
});
button2.addEventListener("click", function() {
  if(currentQuestion === 2 || currentQuestion === 5) {
    console.log("correct");
    currentScore++;
    correctIndicator();
  } else {
    console.log("wrong");
    secondsLeft = secondsLeft - 10;
    incorrectIndicator();
  }
  nextQuestion();
});
button3.addEventListener("click", function() {
  if(currentQuestion === 1 || currentQuestion === 3) {
    console.log("correct");
    currentScore++;
    correctIndicator();
  } else {
    console.log("wrong");
    secondsLeft = secondsLeft - 10;
    incorrectIndicator();
  }
  nextQuestion();
});
button4.addEventListener("click", function() {
  console.log("wrong");
  secondsLeft = secondsLeft - 10;
  incorrectIndicator();
  nextQuestion();
});
submitButton.addEventListener("click", function() {
  if(!scoreHasBeenRecorded) {
    var recordedScore = document.createElement("li");
    recordedScore.setAttribute("id", "scoreRecord");
    var userInitials = document.getElementById("initials").value.toUpperCase();
    console.log(userInitials);
    recordedScore.textContent = userInitials + ": " + currentScore;
    document.body.children[2].children[3].children[9].appendChild(recordedScore);
    scoreHasBeenRecorded = true;
    localStorage.setItem("scores", scores);
  } else {
    alert("Score has already been submitted!");
  }
})
restartButton.addEventListener("click", function() {
  restart();
})

function startTime() {
  var timer = setInterval(function() {
    $('.timer').text(secondsLeft);
    secondsLeft--;
    if (secondsLeft < 0) {
      quizEnd();
      clearInterval(timer);
    }
  }, 1000);

}
function restart() {
  $("#title").text("JavaScript Quiz");
  $(".quiz-end").hide();
  $(".home").show();
  currentScore = 0;
  secondsLeft = 90;
  scoreHasBeenRecorded = false;
}
function start() {
  currentQuestion = 1;
  $(".home").hide();
  startTime();
  $('.timer').text(secondsLeft);
  $('.timer').show();
  $(".question-container").show();
  $(".question-box").text(quizQuestions[currentQuestion]);
  assignAnswers();

  
  currentScore = 0;
}
function incorrectIndicator() {
  $(".indicator").hide();
  $(".indicator").text("incorrect");
  $(".indicator").show();
  $(".indicator").fadeOut("slow");
  $(".timer-spacer").hide();
  $(".subtract-time").show();
  $(".subtract-time").fadeOut("slow");
  $(".timer-spacer").show();
}
function correctIndicator() {
  $(".indicator").hide();
  $(".indicator").text("correct");
  $(".indicator").show();
  $(".indicator").fadeOut("slow");
}


function assignAnswers() {
  $(".question-box").text(quizQuestions[currentQuestion]);
  button1.textContent = quizAnswers[currentQuestion * 4 - 3];
  button2.textContent = quizAnswers[currentQuestion * 4 - 2];
  button3.textContent = quizAnswers[currentQuestion * 4 - 1];
  button4.textContent = quizAnswers[currentQuestion * 4];
}

function nextQuestion() {
  if(currentQuestion < 5) {
    currentQuestion++;
    assignAnswers();
  } else {
    console.log(currentQuestion);
    quizEnd();
  }
}
function quizEnd() {
  $(".question-container").hide();
  $('.timer').hide();
  $(".quiz-end").show();
  $("#title").text("Quiz Complete");
  localStorage.setItem("userScore", currentScore);
  $(".score").text(currentScore)
}