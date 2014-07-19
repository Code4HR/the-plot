console.log("LOADED");
$(function(){

	function moveCarousel(index){
		$(".carousel-item").removeClass("active");
		$(items[activeItem]).addClass("active");

		$("#carousel").css({
			"left": (($(window).width() / 2) - ( ($carousel_item_width * index) + ($carousel_item_width/ 2)) )+ "px"
		});
	}

	// Stores items in an array
	var items = [];
	$("#carousel-item-container .carousel-item").each(function() {
	    items.push(this);
	});

	var activeItem = 0;

	$carousel = $("#carousel-item-container");
	$carousel_item_width = parseInt($(".carousel-item").css("padding-top"));

	moveCarousel(activeItem);

	$(".right").on("click", function(){
		if (activeItem < 3){
			activeItem += 1;
			moveCarousel(activeItem);
		}
	})

	$(".left").on("click", function(){
		if (activeItem > 0){
			activeItem -= 1;
			moveCarousel(activeItem);
		}
	})

	
})
