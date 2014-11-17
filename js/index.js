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
				document.querySelector("#" + floor + "_floor svg").appendChild(xhr.responseXML.documentElement);
				document.querySelector("#" + floor + "_floor svg").setAttribute("viewBox", "0 0 " + document.querySelector("#" + floor + "_floor .facade").offsetHeight + " " + document.querySelector("#" + floor + "_floor .facade").offsetWidth);
				document.querySelector("#" + floor + "_floor").innerHTML = document.querySelector("#" + floor + "_floor").innerHTML;
			}
		};
		xhr.send("");
	});
}