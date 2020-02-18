require(
    [],
    function () {
            
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("centerDiv"));

        var pHeight = paper.height;
        var pWidth = paper.width;

        //image as background
        
        var newbgImage = paper.image("Images/emptyclass.jpg", 0, 0, pWidth, pHeight);
        var bgImage = paper.image("Images/background.jpg", 0, 0, pWidth, pHeight);

        var wordings = paper.text(pWidth/2,10, "You had a nice and rejuvenating shower, headed to LT now!");
        wordings.attr({
            "font-size": 12,
            "fill" : "black"
        });
        
        bgImage.node.addEventListener("click", function(ev){
            wordings.attr({
                "text" : "Wait...why is the LT empty? RIGHT... you have a geography trip today..."
            });
            bgImage.remove();
            
        });

        newbgImage.node.addEventListener("click", function(ev){
           window.location.href = ("gameGeography/index.html"); 
        });
    }
);