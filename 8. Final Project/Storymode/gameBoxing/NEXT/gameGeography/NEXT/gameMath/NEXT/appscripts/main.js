require(
    [],
    function () {

        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("centerDiv"));

        var pHeight = paper.height;
        var pWidth = paper.width;

        //mage as background
        var bgImage = paper.image("Images/background.jpg", 0, 0, pWidth, pHeight);

        var correctsquare = paper.rect(0,0,pWidth/2,pHeight);
        correctsquare.attr({
            "fill" : "black",
            "fill-opacity": 0,
            "stroke": 0
        })

        var wrongsquare = paper.rect(pWidth/2,0,pWidth,pHeight);
        wrongsquare.attr({
            "fill" : "black",
            "fill-opacity": 0,
            "stroke": 0
        })

        var wordings = paper.text(pWidth/2, 10,
        	"Quickly search your bag for the biology assignment!"
        );

        wordings.attr({
            "fill": "black",
            "font-size": 11
        });

 		var counter = 0; //count number of user clicks 

        wrongsquare.node.addEventListener("click", function(){
            wordings.attr({
                "text" : "That's not your bag..."
            });
            counter++;
        });

        var string1 = "Nope... not here...";
        var string2 = "Nope.. not here either";
        var string3 = "Nope...";

        var boolean = 0;

        correctsquare.node.addEventListener("click", function(){
            //alternating statements when the player clicks
            if (boolean==0){
                wordings.attr({
                    "text" : string1
                });
                boolean = 1;
            }else if (boolean==1){
                wordings.attr({
                    "text" : string2
                });
                boolean = 2;
            }else if(boolean==2){
                wordings.attr({
                    "text" : string3
                });
                boolean = 0;
            }
            counter++;

            if (counter>=8){
                wordings.attr({
                    "text" : "Found it! How did it get here? Wait... something is wrong..."
                });
                //href to next page
                setTimeout(function(){window.location.href = ("gameTyping/index.html")},2000);
            }
        });
 		
    }
);