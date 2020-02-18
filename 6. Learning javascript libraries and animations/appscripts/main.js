require(
   // Use this library to "fix" some annoying things about Raphel paper and graphical elements:
    //     a) paper.put(relement) - to put an Element created by paper back on a paper after it has been removed
    //     b) call element.addEventListener(...) instead of element.node.addEventListner(...)
    ["../jslibs/raphael.lonce"],  // include a custom-built library

    function () {

        console.log("Yo, I am alive!");

        // Grab the div where we will put our Raphael paper
        var centerDiv = document.getElementById("centerDiv");

        // Create the Raphael paper that we will use for drawing and creating graphical objects
        var paper = new Raphael(centerDiv);

        // put the width and heigth of the canvas into variables for our own convenience
        var pWidth = paper.width;
        var pHeight = paper.height;
        console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);

        //black rectangle
        var rectangle = paper.rect(0,0,pWidth,pHeight);
        rectangle.attr({
            "fill": "black"
        });

        //create circle
        var disk = paper.circle(pWidth/2, pHeight/2, 20);
        disk.attr({
            "fill": "green"
        });

        //creating variables xpos and ypos
        //creating variables xrate and yrate
        disk.xpos = pWidth/2;
        disk.ypos = pHeight/2;
        disk.xrate = 10;
        disk.yrate = 10;

        //draw function
        var counter = 0;
        var draw = function(){
            //new circle
            var nd = paper.circle(pWidth/2, pHeight/2, 20);
            nd.attr({
                "fill": "white"
            });
            //same attributes
            nd.xpos = pWidth/2;
            nd.ypos = pHeight/2;
            nd.xrate = 10;
            nd.yrate = 10;

            console.log("Draw function has been called " + counter + " number of times.");
            counter++;

            //updating xpos and ypos
            disk.xpos += disk.xrate;
            disk.ypos += disk.yrate;
            console.log("xpos: " + disk.xpos);
            console.log("ypos: " + disk.ypos);

            //update current circle position
            
            //animating the movement
            nd.attr({
                "cx": disk.xpos,
                "cy": disk.ypos,
            });

            nd.animate({
                "fill" : "black"
            },1000, "linear", nd.remove);

            //hitting the walls
            if( disk.xpos >= pWidth-25 ){ disk.xrate = -10; }
            if( disk.xpos <= 25 ){ disk.xrate = 10; }
            if( disk.ypos >= pHeight-25 ){ disk.yrate = -10; }
            if( disk.ypos <= 25 ){ disk.yrate = 10; }

        };
        
        setInterval(draw, 100);

});