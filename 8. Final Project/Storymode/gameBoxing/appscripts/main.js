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
        var bgImage = paper.image("Images/gym.jpg", 0, 0, pWidth, pHeight);

        var bgRect = paper.rect(0,0,pWidth, pHeight);
        bgRect.attr({
            "fill": "black",
            "fill-opacity" : 0
        });

        //use a punchingbag object 
        var punchingbag = paper.image("Images/bag.png", pWidth/3, 0, pWidth/3, pHeight*2/3);

        //-----------------------------------------------------------------------------
        //initial counter and target
        var target = 17;
        var counter = 2;

        var score = "You have " + (target - counter) + " more punches left!"; 

        //change value of counter there is a change in difficulty
        var difficultySlider = document.getElementById("difficulty");
        difficultySlider.addEventListener("input", function(ev){
            target = difficultySlider.value;
            score = "You have " + (target - counter) + " more punches left!"; 
        });

        var length = pWidth - 160;
        var height = 30;
        
        //background for status bar
        var perUnit = length/15;
        var bgtimer = paper.rect(130, pHeight-50, length, height);
        bgtimer.attr({
            "fill" : "black"
        });

        var bgscore = paper.rect(130, pHeight-85, length/3, height);
        bgscore.attr({
            "fill" : "white"
        });

        var timerbar = paper.rect(130, pHeight-50, length, height);
        timerbar.attr({
            "fill" : "red"
        });

        var timerText = paper.text(160, pHeight-30, 'TIME LEFT:');
        var scoreText;


        //--------------------------------------------------------------------------------

        //initial game state
        var gameState = false;
        var repeat;
        var timer;
        var button = document.getElementById("startButton");
        var left = true;

        //function that increases counter
        var pressed = function(){
            counter++;

            scoreText.attr({
                "text": "You have " + (target - counter) + " more punches left!"
            })

            if (left){
                punchingbag.animate({
                "x": pWidth/3 + 10
                },50,"bounce");
                left = false;
            }else{
                punchingbag.animate({
                "x": pWidth/3
                },50,"bounce");
                left = true;
            }
            

            if (counter>=target){
                endgame();
                paper.image("Images/win.jpg", 0, 0, pWidth, pHeight);

                //link to next page after 1 second
                setTimeout(function(){
                    //create a win box
                    alert("Congradulations! Click 'OK' to advance to the next stage!");
                    window.location.href = ("NEXT/index.html");
                },1000);
            }
        };

        //increases on click
        punchingbag.node.addEventListener("click", pressed);

        //end game function
        var endgame = function(){
            gameState = false;
            clearInterval(repeat);
            clearTimeout(timer);
        }


        // decrease function per second
        var decrease = function(){
            counter --;
            
            //update timer bar 
            length -= perUnit;
            timerbar.attr({
                "width" : length
            });

            //update scoreText
            scoreText.attr({
                "text": "You have " + (target - counter) + " more punches left!"
            })

            if (counter < 0){
                //player loses
                        endgame();
                        alert("You lose! Press Start to play again!");
                        //reset the game by showing the button again
                        button.style.visibility = "visible";
                        // reset counter and target;
                        target = difficultySlider.value;
                        counter = 2;
                        // reset timer bar
                        length = pWidth - 160;
                        timerbar.attr({
                            "width" : length
                        });
                        //reset scoreText
                        scoreText.remove();
            }
        }

        //start game:
        button.addEventListener("click", function(ev){
            gameState = true;
            button.style.visibility = "hidden";
            //bring out score
            scoreText = paper.text(220, pHeight - 70, score);
            counter = 2;

            //repeatedly decrease counter per second
            repeat = setInterval(decrease,1000);

            //set timer function for player to lose game when exceeding 15s
            timer = setTimeout(function(){ 
                        //player loses
                        endgame();
                        alert("You lose! Press Start to play again!");
                        //reset the game by showing the button again
                        button.style.visibility = "visible";
                        // reset counter and target;
                        target = difficultySlider.value;
                        counter = 2;
                        // reset timer bar
                        length = pWidth - 160;
                        timerbar.attr({
                            "width" : length
                        });
                        //reset scoreText
                        scoreText.remove();
                    }, 15000);

        });


        
});