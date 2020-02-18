require(
    [],
    function () {

        var paper = new Raphael(document.getElementById("centerDiv"));

        var pHeight = paper.height;
        var pWidth = paper.width;

        //image as background
        var bgImage = paper.image("Images/background.jpg", 0, 0, pWidth, pHeight);

        var wordings = paper.text(pWidth/2, 20, "Welcome to Frontier! \nWhat shall you eat today?");
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
                "text" : "Not bad, not cheap. Mmm.",
                "font-size" : 15
            })

            ayam.hide();
            chickenrice.hide();
            japanese.hide();
            noodles.hide();

            //make food centralised and bigger
            korean.animate({
                "x": pWidth*1/3,
                "y": pHeight*1/3,
                "width" : 300,
                "height": 300
            },1500);

            setTimeout(function(){
                alert("You feel full, anything tastes good when you're hungry.")
                window.location.href = ("gameLecture/index.html")
            }, 1500)

        });

        japanese.node.addEventListener('click', function(){
            wordings.attr({
                "text" : "This stall never tasted like japanese food, and it's not exactly cheap either. Fills your tummy either way.",
                "font-size" : 15
            })

            korean.hide();
            ayam.hide();
            chickenrice.hide();
            noodles.hide();

            //make food centralised and bigger
            japanese.animate({
                "x": pWidth*1/3,
                "y": pHeight*1/3,
                "width" : 300,
                "height": 300
            },1500);

            setTimeout(function(){
                alert("You feel full, anything tastes good when you're hungry.")
                window.location.href = ("gameLecture/index.html")
            }, 1500)

        });

        noodles.node.addEventListener('click', function(){
            wordings.attr({
                "text" : "It tastes okay..",
                "font-size" : 15
            })

            korean.hide();
            ayam.hide();
            chickenrice.hide();
            japanese.hide();

            //make food centralised and bigger
            noodles.animate({
                "x": pWidth*1/3,
                "y": pHeight*1/3,
                "width" : 300,
                "height": 300
            },1500);

            setTimeout(function(){
                alert("You feel full, anything tastes good when you're hungry.")
                window.location.href = ("gameLecture/index.html")
            }, 1500)

        });

        ayam.node.addEventListener('click', function(){
            wordings.attr({
                "text" : "Not exaclty healthy, but yum yum!",
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
                alert("You feel full, anything tastes good when you're hungry.")
                window.location.href = ("gameLecture/index.html")
            }, 1500)

        });

        chickenrice.node.addEventListener('click', function(){
            wordings.attr({
                "text" : "Shouldn't eat this daily, still yummy though!",
                "font-size" : 15
            })

            korean.hide();
            ayam.hide();
            japanese.hide();
            noodles.hide();

            //make food centralised and bigger
            chickenrice.animate({
                "x": pWidth*1/3,
                "y": pHeight*1/3,
                "width" : 300,
                "height": 300
            },1500);

            setTimeout(function(){
                alert("You feel full, anything tastes good when you're hungry.")
                window.location.href = ("gameLecture/index.html")
            }, 1500)

        });

 		
    }
);