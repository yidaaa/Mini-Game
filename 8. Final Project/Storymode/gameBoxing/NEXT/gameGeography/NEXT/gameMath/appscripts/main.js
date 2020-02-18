require(
    ["../jslibs/raphael.lonce"],  // include a custom-built library

    function () {

        //-----------------------------------------------------------------------------
        var difficulty = 5;

        //if there is a change in difficulty
        var difficultySlider = document.getElementById("difficulty");
        difficultySlider.addEventListener("input", function(ev){
            difficulty = difficultySlider.value;
        });

        //--------------------------------------------------------------------------------

        //constructs a random value given a range
        var randInt = function( m, n ) {
            var range = n-m;
            var frand = Math.random()*range;
            return m+Math.floor(frand);
        }
        

        //initial game state
        var gameState = false;
        var repeat;
        var timer;
        var answers = []; var a,b,c,d,e;
        var correct = true;
        var button = document.getElementById("startButton");
        var submitButton = document.getElementById("submitButton");

        //get all 10 questions
        var q1 = document.getElementById("q1");
        var q2 = document.getElementById("q2");
        var q3 = document.getElementById("q3");
        var q4 = document.getElementById("q4");
        var q5 = document.getElementById("q5");
        var q6 = document.getElementById("q6");
        var q7 = document.getElementById("q7");
        var q8 = document.getElementById("q8");
        var q9 = document.getElementById("q9");
        var q10 = document.getElementById("q10");


        //generate all 10 questions, print in innerHTML, then store answers in array
        var generate = function(){
            a = randInt(1,difficulty);
            b = randInt(1,difficulty);
            q1.innerHTML = a + " + " + b + " =";
            answers[1] = a+b;

            a = randInt(1,difficulty);
            b = randInt(1,difficulty);
            c = randInt(1,difficulty);
            q2.innerHTML = a + " + " + b + " - " + c + " =";
            answers[2] = a+b-c;

            a = randInt(1,difficulty);
            b = randInt(1,difficulty);
            q3.innerHTML = a + " x " + b + " =";
            answers[3] = a*b;

            a = randInt(1,difficulty);
            b = randInt(1,difficulty);
            c = randInt(1,difficulty);
            q4.innerHTML = a + " + " + b + " x " + c + " =";
            answers[4] = a+(b*c);

            c = randInt(1,difficulty);
            d = randInt(1,difficulty);
            q5.innerHTML =  a + " + " + b + " x " + c +  " + " + d + " =";
            answers[5] = a+(b*c)+d;

            a = randInt(1,difficulty);
            b = randInt(1,difficulty);
            q6.innerHTML = "(" + a + " - " + b + ") x " + c + " =";
            answers[6] = (a-b)*c;

            a = randInt(1,difficulty);
            b = randInt(1,difficulty);
            q7.innerHTML = a + " - " + b + " x " + "(" + c + "-" + d + ") =";
            answers[7] = a-(b*(c-d));

            c = randInt(1,difficulty);
            d = randInt(1,difficulty);
            q8.innerHTML = a + " + " + b + " x " +  c + "-" + d + " =";
            answers[8] = a+b*c-d;

            a = randInt(1,difficulty);
            e = randInt(1,difficulty);
            q9.innerHTML = a + " x " + b + " - " + "(" + c + "-" + d + ") x " + e + " =";
            answers[9] = a * b - (c - d)*e;

            c = randInt(1,difficulty);
            b = randInt(1,difficulty);
            q10.innerHTML = a + " x (" + c + "-" + d + " x " + e + ") - " + b + " =";
            answers[10] = a*(c-d*e)-b;

            //if you don't want to play this stage, here is the answers:
            console.log("answers in order:");
            console.log(answers[1]);
            console.log(answers[2]);
            console.log(answers[3]);
            console.log(answers[4]);
            console.log(answers[5]);
            console.log(answers[6]);
            console.log(answers[7]);
            console.log(answers[8]);
            console.log(answers[9]);
            console.log(answers[10]);
        }
        


        //end game function
        var endgame = function(){
            gameState = false;
            clearTimeout(timer);
        }


        //check function
        var check = function(question, x, y){
            if (x!=y){
                clearTimeout(timer);
                alert("You answered question " + question + " wrongly...\nYour answer is: " + x + "\nThe correct answer is: " + y + "\nClick 'OK' to try again...");
                button.style.visibility = "visible";
                correct = false;
            }
        }


        //win condition
        submitButton.addEventListener("click", function(ev){
            //end the game
            endgame();

            //get players answers from 1 to 10
            var a1 = document.getElementById("a1").value;
            var a2 = document.getElementById("a2").value;
            var a3 = document.getElementById("a3").value;
            var a4 = document.getElementById("a4").value;
            var a5 = document.getElementById("a5").value;
            var a6 = document.getElementById("a6").value;
            var a7 = document.getElementById("a7").value;
            var a8 = document.getElementById("a8").value;
            var a9 = document.getElementById("a9").value;
            var a10 = document.getElementById("a10").value;


            //check if answer is correct using check function
            check(1, a1, answers[1]);
            check(2, a2, answers[2]);
            check(3, a3, answers[3]);
            check(4, a4, answers[4]);
            check(5, a5, answers[5]);
            check(6, a6, answers[6]);
            check(7, a7, answers[7]);
            check(8, a8, answers[8]);
            check(9, a9, answers[9]);
            check(10, a10, answers[10]);

            //if all correct, code should run till here and output a win
            if (correct){

                //background changed to image "win"
                var background = document.getElementById("centerDiv");
                background.style.backgroundImage = "url(Images/win.jpg)";
                background.style.backgroundSize= "contain";

                setTimeout(function(){
                    //create a win box
                    alert("Congradulations! Click 'OK' to advance to the next stage!");
                     window.location.href = ("NEXT/index.html");
                },1000);
                return;
            }else{
                window.location.reload();
            }
        });

        

        //start game:
        button.addEventListener("click", function(ev){
            gameState = true;
            button.style.visibility = "hidden";
            //clear the array and answer state
            answers = [];
            correct = true;
            
            //create the questions
            generate();

            //player didn't submit in time
            timer = setTimeout(function(){ 
                        endgame();
                        alert("Oh no... You didn't submit in time! \nClick 'OK' to try again...");
                        window.location.reload();
                    }, 60000);

        });


        
});