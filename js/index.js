console.log("LOADED");
$(function(){
	// Stores items in an array
	var items = [];
	$("#carousel-item-container .carousel-item").each(function() {
	    items.push(this);
	});

	var activeItem = 1;

	$carousel = $("#carousel-item-container");
	$carousel_item_width = parseInt($(".carousel-item").css("padding-top"));

	$("#carousel").css({
		"left": (($(window).width() / 2) - ($carousel_item_width/ 2) )+ "px"
	});

	$(".right").on("click", function(){
		activeItem += 1;
		$("#carousel").css({
			"left": (($(window).width() / 2) - ( ($carousel_item_width * activeItem) + ($carousel_item_width/ 2)) )+ "px"
		});
	})

	$(".left").on("click", function(){
		activeItem -= 1;
		$("#carousel").css({
			"left": (($(window).width() / 2) - ( ($carousel_item_width * activeItem) + ($carousel_item_width/ 2)) )+ "px"
		});
	})
})
