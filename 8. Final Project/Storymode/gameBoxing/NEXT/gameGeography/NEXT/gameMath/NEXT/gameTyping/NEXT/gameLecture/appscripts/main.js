require(
    ["../jslibs/raphael.lonce"],  // include a custom-built library

    function () {

        var centerDiv = document.getElementById("centerDiv");
        var paper = new Raphael(centerDiv);
        var pWidth = paper.width;
        var pHeight = paper.height;

        //checking the code works
        console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);

        //background image
        var bgImage = paper.image("Images/bg.jpg", 0, 0, pWidth, pHeight);

        var bgRect = paper.rect(0,0,pWidth, pHeight);
        bgRect.attr({
            "fill": "black",
            "fill-opacity" : 0
        });

        //constructs a random value given a range
        var randInt = function( m, n ) {
            var range = n-m;
            var frand = Math.random()*range;
            return m+Math.floor(frand);
        }

        var difficulty = 1; //speed which the person moves

        //if there is a change in difficulty
        var difficultySlider = document.getElementById("difficulty");
        difficultySlider.addEventListener("input", function(ev){
            difficulty = difficultySlider.value;
        });

        var maxCount;
        var images = [];
        var counterTotal = 0;
        var counterOrange = 0;
        var counterBlue = 0;
        var counterGreen = 0;


        // initialise maxCount
        maxCount = randInt(10,15)+(difficulty*3);
        //initialise images position
        images[1] = paper.image("Images/info1.png", -110, -110, 100, 100);
        images[2] = paper.image("Images/info2.png", -110, -110, 100, 100);
        images[3] = paper.image("Images/info3.png", -110, -110, 100, 100);
        images[4] = paper.image("Images/info4.png", -110, -110, 100, 100);
        images[5] = paper.image("Images/info5.jpg", -110, -110, 100, 100);

        var image = images[5];
        var posX,posY;

        //set quiz questions and answers
        var questions = [];
        questions[1] = "How many times did you click on the images?";
        questions[2] = "How many times did you click on the blue info?";
        questions[3] = "How many times did you click on the orange info?";
        questions[4]= "How many times did you click on the green info?";
        questions[5] = "How many 0s are there in the wikipedia info with 0s and 1s?";
        questions[6] = "How many 1s are there in the wikipedia info with 0s and 1s?";

        var answers = [];

        var moveSquare = function() {
            counterTotal++;
            console.log("clicked:" + counterTotal);
            console.log("green: " + counterGreen + ", blue: " + counterBlue + ", orange: " + counterOrange);

            if(counterTotal>=maxCount){
                //clicking game won
                endgame();

                //fill answers:
                answers[1] = counterTotal;
                answers[2] = counterBlue;
                answers[3] = counterOrange;
                answers[4] = counterGreen;
                answers[5] = 28;
                answers[6] = 35;

                //generate question
                if (difficulty==1 ){
                    var question = window.prompt(questions[1], "");
                    //if answered correctly
                    if (question == answers[1]){
                        paper.image("Images/win.jpg", 0, 0, pWidth, pHeight);
                        setTimeout(function(){
                            window.alert("Congradulations! You are really attentive in lecture today!");
                            window.location.href = ("NEXT/index.html");
                        },1000);
                        return;
                    }
                }else if (difficulty==3 || difficulty==4 || difficulty==2){
                    var specific = randInt(2,5);
                    console.log(specific);
                    var question = window.prompt(questions[specific], "");
                    //if answered correctly
                    if (question == answers[specific]){
                        paper.image("Images/win.jpg", 0, 0, pWidth, pHeight);
                        setTimeout(function(){
                            window.alert("Congradulations! Your memory is astonishing.");
                            window.location.href = ("NEXT/index.html");
                        },1000);
                        return;
                    }
                }else if (difficulty==5){
                    var specific = randInt(5,7);
                    console.log(specific);
                    var question = window.prompt(questions[specific], "");
                    //if answered correctly
                    if (question == answers[specific]){
                        paper.image("Images/win.jpg", 0, 0, pWidth, pHeight);
                        setTimeout(function(){
                            window.alert("Congradulations! You've probably done this a lot of times or googled the image... or seen my code.");
                            window.location.href = ("NEXT/index.html");
                        },1000);
                        return;
                    }
                }

                //if answered wrongly
                window.alert("Unfortunate that you listened in class but failed the quiz! \nWrong answer! Try again!");
                window.location.reload();
                
            }else{
                //game is not over, move object
                posX = randInt(0,pWidth-100);
                posY = randInt(0,pHeight-100);
                //remove current object
                image.attr({
                    "x" : -110,
                    "y" : -110
                });
                //move new image
                var specific = randInt(1,5);
                image = images[specific];

                //update specific counter
                if (specific==1){ counterBlue++; answers[1]++; }
                else if (specific==2){ counterOrange++; answers[2]++; }
                else if (specific==3){ counterGreen++; answers[3]++; }

                image.attr({
                    "x" : posX,
                    "y" : posY
                });
            }
        };

        //initial game state
        var gameState = false;
        var repeat;
        var timer;
        var button = document.getElementById("startButton");


        //end game function
        var endgame = function(){
            gameState = false;
            clearTimeout(timer);
        }

        //start game:
        button.addEventListener("click", function(ev){
            gameState = true;
            button.style.visibility = "hidden";

            //get difficulty
            maxCount = randInt(10,15)+(difficulty*5);
            images[1].addEventListener("click", moveSquare);
            images[2].addEventListener("click", moveSquare);
            images[3].addEventListener("click", moveSquare);
            images[4].addEventListener("click", moveSquare);
            images[5].addEventListener("click", moveSquare);

            //put image into the center
            image.attr({
                "x" : pWidth/2,
                "y" : pHeight/2
            });

            //timer which exceeded, loses game
            timer = setTimeout(function(){ 
                        alert("You failed to capture all the information! \nYou lose! Try again!");
                        window.location.reload();
                    }, 20000);

        });


        
});