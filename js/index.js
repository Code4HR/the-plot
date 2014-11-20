function floorAnimate() {
  	document.querySelector("body").className = "rotated";
}

function floorUnanimate() {
  document.querySelector("body").className = "";
}

var d = document,
	buildingContainer;

var floors = {
	"top": {
		rooms: [ //usually just one for a floor
			{
				addedClasses: [],
				subRooms: [
					{
						identifier: 'work_room_1',
						hoverable: true,
						walls: ['top', 'left'],
						contents: { 
							tables: [
								{
									addedClasses: [],
									leftChairs: 2,
									rightChairs: 2,
									frontChairs: 0,
									backChairs: 0
								}
							]
						}
					},
					{
						identifier: 'work_room_2',
						hoverable: true,
						walls: ['top', 'left'],
						contents: {
							couches: [
								{
									addedClasses: ['couch_1']
								},
								{
									addedClasses: ['couch_2']
								}
							]
						}
					},
					{
						identifier: 'work_room_3',
						hoverable: true,
						walls: ['bottom', 'right'],
						contents: {
							couches: [
								{
									addedClasses: ['couch_1']
								},
								{
									addedClasses: ['couch_2']
								}
							]
						}
					},
					{
						identifier: 'storage_room_1',
						walls: ['bottom', 'right']
					}
				]
			}
		]
	}
}

var serializeDOM = function(el) {
	var wrapper = d.createElement("div");
	wrapper.appendChild(el);
	return wrapper.innerHTML;
}

var html = function(opts) {
	// perhaps this should deal just with string manipulation if i'm only trying to get the HTML as a string, for performance's sake
	var classes = opts.classes || [],
		id = opts.id || "",
		element = opts.element || "div",
		serialize = opts.serialize || false,
		attributes = opts.attributes || [],
		el = d.createElement(element);
	
	el.className = classes.join(" ");
	el.setAttribute("id", id);

	attributes.forEach(function(attribute) {
		el.setAttribute(attribute.name, attribute.value);
	});

	if(serialize) {
		return serializeDOM(el);
	}
	return el;
}

// these functions all return the DOM element
var constructChair = function(orientation, additionalClasses) {
	additionalClasses = additionalClasses || [];

	var wrapper = html({classes: ['chair', 'chair_' + orientation + '_facing', additionalClasses.join(" ")]});

	wrapper.insertAdjacentHTML('beforeend', html({serialize: true, classes: ['chair_seat']}));
	wrapper.insertAdjacentHTML('beforeend', html({serialize: true, classes: ['chair_back']}));
	wrapper.insertAdjacentHTML('beforeend', html({serialize: true, classes: ['chair_leg_tl']}));
	wrapper.insertAdjacentHTML('beforeend', html({serialize: true, classes: ['chair_leg_tr']}));
	wrapper.insertAdjacentHTML('beforeend', html({serialize: true, classes: ['chair_leg_bl']}));
	wrapper.insertAdjacentHTML('beforeend', html({serialize: true, classes: ['chair_leg_br']}));
	return wrapper;
}

var constructFloor = function(orientation) {
	var wrapper = html({classes: ['container'], id: orientation + "_floor_test"}),
		contents = html({classes: ['contents']}),
		facade = html({classes: ['facade']});

	facade.insertAdjacentHTML('beforeend', html({serialize: true, element: "svg"}));

	contents.insertAdjacentHTML('beforeend', html({serialize: true, classes: ['rooms']}));
	contents.insertAdjacentHTML('beforeend', serializeDOM(facade));

	wrapper.insertAdjacentHTML('beforeend', serializeDOM(contents));
	return wrapper;
}

var constructRoom = function(additionalClasses, sides) {
	additionalClasses = additionalClasses || [];
	sides = sides || ['top', 'right', 'bottom', 'left'];

	var wrapper = html({classes: ['room', additionalClasses.join(" ")]});
	sides.forEach(function(side) {
		wrapper.insertAdjacentHTML('beforeend', html({serialize: true, classes: ['side', side + '-side']}));
	});
	return wrapper;
}

var constructSubRoom = function(opts) {
	var additionalClasses = opts.addedClasses ? [opts.addedClasses, opts.identifier] : [opts.identifier],
		wrapper = html({classes: additionalClasses});

	if(opts.hoverable === true) {
		wrapper.insertAdjacentHTML('beforeend', html(
			{
				classes: ['ground'], 
				serialize: true,
				attributes: [{
					name: 'data-number', 
					value: opts.identifier + "_number"
				}]
			}));
	}

	opts.walls.forEach(function(wall) {
		wrapper.insertAdjacentHTML('beforeend', html({serialize: true, classes: [wall + "_wall"]}));
	});

	return wrapper;
}

window.onload = function() {
	['top', 'second', 'third', 'fourth'].forEach(function(floor) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "img/" + floor + "_floor.svg");
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				var response = xhr.responseXML.documentElement,
					el = d.querySelector("#" + floor + "_floor");

				el.querySelector("svg").appendChild(response);
				el.querySelector("svg").setAttribute("viewBox", "0 0 " + el.querySelector(".facade").offsetWidth * 2 + " " + el.querySelector(".facade").offsetHeight * 2);
				el.innerHTML = el.innerHTML;
			}
		};
		xhr.send("");
	});

	d.querySelector("body").addEventListener("mouseover", function(e) {
		if(e.target.className.split(" ").indexOf("ground") > -1) {
			d.getElementById(e.target.getAttribute("data-number")).className += " hover";
		}
	});

	d.querySelector("body").addEventListener("mouseout", function(e) {
		if(e.target.className.split(" ").indexOf("ground") > -1) {
			var el = d.getElementById(e.target.getAttribute("data-number"));
			el.className = el.className.replace( new RegExp('(?:^|\\s)hover(?!\\S)'), '' );
		}
	});

	buildingContainer = d.querySelector("#test_building");

	Object.keys(floors).forEach(function(floor) {
		var floorEl = constructFloor(floor);
		floors[floor].rooms.forEach(function(room, roomIndex) {
			floorEl.querySelector('.rooms').insertAdjacentHTML('beforeend', serializeDOM(constructRoom(["top_level_room_" + roomIndex])));
			var roomEl = floorEl.querySelector(".top_level_room_" + roomIndex);

			room.subRooms.forEach(function(subRoom) {
				roomEl.insertAdjacentHTML('beforeend', serializeDOM(constructSubRoom(subRoom)));
			});
		});

		buildingContainer.insertAdjacentHTML('beforeend', serializeDOM(floorEl));
	});
}
