require(
    [],
    function () {
            
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("centerDiv"));

        var pHeight = paper.height;
        var pWidth = paper.width;
        var temp;

        //image as background
        var bgImage = paper.image("Images/background.jpg", 0, 0, pWidth, pHeight);


        var washup = paper.image("Images/washup.png", pWidth*1/5, pHeight/2, 100, 100);
        var laptop = paper.image("Images/laptop.png", pWidth*2/5, pHeight/2, 100, 100);
        var door = paper.image("Images/door.png", pWidth*3/5, pHeight/2, 50, 100);

        var wordings = paper.text(pWidth/2,10, "Go and wash up!");
        wordings.attr({
            "font-size": 12,
            "fill" : "white"
        });

        var washupBoolean = false;
        var laptopBoolean = false;
        
        washup.node.addEventListener("click", function(ev){
            washupBoolean = true;
            wordings.attr({
                "text" : "Pack your laptop!"
            });
            washup.hide();
        });

        laptop.node.addEventListener("click", function(ev){
            if (washupBoolean==true){
                laptopBoolean=true;
                wordings.attr({
                    "text" : "Exit the room, you're ready to go!"
                });
                laptop.hide();
            }else{
                wordings.attr({
                    "text" : "You need to wash-up first!"
                });
            }
            
        });

        door.node.addEventListener("click", function(ev){
            if (washupBoolean==true && laptopBoolean==true){
                window.location.href = "gameBoxing/index.html";
            }else{
                wordings.attr({
                    "text" : "You need to wash-up and pack your laptop first!"
                });
            }
        });
    }
);