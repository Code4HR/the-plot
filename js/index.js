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
	    $(this).find('h1').css({
	    	"margin-top": ($(".carousel-item-contents").width() / 2 - 20)+ "px"
	    })

	    $(this).find('h2').css({
	    	"margin-top": ($(".carousel-item-contents").width() / 2 - 60)+ "px"
	    })
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

	$("#about").on("click", function(){
		$("#about_box").show();
	});

	$(".close_btn").on("click", function(){
		$("#about_box").hide();
	});

	
})
