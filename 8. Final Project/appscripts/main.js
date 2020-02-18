require(
    [],
    function () {
            
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("centerDiv"));

        var pHeight = paper.height;
        var pWidth = paper.width;
        var temp;

        //mage as background
        var bgImage = paper.image("Images/dream.jpg", 0, 0, pWidth, pHeight);

        var welcome = paper.text(pWidth/2, pHeight/2 - 90,
        	"WELCOME! \nWhat you're about to experience is the daily life of a NUS student. \nCan you survive being a student for a day? \nPlay to find out..."
        	);

        welcome.attr({
            "fill": "white",
            "font-size": 11
        });

        //start button
 		var startButton = paper.circle(pWidth/2, pHeight/2, 50);
 		var startText = paper.text(pWidth/2, pHeight/2, 'BEGIN');
 		startButton.attr({
 			"stroke" : "black",
 			"fill" : "red",
            "stroke-width" : 10
 		});

        var randomInt = function(m,n){
            var range = n-m;
            var frand = Math.random()*range;
            return m+Math.floor(frand);
        };

 		var counter = 0; //count number of user clicks on target
 		//--------------------------------------------
 		//[mini game, link to game 1]

 		var start = function() {
 			console.log("game is staring");
 			startButton.hide();
 			startText.hide();
            welcome.hide();

            //sequence of events
            rectangle();
 		}

 		startButton.node.addEventListener('click', start);

 		//click the correct rectangle
        var rectangle = function(){
            var wordings = paper.text(pWidth/2,10, "I think you're dreaming...CLICK ON THE BLUE COLOURED BOX");
            wordings.attr({
                "fill": "white",
                "font-size": 11
            });

            var rect1 = paper.rect(randomInt(100,pWidth/2-100),randomInt(100,pHeight/2-100),100,100);
            rect1.attr({
                "fill": "blue",
                "stroke" : "black",
                "stroke-width" : 10,
                "stoke-linejoin": "round"
            });
            

            var tempx = randomInt(pWidth/2,pWidth-100);
            var tempy = randomInt(pHeight/2,pHeight-100);
            var rect2 = paper.rect(tempx, tempy, 100, 100);
            rect2.attr({
                "fill": "white",
                "stroke" : "black",
                "stroke-width" : 10,
                "stoke-linejoin": "round"
            });
            var words2 = paper.text(tempx+50, tempy+50, "BLUE");

            rect1.node.addEventListener("click", function(ev){
                alert("You're slowly waking up...");

                //remove current objects
                rect1.remove();
                rect2.remove();
                words2.remove();
                wordings.remove();

                //next event
                clickCAP();
            });

            rect2.node.addEventListener("click", function(ev){
                alert("Are you serious...\nClick 'OK' to try again...");
                window.location.reload();
            });
        }

        //click on your CAP
        var clickCAP = function(){

            bgImage = paper.image("Images/dream2.jpg", 0, 0, pWidth, pHeight);
            var wordings = paper.text(pWidth/2,10, "Yes you are definitely dreaming...CLICK ON YOUR CAP (literally)");
            wordings.attr({
                "fill": "white",
                "font-size": 11
            });

            var actualcap = paper.image("Images/cap.png", pWidth/2-150, pHeight/2-50, 120, 100);

            var tempx = pWidth/2 + 50;
            var tempy = pHeight/2 - 50;
            var rect2 = paper.rect(tempx, tempy, 70, 100);
            rect2.attr({
                "fill": "white",
                "stroke" : "black",
                "stroke-width" : 2,
            });
            var words2 = paper.text(tempx+30, tempy+20, "CAP: 5.0 \n  I'm GENIUS!");

            actualcap.node.addEventListener("click", function(ev){
                alert("You start opening your eyes...");

                //remove current objects
                actualcap.remove();
                rect2.remove();
                words2.remove();
                wordings.remove();

                //next event
                alarm();
            });

            rect2.node.addEventListener("click", function(ev){
                alert("HAHAHA! if you clicked this your cap is not 5.0\nClick 'OK' to try again genius!");
                window.location.reload();
            });
        }

        //alarm clock
        var alarm = function(){
            bgImage = paper.image("Images/dream3.jpg", 0, 0, pWidth, pHeight);
            var wordings = paper.text(pWidth/2,10, "YOUR ALARM IS RINGING...");
            wordings.attr({
                "font-size": 11
            });

            var shutup = paper.image("Images/shutup.gif", pWidth/2-300, pHeight/2-100, 200, 200);

            var tempx = pWidth/2;
            var tempy = pHeight/2 + 40;
            var circle1 = paper.circle(tempx, tempy, 40);
            circle1.attr({
                "fill": "green",
                "stroke" : "black",
                "stroke-width" : 2,
            });
            var words1 = paper.text(tempx, tempy, "Click to off");

            circle1.node.addEventListener("click", function(ev){

                //slide away
                words1.animate({
                    "x": pWidth-50
                },1000,">");

                circle1.animate({
                    "cx": pWidth-50
                },1000,">");

                setTimeout(function(){
                    alert("You're finally awake! It's already 8am.\nYou never wake so early but you have early classes today. \nGet out of bed, time to start your day!");

                    //change to buffer story
                    window.location.href = "Storymode/index.html";
                },1000);
                
            });

            words1.node.addEventListener("click", function(ev){

                //slide away
                words1.animate({
                    "x": pWidth-50
                },1000,">");

                circle1.animate({
                    "cx": pWidth-50
                },1000,">");

                setTimeout(function(){
                    alert("You're finally awake! It's already 8am.\nYou never wake so early but you have early classes today. \nGet out of bed, time to start your day!");

                    //change to buffer story
                    window.location.href = "Storymode/index.html";
                },1000);
                
            });

            shutup.node.addEventListener("click", function(ev){
                alert("You can't afford to not wake up...\nClick 'OK' to try again...");
                window.location.reload();
            });
        }
 		
    }
);