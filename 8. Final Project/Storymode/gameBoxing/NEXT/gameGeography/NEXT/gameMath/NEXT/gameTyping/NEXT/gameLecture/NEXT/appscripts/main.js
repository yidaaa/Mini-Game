require(
    [],
    function () {

        var paper = new Raphael(document.getElementById("centerDiv"));

        var pHeight = paper.height;
        var pWidth = paper.width;

        //image as background
        var bgImage = paper.image("Images/background.jpg", 0, 0, pWidth, pHeight);

        var wordings = paper.text(pWidth/2, 20, "Back to Frontier canteen!\nWhats for dinner?");
        wordings.attr({
            "fill": "white",
            "font-size": 11
        });

        var korean = paper.image("Images/korean.png", pWidth*1/7, pHeight*1/3, 100, 100);
        var japanese = paper.image("Images/japanese.png", pWidth*2/7, pHeight*2/3, 100, 100);
        var noodles = paper.image("Images/noodles.png", pWidth*3/7, pHeight*1/3, 100, 100);
        var chickenrice = paper.image("Images/chickenrice.png", pWidth*4/7, pHeight*2/3, 100, 100);
        var ayam = paper.image("Images/ayam.png", pWidth*5/7, pHeight*1/3, 100, 100);

        korean.node.addEventListener('click', function(){
            wordings.attr({
                "text" : "Nope. Closed.",
                "font-size" : 15
            })

            korean.hide();
        });

        japanese.node.addEventListener('click', function(){
            wordings.attr({
                "text" : "It's closed.",
                "font-size" : 15
            })

            japanese.hide();
        });

        noodles.node.addEventListener('click', function(){
            wordings.attr({
                "text" : "Closed.",
                "font-size" : 15
            })

            noodles.hide();
        });

        ayam.node.addEventListener('click', function(){
            wordings.attr({
                "text" : "Yeah, one of the stalls still opened till this time.",
                "font-size" : 15
            })

            korean.hide();
            chickenrice.hide();
            japanese.hide();
            noodles.hide();

            //make food centralised and bigger
            ayam.animate({
                "x": pWidth*1/3,
                "y": pHeight*1/3,
                "width" : 300,
                "height": 300
            },1500);

            setTimeout(function(){
                alert("You're lucky you didn't wake at 7:30pm, or else every stall will be closed.\nAfter dinner, you walk to MPSH6 for your CCA.")
                window.location.href = ("gameDodgeball/index.html");
            }, 1500)

        });

        chickenrice.node.addEventListener('click', function(){
            wordings.attr({
                "text" : "It was closing when you arrived. Now it's closed.",
                "font-size" : 15
            })

            chickenrice.hide();
        });
    }
);
            