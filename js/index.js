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
				var response = xhr.responseXML.documentElement;

				document.querySelector("#" + floor + "_floor svg").appendChild(response);
				document.querySelector("#" + floor + "_floor svg").setAttribute("viewBox", "0 0 " + document.querySelector("#" + floor + "_floor .facade").offsetWidth * 2 + " " + document.querySelector("#" + floor + "_floor .facade").offsetHeight * 2);
				document.querySelector("#" + floor + "_floor").innerHTML = document.querySelector("#" + floor + "_floor").innerHTML;
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
	})
}
