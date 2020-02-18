require(
    ["../jslibs/raphael.lonce"],  // include a custom-built library

    function () {

        var centerDiv = document.getElementById("centerDiv");
        var paper = new Raphael(centerDiv);
        var pWidth = paper.width;
        var pHeight = paper.height;

        //checking the code works
        console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);

        //mage as background
        var bgImage = paper.image("Images/court.png", 0, 0, pWidth, pHeight);

        var bgRect = paper.rect(0,0,pWidth, pHeight);
        bgRect.attr({
            "fill": "black",
            "fill-opacity" : 0
        });

        //use a person object 
        var person = paper.circle(20, pHeight/2, 20);
        person.attr({
            "fill": "#e0ac69",
        })

        //-----------------------------------------------------------------------------
        //variable ball
        var ball;
        //array to store balls
        var balls = [];
        //initial number of balls
        var numBalls = 5;

        //if there is a change in difficulty
        var difficultySlider = document.getElementById("difficulty");
        difficultySlider.addEventListener("input", function(ev){
            numBalls = difficultySlider.value;
        });

        // index of individual balls
        var counter = 0;
        //--------------------------------------------------------------------------------

        //constructs a random value given a range
        var randInt = function( m, n ) {
            var range = n-m;
            var frand = Math.random()*range;
            return m+Math.floor(frand);
        }
        
        //creates the balls and variables
        var drawballs = function(){
                while (counter<numBalls){
                //creating a ball per loop
                var x = randInt(pWidth,pWidth);
                var y = randInt(0,pHeight);
                balls[counter] =  paper.circle(x, y, 20);

                //adding properties to ball
                balls[counter].xpos = x;
                balls[counter].ypos = y;
                balls[counter].xrate = randInt(3,9);
                balls[counter].yrate = randInt(3,9);
                balls[counter].attr({
                    "fill" : "hsl(" + 0 + "," + 1 + "," + 0.5 + ")"
                });
                //increase counter
                counter++;
            }
        };

        //initial game state
        var gameState = false;
        var repeat;
        var timer;
        var button = document.getElementById("startButton");

        //initial mouse state
        var mouseState = { 
            "pushed" : false,
            "x": 20,
            "y": pHeight/2
        };

        //movement of person
        person.node.addEventListener("mousedown", function(ev){
            //update mousestate coordinates
            mouseState.pushed = true;
            mouseState.x = ev.offsetX;
            mouseState.y = ev.offsetY;
        });

        bgRect.node.addEventListener("mousemove", function(ev){
            if (mouseState.pushed == true){
                //update mousestate coordinates
                mouseState.x = ev.offsetX;
                mouseState.y = ev.offsetY;
                //update person's coordinates
                person.animate({
                    "cx" : ev.offsetX,
                    "cy" : ev.offsetY
                },0,"linear");
            }
        });

        person.node.addEventListener("mouseup", function(ev){
            mouseState.pushed = false;
        });

        //calculate function
        var calculate = function(x1, y1, x2, y2){
            return Math.hypot(x2-x1, y2-y1);
        }

        //reusable variable for checking distance
        var distance;

        //end game function
        var endgame = function(){
            gameState = false;
            clearInterval(repeat);
        }


        // draw function
        var draw = function(){
            
            counter = 0;

            while(counter<numBalls){
                //assign ball to be the one 
                ball = balls[counter];

                //Update the position where we want our ball to be
                ball.xpos += ball.xrate;
                ball.ypos += ball.yrate;

                //move the ball using our 'state' variables
                ball.attr({'cx': ball.xpos, 'cy': ball.ypos});

                //keep the object on the paper
                if (ball.xpos > pWidth) {ball.xrate = -ball.xrate;}
                if (ball.ypos > pHeight) {ball.yrate = -ball.yrate};
                if (ball.xpos < 0) {ball.xrate = -ball.xrate;}
                if (ball.ypos < 0) (ball.yrate = -ball.yrate);

                //check if ball touches person
                distance = calculate(mouseState.x, mouseState.y, ball.xpos, ball.ypos);
                if (distance <= 30){
                    // player loses the game
                    endgame();
                    clearTimeout(timer);
                    alert("You lose! Press Start to play again!");
                    //reset the game by showing the button again
                    button.style.visibility = "visible";

                    //reset mousestate
                    mouseState.pushed = false;
                    mouseState.x = 20;
                    mouseState.y = pHeight/2;

                    //reset person
                    person.attr({
                        "cx": 20,
                        "cy": pHeight/2
                    })
                    break;
                }

                //increase counter and move to next ball
                counter++;
            }
        }

        //start game:
        button.addEventListener("click", function(ev){
            gameState = true;
            button.style.visibility = "hidden";
            // remove current balls
            for (i=0; i<balls.length; i++){
                balls[i].remove();
            }

            //create new balls:
            balls = [];
            counter = 0;
            drawballs();

            //repeat function to get the balls moving
            repeat = setInterval(draw,20);

            //set timer function if player wins the game
            timer = setTimeout(function(){ 
                        endgame();
                        paper.image("Images/win.jpg", 0, 0, pWidth, pHeight);

                        //link to next page after 1 second
                        setTimeout(function(){
                            //create a win box
                            alert("Congradulations! Click 'OK' to return to the homepage!");
                            window.location.href = ("http://nm2207.org/2019/e0175270/FinalProject/index.html");
                        },1000);
                    }, 15000);

        });


        
});