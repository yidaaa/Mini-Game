require(
	[],

	function () {
        console.log("yo");
        /* assign3: center header text using javascript */
        document.getElementById("headerID").style.textAlign = "center";

        /* assign3: font family for article in JavaScript */
        document.getElementById("articleID").style.fontFamily = "Comic Sans MS, cursive, sans-serif"; //"Impact,Charcoal,sans-serif"; 

        //--------------------------------------------------------------

        //creating hsl function with 3 arguments
        var hslString = function(h,s,l){
        	returnvalue = "hsl("+ h + ", " + s + "%, " + l +"%)";
        	// returns a string "hsl(h,s%,l%)"
        	return returnvalue;
        }

        //article background color
        var article = document.getElementById("articleID");
        //initial hsl settings is red
        var hue = 0;
        var saturation = 100;
        var lightness = 50;


        //hue slider to adjust color
        var HueSlider = document.getElementById("HueSlider");
        // adding eventlistener to change variable and reset article's background
        HueSlider.addEventListener("input", function(ev){
    		hue = HueSlider.value;
    		article.style.backgroundColor = hslString(hue,saturation,lightness);
    	});

        //saturation slider to adujust saturation
        var SaturationSlider = document.getElementById("SaturationSlider");
        // adding eventlistener to change variable and reset article's background
        SaturationSlider.addEventListener("input", function(ev){
    		saturation = SaturationSlider.value;
    		article.style.backgroundColor = hslString(hue,saturation,lightness);
    	});

        //lightness slider to adjust brightness
        var LightnessSlider = document.getElementById("LightnessSlider");
        // adding eventlistener to change variable and reset article's background
        LightnessSlider.addEventListener("input", function(ev){
    		lightness = LightnessSlider.value;
    		article.style.backgroundColor = hslString(hue,saturation,lightness);
    	});


        //opacity slider to adjust opacity
        var OpacitySlider = document.getElementById("OpacitySlider");
        // adding eventlistener to change variable and reset article's background
        OpacitySlider.addEventListener("input", function(ev){
    		article.style.opacity = OpacitySlider.value;
    	});


        //setting full opacity when mouse is clicked
    	OpacitySlider.addEventListener("mousedown", function(ev){
    		article.style.opacity = 1;
    	});

    	//setting opacity to slider when mouse is released
    	OpacitySlider.addEventListener("mouseup", function(ev){
    		article.style.opacity = OpacitySlider.value;
    	});
 		
        }
);