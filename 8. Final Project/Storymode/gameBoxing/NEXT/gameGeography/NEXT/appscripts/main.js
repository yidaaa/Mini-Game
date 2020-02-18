//
require(
    [],
    function () {
            
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("centerDiv"));

        var pHeight = paper.height;
        var pWidth = paper.width;

        //image as background
        var bgImage = paper.image("Images/background.jpg", 0, 0, pWidth, pHeight);

        var wordings = paper.text(pWidth/2,10, "Click on the items you need to take to your shower");
        wordings.attr({
            "font-size": 12,
            "fill" : "white"
        });

        var soap = paper.image("Images/soap.png", pWidth*2/5, pHeight*1/3, 100, 100);
        var shampoo = paper.image("Images/shampoo.png", pWidth*2/5, pHeight*2/3, 100, 100);
        var phone = paper.image("Images/phone.png", pWidth*3/5, pHeight*2/3, 100, 100);
        var pencilcase = paper.image("Images/pencilcase.png", pWidth*4/5, pHeight*2/3, 100, 100);
        var beer = paper.image("Images/beer.png", pWidth*3/5, pHeight*1/3, 100, 100);
        var towel = paper.image("Images/towel.png", pWidth*4/5, pHeight*1/3, 100, 100);

        //to trigger next event
        grabbedtowel = false;
        grabbedshampoo = false;

        beer.node.addEventListener("click", function(ev){
            wordings.attr({
                "text" : "Don't know why you'd have a beer in the shower right now, but nope."
            });
        });

        pencilcase.node.addEventListener("click", function(ev){
            wordings.attr({
                "text" : "What??"
            });
        });

        phone.node.addEventListener("click", function(ev){
            wordings.attr({
                "text" : "No you do not need your phone, you only have 5 minutes for a quick shower."
            });
        });

        soap.node.addEventListener("click", function(ev){
            wordings.attr({
                "text" : "Unfortunaley you don't have time for a scrub."
            });
        });

        towel.node.addEventListener("click", function(ev){
            wordings.attr({
                "text" : "You grabbed the towel."
            });
            towel.animate({
                "y": pHeight
            },1000);
            grabbedtowel = true;
            // go to next game
            if (grabbedshampoo && grabbedtowel){
                setTimeout(function(){window.location.href = ("gameMath/index.html")},1000);
            }
        });

        shampoo.node.addEventListener("click", function(ev){
            wordings.attr({
                "text" : "You grabbed the shampoo."
            });
            shampoo.animate({
                "y": pHeight
            },1000);
            grabbedshampoo = true;
            // go to next game
            if (grabbedshampoo && grabbedtowel){
                setTimeout(function(){window.location.href = ("gameMath/index.html")},1000);
            }
        });

    }
);