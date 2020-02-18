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
        //---------------------------------------------------------------------

        // assign6.1 Just create a nice black background
        var bgRect = paper.rect(0,0,pWidth, pHeight);
        bgRect.attr({"fill": "black"});

        //variable disk
        var disk;
        //array to store 50 disks
        var disks = [];
        //total number of disks
        var numDisks = 50;
        // index of individual disks
        var counter = 0;

        //constructs a random value given a range
        var randInt = function( m, n ) {
            var range = n-m;
            var frand = Math.random()*range;
            return m+Math.floor(frand);
        }
        
        //while loop to store 50 disks
        while (counter<numDisks){
            //creating a disk per loop
            var x = randInt(0,pWidth);
            var y = randInt(0,pHeight);
            disks[counter] =  paper.circle(x, y, 20);

            //adding properties to disk
            disks[counter].xpos = x;
            disks[counter].ypos = y;
            disks[counter].xrate = randInt(-10,10);
            disks[counter].yrate = randInt(-10,10);
            disks[counter].hslString = "hsl(" + Math.random() + ", " + Math.random() + ", " + 0.5 + ")";

            //setting the color of the disk
            disks[counter].attr({
                "fill" : disks[counter].hslString
            });
            //increase counter
            counter++;
        }

        //creating a transparent rectangle 
        var rectTransp = paper.rect(0,0,pWidth,pHeight);
        rectTransp.attr({
            "fill": "white",
            "stroke-width" : 0,
            //make transparent
            "fill-opacity" : 0
        });

        //mouse state
        var mouseState = { 
            "pushed" : false,
            "x": 0,
            "y": 0
        }

        rectTransp.node.addEventListener("mousedown", function(ev){
            //update mousestate coordinates
            mouseState.pushed = true;
            mouseState.x = ev.offsetX;
            mouseState.y = ev.offsetY;
        });

        rectTransp.node.addEventListener("mousemove", function(ev){
            if (mouseState.pushed == true){
                //update mousestate coordinates
                mouseState.x = ev.offsetX;
                mouseState.y = ev.offsetY;
            }
        });

        rectTransp.node.addEventListener("mouseup", function(ev){
            mouseState.pushed = false;
        });

        //calculate function
        var calculate = function(x1, y1, x2, y2){
            return Math.hypot(x2-x1, y2-y1);
        }

        //reusable variable for checking distance
        var distance;

        // draw function
        var draw = function(){
            
            counter = 0;

            while(counter<numDisks){
                //assign disk to be the one 
                disk = disks[counter];

                //Update the position where we want our disk to be
                disk.xpos += disk.xrate;
                disk.ypos += disk.yrate;

                //move the disk using our 'state' variables
                disk.attr({'cx': disk.xpos, 'cy': disk.ypos});

                //keep the object on the paper
                if (disk.xpos > pWidth) {disk.xrate = -disk.xrate;}
                if (disk.ypos > pHeight) {disk.yrate = -disk.yrate};
                if (disk.xpos < 0) {disk.xrate = -disk.xrate;}
                if (disk.ypos < 0) (disk.yrate = -disk.yrate);

                //if mouse is pushed
                if (mouseState.pushed == true){
                    //check if object is within 100pixels of mouseclick
                    distance = calculate(mouseState.x, mouseState.y, disk.xpos, disk.ypos);
                    if (distance <= 100){
                        disk.attr({ "fill" : "white" });
                    } else {
                        disk.attr({ "fill" : disks[counter].hslString });
                    }
                }

                if (mouseState.pushed == false){
                    disk.attr({ "fill" : disks[counter].hslString });
                }

                //increase counter and move to next disk
                counter++;
            }
        }



        // call draw() periodically
        // We do this last thing as the module loads
        setInterval(draw,20);
});