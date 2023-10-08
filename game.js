const COLORS = ["red","yellow","green","blue"];
const WRONG = new Audio("sounds/wrong.mp3");
var userClickedPattern =[];
var gamePattern = [];
var level=0;
var status;
var clicks;
var gameInProgress = false;

//=======================================================================


function ranColor() {
  var n = Math.floor(Math.random()*4);

  gamePattern.push(COLORS[n]); //added random colour ehhehehehehhehe  (to the patter to be followed ;c)
  console.log("latest/newest gamePattern : "+gamePattern);
  return COLORS[n];  //returns color hehehe just in case;) (removed return anyways)
}

function flashColor(color) {
    // console.log("flashed "+color+"");
    $("."+color+"").fadeOut(75).fadeIn(1);
}

function playSound(color) {
  var aud = new Audio("./sounds/"+color+".mp3");
  aud.play();
}

//================================================================================


function checkAnswer(){
  clicks+=1;
  console.log(clicks+" clicks(s)");

  var i = clicks-1;
  if (gamePattern[i] === userClickedPattern[i]){
    status= "right";
    console.log("user got "+level+" moves "+status);

    setTimeout(function() {
      if(userClickedPattern.length === gamePattern.length){
        nextSequence();
        userClickedPattern =[];
      }
    } , 1000)

  }else {
    status= "wrong";
    console.log("user got it "+status);
    $("h1").fadeOut();
    gameOver();
    reset();
  }
}


//========================================================
//cryaboutit
//game start, next level etc...

function nextSequence() {
  if (!gameInProgress) {
    return;
  }
  level +=1;
  clicks=0;
  $("h1").fadeOut();
  setTimeout(function() {
    $("h1").text("LeveL: "+level);
    $("h1").fadeIn();
  },400)

  setTimeout(function() {
      var color=  ranColor();
      flashColor(color);
      playSound(color);
  } , 1000 )
}

function gameOver() {
  gameInProgress = false;
  
  setTimeout(function() {
    WRONG.play();
    $("body").css("background-color","red");
    $("h1").text("Game Over! Press Any Key to Restart");
    $("h1").fadeIn();
    $(document).one("click keydown", function(event) { // add click and keydown event listeners to document
      if (event.type === "click" || event.which !== 0) { // check if event is a click or a keydown event with a non-zero key code
        $(document).off("click keydown");
        reset();
        game();
      }
    });
  },400)

  $(".btn").off("click"); //removes click event listener

}

function reset() {
  userClickedPattern =[];
  gamePattern = [];
  level=0;
  clicks=0;
  gameInProgress = false;
}

function game(){
  $("body").css("background-color","#011F3F");
  gameInProgress = true;
  nextSequence();

  $(".btn").click(function() {
    event.preventDefault;
    if (!gameInProgress) {
      return;
    }
    userChosenColor = this.id;

    // animatePress(this.id);
    console.log("user clicked "+userChosenColor);
    userClickedPattern.push(userChosenColor);    //push user click into userClickedPattern
    console.log("user click list: "+userClickedPattern+",");

    playSound(userChosenColor);
    flashColor(userChosenColor);

    checkAnswer();

  })
}


//  MAIN MAIN MAIN MAIN ======================================================:)


$("body").keypress(function() {
  $("body").off("keypress");
  $("body").off("click");
  game();
});

$("body").click(function() {
  $("body").off("click");
  $("body").off("keypress");
  game();
});


