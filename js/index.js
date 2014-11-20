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
		numbers: [
			"work_room_1",
			"work_room_2",
			"work_room_3",
			"conference_room"
		],
		rooms: [ //usually just one for a floor
			{
				addedClasses: [],
				subRooms: [
					{
						identifier: 'work_room_1',
						hoverable: true,
						walls: ['top', 'left'],
						contents: [
							{
								type: 'table',
								options: {
									addedClasses: [],
									chairs: {
										left: 2,
										right: 2,
										front: 0,
										back: 0
									}
								}
							}
						]
					},
					{
						identifier: 'work_room_2',
						hoverable: true,
						walls: ['top', 'left'],
						contents: [
							{
								type: 'couch',
								options: {
									addedClasses: ['couch_1']
								}
							},
							{
								type: 'couch',
								options: {
									addedClasses: ['couch_2']
								}
							}
						]
					},
					{
						identifier: 'work_room_3',
						hoverable: true,
						walls: ['bottom', 'right'],
						contents: [
							{
								type: 'couch',
								options: {
									addedClasses: ['couch_1']
								}
							},
							{
								type: 'couch',
								options: {
									addedClasses: ['couch_2']
								}
							}
						]
					},
					{
						identifier: 'storage_room_1',
						walls: ['bottom', 'right']
					},
					{
						identifier: 'storage_room_2',
						walls: ['bottom', 'right']
					},
					{
						identifier: 'storage_room_3',
						walls: ['bottom', 'right', 'left']
					},
					{
						identifier: 'storage_room_4',
						walls: ['bottom', 'right']
					},
					{
						identifier: 'conference_room',
						hoverable: true,
						walls: ['right'],
						contents: [
							{
								type: 'table',
								options: {
									chairs: {
										left: 4,
										right: 4,
										front: 0,
										back: 0
									}
								}
							}
						]
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

var insertSeries = function(el, items) {
	items.forEach(function(item) {
		el.insertAdjacentHTML('beforeend', html({serialize: true, classes: item.classes}));
	});
	return el;
}

var itemConstructors = {
	chair: function(orientation, additionalClasses) {
		additionalClasses = additionalClasses || [];

		var wrapper = html({classes: ['chair', 'chair_' + orientation + '_facing', additionalClasses.join(" ")]});

		insertSeries(wrapper, [
			{classes: ['chair_seat']},
			{classes: ['chair_back']},
			{classes: ['chair_leg_tl']},
			{classes: ['chair_leg_tr']},
			{classes: ['chair_leg_bl']},
			{classes: ['chair_leg_br']}
		]);

		return wrapper;
	},
	table: function(opts) {
		var addedClasses = opts.addedClasses || [],
			wrapper = html({classes: ['table', addedClasses.join(" ")]});

		insertSeries(wrapper, [
			{classes: ['table_surface']},
			{classes: ['table_leg_tl']},
			{classes: ['table_leg_tr']},
			{classes: ['table_leg_bl']},
			{classes: ['table_leg_br']}
		]);

		var chairCount = 0;

		Object.keys(opts.chairs).forEach(function(chairSide) {
			for(var i=0; i<opts.chairs[chairSide]; i++) {
				wrapper.insertAdjacentHTML('beforeend', serializeDOM(this.chair(chairSide, ["chair_" + chairCount])));
				chairCount++;
			}
		}.bind(this));
		return wrapper;
	},
	couch: function(opts) {
		var addedClasses = opts.addedClasses || [],
			wrapper = html({classes: ['couch', addedClasses.join(" ")]});

		insertSeries(wrapper, [
			{classes: ['back']},
			{classes: ['floor']},
			{classes: ['step', 'step_1']},
			{classes: ['step', 'step_2']}
		]);

		insertSeries(wrapper.querySelector('.step_1'), [
			{classes: ['step_1_vertical']},
			{classes: ['step_1_horizontal']}
		]);

		insertSeries(wrapper.querySelector('.step_2'), [
			{classes: ['step_2_vertical']},
			{classes: ['step_2_horizontal']}
		]);

		return wrapper;
	},
	number: function(opts) {
		var wrapper = html({classes: ['number'], id: opts.id + "_number"});

		insertSeries(wrapper, [
			{classes: ['detail']},
			{classes: ['circle']}
		]);

		return wrapper;
	}
}

var constructFloor = function(orientation) {
	var wrapper = html({classes: ['container'], id: orientation + "_floor"}),
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

	if(opts.contents) {
		opts.contents.forEach(function(item) {
			wrapper.insertAdjacentHTML('beforeend', serializeDOM(itemConstructors[item.type](item.options)));
		});
	}

	return wrapper;
}

window.onload = function() {
	buildingContainer = d.querySelector(".building");

	Object.keys(floors).forEach(function(floor) {
		var floorEl = constructFloor(floor);
		floors[floor].rooms.forEach(function(room, roomIndex) {
			floorEl.querySelector('.rooms').insertAdjacentHTML('beforeend', serializeDOM(constructRoom(["wrapper_room_" + roomIndex])));
			var roomEl = floorEl.querySelector(".wrapper_room_" + roomIndex);

			room.subRooms.forEach(function(subRoom) {
				roomEl.insertAdjacentHTML('beforeend', serializeDOM(constructSubRoom(subRoom)));
			});
		});

		floors[floor].numbers.forEach(function(number) {
			floorEl.querySelector('.rooms').insertAdjacentHTML('beforeend', serializeDOM(itemConstructors.number({id: number})));
		});

		buildingContainer.insertAdjacentHTML('afterbegin', serializeDOM(floorEl));
	});

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
}
