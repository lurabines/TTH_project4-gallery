$(document).ready(function(){

	//Search and Filtering

	$(".search-input").keyup(function(){
		
		// Retrieve the input field text
		var inputValue = $(this).val();
		
		// Loop through the comment list
		$("#gallery li img").each(function(){
		
			// If the list item does not contain the title attr, fade it out
			if ($(this).attr("alt").search(new RegExp(inputValue, "i")) < 0) {
			$(this).fadeOut();
			
			// Show the list item if the phrase matches
			} else {
			$(this).fadeIn();
			}
		});
	});



//Lightbox
var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");
var $loader = $('<div class="lb-loader" style="display: none;"><a class="lb-cancel"></a></div>');
var $prevIMG = $('<button id="prev">Prev</button>');
var $nextIMG = $('<button id="next">Next</button>');
var $closeLightbox = $("<div id='closeLightbox'></div><div style='clear:both'></div>");

$overlay.append($image);
$image.before($closeLightbox);
$overlay.append($caption);
$overlay.append($prevIMG);
$overlay.append($nextIMG);



$("body").append($overlay);


//Capture the click event on a link to an image
$("#gallery a").click(function(event){
  event.preventDefault();
  
  getCurrentImage(this);
	
	$overlay.show();

  getCurrentImage(this);

	
});

$prevIMG.click(function(){
  getPrevImage();
});

$nextIMG.click(function(){
  getNextImage();
  
});




function getCurrentImage (currentImage) {  
    thisImage = currentImage;
    var imageLocation = $(currentImage).attr("href");
    
    //Update overlay with the image linked in the link
    $image.fadeOut(function() {
	    $(this).load(function() { $(this).fadeIn(); });
	    $image.attr("src", imageLocation);
    });
    
    
    //Get child's alt attribute and set caption
    var captionText = $(currentImage).children("img").attr("alt");
    $caption.text(captionText);
    
}

function getPrevImage() {
    imageParent = $(thisImage).parent().prev();
    if(imageParent.length != 0){
      thisImage = $(imageParent).children("a");
      
    // imageLocation = $(thisImage).attr("href");
    // $image.attr("src", imageLocation);
    }
    getCurrentImage(thisImage);
    
}

function getNextImage() {
    imageParent = $(thisImage).parent().next();
    if(imageParent.length != 0){
    thisImage = $(imageParent).children("a");
      
      // imageLocation = $(thisImage).attr("href");
      // $image.attr("src", imageLocation);
    }
    getCurrentImage(thisImage);
}





//When overlay is clicked
$closeLightbox.click(function(){
 $overlay.hide();
});





















});