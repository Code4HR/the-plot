function floorAnimate() {
  document.querySelector("body").className = "rotated";
}

function floorUnanimate() {
  document.querySelector("body").className = "";
}

window.onload = function() {
	xhr = new XMLHttpRequest();
	xhr.open("GET","img/first_floor.svg");
	xhr.onreadystatechange = update;
	xhr.send("");

	function update() {
        if (xhr.readyState == 4) {
			document.querySelector("#top_floor svg").appendChild(xhr.responseXML.documentElement);
		    document.querySelector("#top_floor svg").setAttribute("viewBox", "0 0 " + document.querySelector("#top_floor .facade").offsetHeight + " " + document.querySelector("#top_floor .facade").offsetWidth);
			document.querySelector("#top_floor").innerHTML = document.querySelector("#top_floor").innerHTML;
        }
    }

	xhr2 = new XMLHttpRequest();
	xhr2.open("GET","img/second_floor.svg");
	xhr2.onreadystatechange = update2;
	xhr2.send("");

	function update2() {
        if (xhr2.readyState == 4) {
			document.querySelector("#second_floor svg").appendChild(xhr2.responseXML.documentElement);
		    document.querySelector("#second_floor svg").setAttribute("viewBox", "0 0 " + document.querySelector("#second_floor .facade").offsetHeight + " " + document.querySelector("#second_floor .facade").offsetWidth);
			document.querySelector("#second_floor").innerHTML = document.querySelector("#second_floor").innerHTML;
        }
    }

	xhr3 = new XMLHttpRequest();
	xhr3.open("GET","img/third_floor.svg");
	xhr3.onreadystatechange = update3;
	xhr3.send("");

	function update3() {
        if (xhr3.readyState == 4) {
			document.querySelector("#third_floor svg").appendChild(xhr3.responseXML.documentElement);
		    document.querySelector("#third_floor svg").setAttribute("viewBox", "0 0 " + document.querySelector("#third_floor .facade").offsetHeight + " " + document.querySelector("#third_floor .facade").offsetWidth);
			document.querySelector("#third_floor").innerHTML = document.querySelector("#third_floor").innerHTML;
        }
    }

	xhr4 = new XMLHttpRequest();
	xhr4.open("GET","img/fourth_floor.svg");
	xhr4.onreadystatechange = update4;
	xhr4.send("");

	function update4() {
        if (xhr4.readyState == 4) {
			document.querySelector("#fourth_floor svg").appendChild(xhr4.responseXML.documentElement);
		    document.querySelector("#fourth_floor svg").setAttribute("viewBox", "0 0 " + document.querySelector("#fourth_floor .facade").offsetHeight + " " + document.querySelector("#fourth_floor .facade").offsetWidth);
			document.querySelector("#fourth_floor").innerHTML = document.querySelector("#fourth_floor").innerHTML;
        }
    }
}