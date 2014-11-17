function floorAnimate() {
  document.querySelector("body").className = "rotated";
}

function floorUnanimate() {
  document.querySelector("body").className = "";
}

var test = true;

window.onload = function() {
	['top', 'second', 'third', 'fourth'].forEach(function(floor) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "img/" + floor + "_floor.svg");
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				var response = xhr.responseXML.documentElement;
				if(test && floor == "top") {
					document.querySelector("html").className = "testing";
					
					// =========
					
					document.querySelector("#test_1 svg").appendChild(response);
					document.querySelector("#test_1 svg").setAttribute("width", document.querySelector("#test_1 svg").offsetWidth);
					document.querySelector("#test_1 svg").setAttribute("height", document.querySelector("#test_1 svg").offsetHeight);
					document.querySelector("#test_1 svg").setAttribute("viewBox", "0 0 " + document.querySelector("#test_1 svg").offsetWidth + " " + document.querySelector("#test_1 svg").offsetHeight);
					document.querySelector("#test_1").innerHTML = document.querySelector("#test_1").innerHTML;
					
					// =========
					
					document.querySelector("#test_2 svg").appendChild(response);
					document.querySelector("#test_2 svg").setAttribute("width", document.querySelector("#test_2 svg").offsetWidth);
					document.querySelector("#test_2 svg").setAttribute("height", document.querySelector("#test_2 svg").offsetHeight);
					document.querySelector("#test_2 svg").setAttribute("viewBox", "0 0 " + document.querySelector("#test_2 svg").offsetWidth + " " + document.querySelector("#test_2 svg").offsetHeight);
					document.querySelector("#test_2").innerHTML = document.querySelector("#test_2").innerHTML;

					// =========
					
					document.querySelector("#test_3 svg").appendChild(response);
					document.querySelector("#test_3 svg").setAttribute("width", document.querySelector("#test_3 svg").offsetWidth);
					document.querySelector("#test_3 svg").setAttribute("height", document.querySelector("#test_3 svg").offsetHeight);
					document.querySelector("#test_3 svg").setAttribute("viewBox", "0 0 " + document.querySelector("#test_3 svg").offsetWidth + " " + document.querySelector("#test_3 svg").offsetHeight);
					document.querySelector("#test_3").innerHTML = document.querySelector("#test_3").innerHTML;

					// =========
					
					document.querySelector("#test_4 svg").appendChild(response);
					document.querySelector("#test_4 svg").setAttribute("width", document.querySelector("#test_4 svg").offsetWidth);
					document.querySelector("#test_4 svg").setAttribute("height", document.querySelector("#test_4 svg").offsetHeight);
					document.querySelector("#test_4 svg").setAttribute("viewBox", "0 0 " + document.querySelector("#test_4 svg").offsetWidth + " " + document.querySelector("#test_4 svg").offsetHeight);
					document.querySelector("#test_4").innerHTML = document.querySelector("#test_4").innerHTML;
				}

				document.querySelector("#" + floor + "_floor svg").appendChild(response);
				document.querySelector("#" + floor + "_floor svg").setAttribute("viewBox", "0 0 " + document.querySelector("#" + floor + "_floor .facade").offsetHeight + " " + document.querySelector("#" + floor + "_floor .facade").offsetWidth);
				document.querySelector("#" + floor + "_floor").innerHTML = document.querySelector("#" + floor + "_floor").innerHTML;
			}
		};
		xhr.send("");
	});
}