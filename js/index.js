function floorAnimate() {
  	document.querySelector("body").className = "rotated";
}

function floorUnanimate() {
  document.querySelector("body").className = "";
}

window.onload = function() {
	['top', 'second', 'third', 'fourth'].forEach(function(floor) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "img/" + floor + "_floor.svg");
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				var response = xhr.responseXML.documentElement,
					el = document.querySelector("#" + floor + "_floor");

				el.querySelector("svg").appendChild(response);
				el.querySelector("svg").setAttribute("viewBox", "0 0 " + el.querySelector(".facade").offsetWidth * 2 + " " + el.querySelector(".facade").offsetHeight * 2);
				el.innerHTML = el.innerHTML;
			}
		};
		xhr.send("");
	});

	document.querySelector("body").addEventListener("mouseover", function(e) {
		if(e.target.className.split(" ").indexOf("ground") > -1) {
			document.getElementById(e.target.getAttribute("data-number")).className += " hover";
		}
	});

	document.querySelector("body").addEventListener("mouseout", function(e) {
		if(e.target.className.split(" ").indexOf("ground") > -1) {
			var el = document.getElementById(e.target.getAttribute("data-number"));
			el.className = el.className.replace( new RegExp('(?:^|\\s)hover(?!\\S)'), '' );
		}
	});


}
