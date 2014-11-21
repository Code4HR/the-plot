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
		rooms: [
			{
				subRooms: [
					{
						identifier: 'work_room_1',
						hoverable: true,
						walls: ['top', 'left'],
						contents: [
							{
								type: 'table',
								options: {
									chairs: {
										left: 2,
										right: 2
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
								options: { addedClasses: ['couch_1'] }
							},
							{
								type: 'couch',
								options: { addedClasses: ['couch_2'] }
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
								options: { addedClasses: ['couch_1'] }
							},
							{
								type: 'couch',
								options: { addedClasses: ['couch_2'] }
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
										right: 4
									}
								}
							}
						]
					}
				]
			}
		]
	},
	"second": {
		numbers: [
			"deck",
			"couches",
			"kitchen"
		],
		rooms: [
			{
				subRooms: [
					{
						identifier: "bathroom",
						walls: ['left', 'right', 'bottom']
					},
					{
						identifier: "closet",
						walls: ['right', 'bottom']
					},
					{
						identifier: 'deck',
						hoverable: true,
						contents: [
							{
								type: "table",
								options: {
									addedClasses: ['table_1'],
									chairs: {
										front: 1,
										back: 1
									},
									umbrella: true
								}
							},
							{
								type: "table",
								options: {
									addedClasses: ['table_2'],
									chairs: {
										front: 1,
										back: 1
									},
									umbrella: true
								}
							}
						],
						edits: function(el) {
							el.querySelector(".ground").insertAdjacentHTML('afterend', html({serialize: true, classes: ['floor']}));
						}
					}
				],
				contents: [
					{
						type: "table",
						options: {
							chairs: {
								front: 5,
								back: 5
							}
						}
					},
					{
						type: 'couch',
						options: { addedClasses: ['couch_1'] }
					},
					{
						type: 'couch',
						options: { addedClasses: ['couch_2'] }
					},
					{
						type: 'couch',
						options: { addedClasses: ['couch_3'] }
					},
					{
						type: 'step',
						options: { addedClasses: ['counter'] }
					}
				],
				edits: function(el) {
					el.querySelector('.left-side').insertAdjacentHTML('afterend', html({
						serialize: true, 
						classes: ['ground', 'ground_couches'], 
						attributes: [{
							name: 'data-number', 
							value: 'couches_number'
						}]
					}));

					el.querySelector('.left-side').insertAdjacentHTML('afterend', html({
						serialize: true, 
						classes: ['ground', 'ground_kitchen'], 
						attributes: [{
							name: 'data-number', 
							value: 'kitchen_number'
						}]
					}));
				}
			}
		]
	},
	"third": {
		numbers: ['mezzanine'],
		rooms: [
			{
				subRooms: [
					{
						identifier: 'stairs',
						contents: [
							{
								type: 'step',
								options: { addedClasses: ['step_large', 'step_1'] }
							},
							{
								type: 'step',
								options: { addedClasses: ['step_large', 'step_2'] }
							},
							{
								type: 'step',
								options: { addedClasses: ['step_small', 'step_1'] }
							},
							{
								type: 'step',
								options: { addedClasses: ['step_small', 'step_2'] }
							},
							{
								type: 'step',
								options: { addedClasses: ['step_small', 'step_3'] }
							},
							{
								type: 'step',
								options: { addedClasses: ['step_small', 'step_4'] }
							},
						],
						edits: function(el) {
							el.insertAdjacentHTML('afterbegin', html({serialize: true, classes: ['floor']}));
						}
					}
				],
				contents: [
					{
						type: 'table',
						options: {
							addedClasses: ['table_1'],
							chairs: { left: 3 }
						}
					},
					{
						type: 'table',
						options: {
							addedClasses: ['table_2'],
							chairs: { right: 2 }
						}
					},
					{
						type: 'table',
						options: {
							addedClasses: ['table_3'],
							chairs: { left: 2 }
						}
					},
					{
						type: 'table',
						options: {
							addedClasses: ['table_4'],
							chairs: { right: 2 }
						}
					},
					{
						type: 'table',
						options: {
							addedClasses: ['table_5'],
							chairs: { left: 2 }
						}
					},
					{
						type: 'table',
						options: {
							addedClasses: ['table_6'],
							chairs: { right: 2 }
						}
					},
					{
						type: 'table',
						options: {
							addedClasses: ['table_7'],
							chairs: { left: 2 }
						}
					},
					{
						type: 'table',
						options: { addedClasses: ['table_8'] }
					}
				],
				edits: function(el) {
					el.querySelector('.left-side').insertAdjacentHTML('afterend', html({serialize: true, classes: ['ground'], attributes: [{name: 'data-number', value: 'mezzanine_number'}]}));
				}
			}
		]
	},
	"fourth": {
		numbers: [
			'front_desk',
			'ping_pong_table',
			'eric_office',
			'stairs',
			'drew_office',
			'green_room',
			'field_guide',
			'creative_space',
			'war_room'
		],
		rooms: [
			{
				addedClasses: ['room_1'],
				subRooms: [
					{
						identifier: 'doorway',
						walls: ['top', 'right', 'bottom', 'left']
					},
					{
						identifier: 'divider',
						walls: ['left'],
						edits: function(el) {
							el.querySelector('.left_wall').insertAdjacentHTML('afterend', html({serialize: true, classes: ['table']}));
							insertSeries(el.querySelector('.table'), [
								{classes: ['table_surface']},
								{classes: ['right_wall']},
								{classes: ['top_wall']},
								{classes: ['bottom_wall']}
							]);
						}
					},
					{
						identifier: 'eric_office',
						hoverable: true,
						walls: ['left', 'right', 'top'],
						contents: [
							{
								type: 'table',
								options: {
									chairs: {
										back: 1
									}
								}
							}
						]
					},
					{
						identifier: 'storage_room_1',
						walls: ['right', 'top']
					},
					{
						identifier: 'storage_room_2',
						walls: ['right', 'bottom', 'top']
					},
					{
						identifier: 'storage_room_3',
						walls: ['right']
					},
					{
						identifier: 'bathroom_1',
						walls: ['top', 'right', 'bottom', 'left']
					},
					{
						identifier: 'bathroom_2',
						walls: ['left', 'right']
					},
					{
						identifier: 'stairs',
						contents: [
							{
								type: 'step',
								options: { addedClasses: ['step_large', 'step_1'] }
							},
							{
								type: 'step',
								options: { addedClasses: ['step_large', 'step_2'] }
							},
							{
								type: 'step',
								options: { addedClasses: ['step_small', 'step_1'] }
							},
							{
								type: 'step',
								options: { addedClasses: ['step_small', 'step_2'] }
							},
							{
								type: 'step',
								options: { addedClasses: ['step_small', 'step_3'] }
							},
							{
								type: 'step',
								options: { addedClasses: ['step_small', 'step_4'] }
							},
						],
						edits: function(el) {
							el.insertAdjacentHTML('afterbegin', html({serialize: true, classes: ['floor']}));
						}
					},
					{
						identifier: 'drew_office',
						hoverable: true,
						walls: ['left', 'right', 'top'],
						contents: [
							{
								type: 'table',
								options: {
									chairs: {
										back: 1
									}
								}
							}
						]
					}
				],
				contents: [
					{
						type: 'table',
						options: {
							addedClasses: ['front_desk'],
							chairs: {
								left: 2
							}
						}
					},
					{
						type: 'table',
						options: {
							addedClasses: ['ping_pong_table']
						}
					},
					{
						type: 'table',
						options: {
							addedClasses: ['producer_table'],
							chairs: {
								front: 3,
								back: 3
							}
						}
					}
				],
				edits: function(el) {
					el.querySelector('.left-side').insertAdjacentHTML('afterend', html({serialize: true, classes: ['left_wall', 'upper']}));
					el.querySelector('.left-side').insertAdjacentHTML('afterend', html({serialize: true, classes: ['left_wall', 'lower']}));
					el.querySelector('.left-side').insertAdjacentHTML('afterend', html({serialize: true, classes: ['ground', 'ground_front_desk'], attributes: [{name: 'data-number', value: 'front_desk_number'}]}));
					el.querySelector('.left-side').insertAdjacentHTML('afterend', html({serialize: true, classes: ['ground', 'ground_ping_pong_table'], attributes: [{name: 'data-number', value: 'ping_pong_table_number'}]}));
					el.querySelector('.left-side').insertAdjacentHTML('afterend', html({serialize: true, classes: ['ground', 'ground_steps'], attributes: [{name: 'data-number', value: 'stairs_number'}]}));
					el.querySelector('.left-side').insertAdjacentHTML('afterend', html({serialize: true, classes: ['ground', 'ground_green_room'], attributes: [{name: 'data-number', value: 'green_room_number'}]}));

					el.insertAdjacentHTML('beforeend', html({serialize: true, classes: ['left_wall', 'green_room_divider']}));
				}
			},
			{
				addedClasses: ['room_2'],
				subRooms: [
					{
						identifier: 'kitchen',
						walls: ['left', 'bottom']
					}
				],
				contents: [
					{
						type: 'table',
						options: {
							addedClasses: ['table_1'],
							chairs: {
								left: 3,
								right: 3
							}
						}
					},
					{
						type: 'table',
						options: {
							addedClasses: ['table_2'],
							chairs: {
								left: 3,
								right: 3
							}
						}
					},
					{
						type: 'table',
						options: {
							addedClasses: ['table_3'],
							chairs: {
								left: 3,
								right: 3
							}
						}
					},
					{
						type: 'table',
						options: {
							addedClasses: ['bar']
						}
					}
				],
				edits: function(el) {
					el.querySelector('.left-side').insertAdjacentHTML('afterend', html({serialize: true, classes: ['ground'], attributes: [{name: 'data-number', value: 'field_guide_number'}]}));
				}
			},
			{
				addedClasses: ['room_3']
			},
			{
				addedClasses: ['room_4'],
				subRooms: [
					{
						identifier: 'office',
						walls: ['top', 'bottom']
					}
				],
				contents: [
					{
						type: 'table',
						options: {
							addedClasses: ['office_desk_1'],
							chairs: {
								back: 1
							}
						}
					},
					{
						type: 'table',
						options: {
							addedClasses: ['office_desk_2'],
							chairs: {
								front: 1
							}
						}
					}
				]
			},
			{
				addedClasses: ['room_5'],
				contents: [
					{
						type: 'table',
						options: {
							addedClasses: ['standing_desks'],
							chairs: {
								back: 4
							}
						}
					},
					{
						type: 'table',
						options: {
							addedClasses: ['creative_table_1'],
							chairs: {
								left: 2,
								right: 2
							}
						}
					},
					{
						type: 'table',
						options: {
							addedClasses: ['creative_table_2'],
							chairs: {
								left: 2,
								right: 2
							}
						}
					}
				],
				edits: function(el) {
					el.querySelector('.left-side').insertAdjacentHTML('afterend', html({serialize: true, classes: ['ground'], attributes: [{name: 'data-number', value: 'creative_space_number'}]}));
					el.querySelector('.left-side').insertAdjacentHTML('afterend', html({serialize: true, classes: ['divider', 'divider_1']}));
					el.querySelector('.left-side').insertAdjacentHTML('afterend', html({serialize: true, classes: ['divider', 'divider_2']}));
				}
			},
			{
				addedClasses: ['room_6'],
				contents: [
					{
						type: 'table',
						options: {
							addedClasses: ['table_1'],
							chairs: {
								front: 3,
								back: 3
							}
						}
					},
					{
						type: 'table',
						options: {
							addedClasses: ['table_2'],
							chairs: {
								front: 3,
								back: 3
							}
						}
					}
				],
				edits: function(el) {
					el.querySelector('.left-side').insertAdjacentHTML('afterend', html({serialize: true, classes: ['ground'], attributes: [{name: 'data-number', value: 'war_room_number'}]}));
				}
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

		if(opts.chairs) {
			Object.keys(opts.chairs).forEach(function(chairSide) {
				for(var i=0; i<opts.chairs[chairSide]; i++) {
					wrapper.insertAdjacentHTML('beforeend', serializeDOM(this.chair(chairSide, ["chair_" + chairCount])));
					chairCount++;
				}
			}.bind(this));
		}

		if(opts.umbrella === true) {
			wrapper.insertAdjacentHTML('beforeend', html({serialize: true, classes: ['umbrella']}));
			insertSeries(wrapper.querySelector('.umbrella'), [
				{classes: ['pole']},
				{classes: ['triangle', 'triangle_1']},
				{classes: ['triangle', 'triangle_2']},
				{classes: ['triangle', 'triangle_3']},
				{classes: ['triangle', 'triangle_4']},
				{classes: ['triangle', 'triangle_5']},
				{classes: ['triangle', 'triangle_6']},
				{classes: ['triangle', 'triangle_7']},
				{classes: ['triangle', 'triangle_8']}
			]);
		}

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
	step: function(opts) {
		var addedClasses = opts.addedClasses || [],
			wrapper = html({classes: ['step', addedClasses.join(" ")]});

		insertSeries(wrapper, [
			{classes: ['vertical']},
			{classes: ['horizontal']},
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

var constructRoom = function(opts) {
	var additionalClasses = opts.additionalClasses || [],
		sides = opts.sides || ['top', 'right', 'bottom', 'left'],
		wrapper = html({classes: ['room', additionalClasses.join(" ")]});

	sides.forEach(function(side) {
		wrapper.insertAdjacentHTML('beforeend', html({serialize: true, classes: ['side', side + '-side']}));
	});

	if(opts.contents) {
		opts.contents.forEach(function(item) {
			wrapper.insertAdjacentHTML('beforeend', serializeDOM(itemConstructors[item.type](item.options)));
		});
	}

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

	if(opts.walls) {
		opts.walls.forEach(function(wall) {
			wrapper.insertAdjacentHTML('beforeend', html({serialize: true, classes: [wall + "_wall"]}));
		});
	}

	if(opts.contents) {
		opts.contents.forEach(function(item) {
			wrapper.insertAdjacentHTML('beforeend', serializeDOM(itemConstructors[item.type](item.options)));
		});
	}

	if(opts.edits) {
		opts.edits(wrapper);
	}

	return wrapper;
}

window.onload = function() {
	buildingContainer = d.querySelector(".building");

	Object.keys(floors).forEach(function(floor) {
		var floorEl = constructFloor(floor);
		floors[floor].rooms.forEach(function(room, roomIndex) {
			var addedClasses = room.addedClasses || [];
			floorEl.querySelector('.rooms').insertAdjacentHTML('beforeend', serializeDOM(constructRoom({
					additionalClasses: ["wrapper_room_" + roomIndex, addedClasses.join(" ")],
					contents: room.contents
				})));
			var roomEl = floorEl.querySelector(".wrapper_room_" + roomIndex);

			if(room.subRooms) {
				room.subRooms.forEach(function(subRoom) {
					roomEl.insertAdjacentHTML('beforeend', serializeDOM(constructSubRoom(subRoom)));
				});
			}

			if(room.edits) {
				room.edits(roomEl);
			}
		});

		floors[floor].numbers.forEach(function(number) {
			floorEl.querySelector('.rooms').insertAdjacentHTML('beforeend', serializeDOM(itemConstructors.number({id: number})));
		});

		buildingContainer.insertAdjacentHTML('beforeend', serializeDOM(floorEl));
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
