require(
	[],
	function () {
            
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));
        // Find get paper dimensions
        var dimX = paper.width;
        var dimY = paper.height;


       // rectangle for background
        var rect1 = paper.rect(100, 100, 400, 200);
        rect1.attr({"fill": "#FFE4C4"});

        //midpoint
        var xm = 300;
        var ym = 250;
    
        //Draw the mouth as an SVG path: M startpoints Q midpoints endpoints
        var mouth = paper.path("M 150 250 " + "Q " + xm + " " + ym + " 450 250" );

        //Draw eyes
        var leftEye = paper.ellipse(180 ,170 ,15, 10);
        leftEye.attr({"fill": "black"});
        var rightEye = paper.ellipse(420 ,170 ,15, 10);
        rightEye.attr({"fill": "black"});

        //initial button state 
        var buttonState = "none";

        //getting the button from html
        var button = document.getElementById("buttonID");

        //drawMouth function
        var drawMouth = function(midpointX, midpointY){
        	mouth.animate({
                "path" : "M 150 250 " + "Q " + midpointX + " " + midpointY + " 450 250"

            }, 400, "linear");
        };
        
        //adding event listener to button
        button.addEventListener("click" , function(ev){
            if (buttonState == "smile"){
                buttonState = "frown";
                //changes face color
				rect1.attr({"fill": "#1568AE"});
				//prints out on console
                console.log("I am frowning!");
                //changes mouth
                drawMouth(xm,ym-80);
                //changes eyes
                leftEye.animate({"ry": 1}, 400, "linear");
            	rightEye.animate({"ry": 1}, 400, "linear");

            } else {
                buttonState = "smile";
                //changes face color
                rect1.attr({"fill": "#E1590C"});
                //prints out on console
                console.log("I am smiling!");
                //changes mouth
                drawMouth(xm,ym+80);
                //changes eyes
                leftEye.animate({"ry": 10}, 400, "linear");
            	rightEye.animate({"ry": 10}, 400, "linear");

            }
        });

        //beezier dot
		var pointer = paper.circle(xm,ym,3);
		pointer.attr({"fill":"red"});

        //dragging the dot?
        var draggingDot = false;

        //events to mouse dragging dot

        //mouse down, pointer goes to mousedown area, mouth goes towards pointer
        pointer.node.addEventListener("mousedown", function(ev){
        	draggingDot = true;
        	drawMouth(ev.offsetX,ev.offsetY);
        	pointer.animate({
        		"cx": ev.offsetX,
        		"cy": ev.offsetY
        	}, 0, "linear");
        });

        //mouse moving, pointer follows, mouth moves towards pointer
        rect1.node.addEventListener("mousemove", function(ev){
        	if (draggingDot === true){
        		drawMouth(ev.offsetX,ev.offsetY);
        		pointer.animate({
	        		"cx": ev.offsetX,
	        		"cy": ev.offsetY
        		}, 0, "linear");
        	}
        	
        });

        //mouse up, pointer stops moving, mouth stops moving
        pointer.node.addEventListener("mouseup", function(ev){
        	draggingDot = false;
        });



});