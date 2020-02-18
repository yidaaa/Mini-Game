require(
    [],
    function () {

        var paper = new Raphael(document.getElementById("centerDiv"));

        var pHeight = paper.height;
        var pWidth = paper.width;

        //start button
 		var button = paper.circle(pWidth*1/3, pHeight*1/3, 50);
 		var text = paper.text(pWidth*1/3, pHeight*1/3, 'Back to: \nHOMEPAGE');
 		button.attr({
 			"stroke" : "black",
 			"fill" : "red",
            "stroke-width" : 5
 		});

 		button.node.addEventListener('click', function(){
            console.log("clicked");
            window.location.href = "http://nm2207.org/2019/e0175270/FinalProject/index.html";
        });

        text.node.addEventListener('click', function(){
            console.log("clicked");
            window.location.href = "http://nm2207.org/2019/e0175270/FinalProject/index.html";
        });
    }
);