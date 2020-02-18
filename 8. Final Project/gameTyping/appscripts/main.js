require(
    ["../jslibs/raphael.lonce"],  // include a custom-built library

    function () {

        //checking the code works
        console.log("hello");

        //initial game state
        var gameState = false;
        var difficulty = 1;
        var repeat;
        var timer;
        var button = document.getElementById("startButton");
        var submitButton = document.getElementById("submitButton");
        submitButton.style.visibility = "hidden";

        //difficulty change
        var difficultySlider = document.getElementById("difficulty");
        difficultySlider.addEventListener("input", function(ev){
            difficulty = difficultySlider.value;
        });

        var randDifficulty = 1;
        var randInt = function( m, n ) {
            var range = n-m;
            var frand = Math.random()*range;
            return m+Math.floor(frand);
        };

        //array of many different texts
        var texts = [[],[],[],[],[],[]];
        texts[1][1] = "It is capable of inducing protein ubiquitination.";
        texts[1][2] = "It is inversely correlated with p27 expression.";
        texts[1][3] = "It is localized primarily in the nucleus in normal cells.";
        texts[1][4] = "The underlying mechanism has not been clear until recently.";
        texts[1][5] = "Recent research has yielded several exciting and novel discoveries.";

        texts[2][1] = "Skp2 is a critical component of Skp2 SCF ubiquitin ligase";
        texts[2][2] = "There is subsequent proteasome-dependent degradation.";
        texts[2][3] = "Skp2 protein stability is also regulated by the cell cycle.";
        texts[2][4] = "The integrity of Skp2 SCF complex formation is critical.";
        texts[2][5] = "biochemical fractionation and immunofluorescence experiments are used.";

        texts[3][1] = "We observe that overexpression of Skp2 is associated with a variety of human cancers.";
        texts[3][2] = "Results indicates that Skp2 may contribute to the development of human cancers.";
        texts[3][3] = "One of the key players regulating cell cycle progression is the F-box protein Skp2.";
        texts[3][4] = "The regulation of cell cycle entry is critical for cell proliferation and tumorigenesis.";
        texts[3][5] = "It remains unclear what kinases are involved and what role Skp2 phosphorylation plays.";

        texts[4][1] = "Akt signaling plays a crucial role in a myriad of important biological functions, such as cell proliferation.";
        texts[4][2] = "Other crucial roles of Akt signalling includes survival, migration, metabolism, and tumorigenesis.";
        texts[4][3] = "These Akt functions are achieved primarily through the phosphorylation of multiple Akt downstream effectors by Akt.";
        texts[4][4] = "Post-translational modifications include phosphorylation, ubiquitination, sumoylation, and methylation.";
        texts[4][5] = "The notion is supported by various genetic mouse models that demonstrate an oncogenic activity of Skp2.";

        texts[5][1] = "Skp2 contains a putative nuclear localization signal (NLS) within the region where Skp2 phosphorylation by Akt takes place.";
        texts[5][2] = "Despite the important roles of Skp2 in cell proliferation, survival, and cancer development, specific Skp2 inhibitors have not yet been identified.";
        texts[5][3] = "It has been known for a long time that Skp2 undergoes phosphorylation during cell cycle progression and growth factor stimulation.";
        texts[5][4] = "Recent studies reveal that Skp2 phosphorylation is triggered by Cdk2 and Akt kinases, which appear to play an important role in Skp2 stability, localization, and activity.";
        texts[5][5] = "There are 68 F-box proteins identified in the human genome, which are categorized into three classes based on the types of the substrate-interaction domains within them.";



        //getting thoughtbox to replace with question
        var thoughtbox = document.getElementsByClassName("thought")[0];

        //getting textbox to replace with their words
        var clicked = true;
        var textbox = document.getElementById("textbox");
        textbox.addEventListener("click",function(ev){
            if (!clicked){
                console.log("clicked");
                textbox.value = ""; 
                clicked = true;
            }
        });


        //end game function
        var endgame = function(){
            gameState = false;
            //reset all variables
            submitButton.style.visibility = "hidden";
            startButton.style.visibility = "visible";

        }

        //win game function
        var wingame = function(){
            //link to next page after 1 second
            clearTimeout(timer);
            //create a win box
            alert("Congradulations! Click 'OK' to return to the homepage.");
            window.location.href = ("http://nm2207.org/2019/e0175270/FinalProject/index.html");
        }

        //win condition
        submitButton.addEventListener("click", function(ev){
            //get text value
            console.log(texts[difficulty][randDifficulty]);
            console.log(textbox.value);
            if (textbox.value == texts[difficulty][randDifficulty]){
                wingame();
            }else{
                alert("You typed something wrongly! Time is still running!");
            }
        });



        //start game:
        button.addEventListener("click", function(ev){
            gameState = true;
            //only now, what the person types matters, so no cheating
            clicked = false;
            button.style.visibility = "hidden";
            submitButton.style.visibility = "visible";

            //choose random text within difficulty
            randDifficulty = randInt(1,5);
            thoughtbox.innerHTML = texts[difficulty][randDifficulty];

            //set timer function to check if player exceeded time limit
            timer = setTimeout(function(){ 
                        endgame();
                        alert("You failed to hand up your full assignment in time, you lose! Click 'ok' to try again");
                        window.location.reload();
                    }, 20000);

        });


        
});