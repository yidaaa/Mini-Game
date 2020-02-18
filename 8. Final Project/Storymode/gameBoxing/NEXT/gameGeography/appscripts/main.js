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
        var bgImage = paper.image("Images/mountains.jpg", 0, 0, pWidth, pHeight);

        var bgRect = paper.rect(0,0,pWidth, pHeight);
        bgRect.attr({
            "fill": "black",
            "fill-opacity" : 0
        });

        //use a person object 
        var person = paper.image("Images/person.png", 10, pHeight/2 + 20, 40, 40);
        // position of person on y axis
        var ypos = pHeight/2;

        //controllers 
        var upButton = document.getElementById("upButton");
        var downButton = document.getElementById("downButton");
        var startButton = document.getElementById("startButton");
        upButton.style.visibility = "hidden";
        downButton.style.visibility = "hidden";

        //-----------------------------------------------------------------------------
        var difficulty = 3; //speed which the person moves

        //if there is a change in difficulty
        var difficultySlider = document.getElementById("difficulty");
        difficultySlider.addEventListener("input", function(ev){
            difficulty = difficultySlider.value;
        });


        //constructs a random value given a range
        var randInt = function( m, n ) {
            var range = n-m;
            var frand = Math.random()*range;
            return m+Math.floor(frand);
        }

        //--------------------------------------------------------------------------------
        var moveup = function(){
            //check for boundary
            if (ypos>=0){
                //update y position of person
                ypos -= 1;
                //move the person object
                person.attr({
                    "y": ypos
                });
            }
            //console.log(ypos);
        };

        var movedown = function(){
            //check for boundary
            if (ypos<=pHeight-40){
                //update y position of person
                ypos += 1;
                //move the person object
                person.attr({
                    "y": ypos
                });
            }
            //console.log(ypos);
        };

                //check if player is holding the button
        var hold;
        //prevents multiple firing of events of up and down keys
        var boolean = true;

        //prevent movement of scrollbars by up and down button
        window.addEventListener("keydown", function(e) {
            // space and arrow keys
            if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
        }, false);

        //keyboard movement
        document.addEventListener("keydown", function(e) {
            if (e.keyCode == 38 && boolean) {   //if up and true
                hold = setInterval(moveup,difficulty);
                console.log("UP-pressed");
                boolean = false;
            } 
            else if (e.keyCode == 40 && boolean) {   // if down and true
                hold = setInterval(movedown,difficulty);
                console.log("DOWN-pressed");
                boolean = false;
            } 
        });

        document.addEventListener("keyup", function(e) {
            if (e.keyCode == 38) {   // if released up key, boolean back to true
                console.log("UP-released");
                clearInterval(hold);
                boolean = true;
            } 
            else if (e.keyCode == 40) {  // if released down key, boolean back to true
                console.log("DOWN-released");
                clearInterval(hold);
                boolean = true;
            } 
        });

        //movement of the person
        upButton.addEventListener("mousedown", function(ev){
            hold = setInterval(moveup,difficulty);
        });

        upButton.addEventListener("mouseup", function(ev){
            clearInterval(hold);
        });

        downButton.addEventListener("mousedown", function(ev){
            hold = setInterval(movedown,difficulty);
        });

        downButton.addEventListener("mouseup", function(ev){
            clearInterval(hold);
        });

        

        //---------------attempt--------------------------------------------------
        var numLogs = 10;
        var counter = 0;

        //2 arrays for top and bottom logs
        var logs = [];

        var logWidth = pWidth/20;
        var timer;
        var hslString;
        var top, bottom, length;

        var generate = function(){
            length = randInt(pHeight/4,pHeight/2);
            top = randInt(0,pHeight-length);
            bottom = top + length;
        }

        //creating all 30 logs
        var createlogs = function(){
            while (counter<numLogs){
                generate();

                logs[counter] = paper.rect(pWidth, top, logWidth, bottom);
                logs[counter].hslString = "hsl(" + 0 + "," + 1 + "," + randInt(5,25)/100 + ")";
                logs[counter].top = top;
                logs[counter].bottom = bottom;
                logs[counter].attr({
                    "fill" : logs[counter].hslString,
                    "stroke-width" : 5
                });

                counter++;
            }
        }

        //reset counter
        counter = 0;

        //-------------------------------------------------------------------------
        //end game function
        var endgame = function(){
            gameState = false;

            //prevent person from continuously going down if there isnt a mouseup detected before the game ends
            clearInterval(hold);
            //stop the logs from incoming
            clearInterval(repeat);
        };

        //callback functions to check if hit
        var hit = function(){
            //if hit log
            console.log("passed log: "+ counter);
            console.log("top of log:" + logs[counter-1].top + ", person:" + ypos+20 + " ,bottom of log:" + logs[counter-1].bottom);
            
            if (ypos > logs[counter-1].top){
                if(ypos < logs[counter-1].bottom){
                    //stop the interval and the game
                    endgame();
                    //stop the timer from running
                    clearTimeout(timer);
                    //tell the player he lost the game
                    alert("Oops! You just tripped! Click 'OK' to try again!");
                    window.location.reload();
                }
            }

            if (ypos+40 < logs[counter-1].bottom){
                if(ypos+40 > logs[counter-1].top){
                    //stop the interval and the game
                    endgame();
                    //stop the timer from running
                    clearTimeout(timer);
                    //tell the player he lost the game
                    alert("Oops! You just tripped! Click 'OK' to try again!");
                    window.location.reload();
                }
            }

            logs[counter-1].remove();
        };
            
                
        var repeat;

        //start game:
        startButton.addEventListener("click", function(ev){
            gameState = true;
            startButton.style.visibility = "hidden";
            upButton.style.visibility = "visible";
            downButton.style.visibility = "visible";

            //create the logs
            createlogs();
            //reset counter
            counter = 0;
            ypos = pHeight/2;

            //repeatedly move logs
            repeat = setInterval(function(){
                logs[counter].animate({"x": 0},2000, "linear", hit);
                counter++;
            },3000);

            timer = setTimeout(function(){ 
                        endgame();
                        paper.image("Images/win.jpg", 0, 0, pWidth, pHeight);

                        //link to next page after 1 second
                        setTimeout(function(){
                            //create a win box
                            alert("Congradulations! Click 'OK' to advance to the next stage!");
                            window.location.href = ("NEXT/index.html");
                        },1000);
                    }, 33000);

        });


        
});