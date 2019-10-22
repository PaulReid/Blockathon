//Aliases
let Application = PIXI.Application,
loader = PIXI.loader,
resources = PIXI.loader.resources,
Sprite = PIXI.Sprite;

	//Create a Pixi Application
	let app = new Application({ 
		width: 1100, 
		height: 550,                       
		antialias: true, 
		transparent: false, 
		resolution: 1,
		backgroundColor: 0x1099bb
	});

//Add the canvas that Pixi automatically created for you to the HTML document
document.getElementById("map").appendChild(app.view);

//############################### Background Sprite ########################
const background = Sprite.from('https://raw.githubusercontent.com/DonValino/Hackaton/master/Floor%20Plan.png');	


	// Set the initial position
	background.anchor.set(0.0);
	background.x = 0;
	background.y = 0;
	background.scale.x += .5;
	background.scale.y += .2;
	
	// Opt-in to interactivity
	background.interactive = false;

	app.stage.addChild(background);

//############################### End of Background Sprite ########################

//############################### Entrance Door Sprite ########################

const entranceDoor = PIXI.Sprite.from('https://raw.githubusercontent.com/DonValino/Hackaton/master/Door.png');

entranceDoor.name = "Entrance";

// Set the initial position
entranceDoor.anchor.set(0.0);
entranceDoor.x = 655;
entranceDoor.y = 425;
entranceDoor.scale.x += .5;

// Opt-in to interactivity
entranceDoor.interactive = true;

// Shows hand cursor
entranceDoor.buttonMode = true;

// Pointers normalize touch and mouse
entranceDoor.on('pointerdown', onClickDoor);

app.stage.addChild(entranceDoor);

//############################### Bathroom Door Sprite ########################

const bathroomDoor = PIXI.Sprite.from('https://raw.githubusercontent.com/DonValino/Hackaton/master/Door.png');

bathroomDoor.name = "Bathroom";


// Set the initial position
bathroomDoor.anchor.set(0.0);
bathroomDoor.x = 340;
bathroomDoor.y = 375;
bathroomDoor.scale.x += .5;

// Opt-in to interactivity
bathroomDoor.interactive = true;

// Shows hand cursor
bathroomDoor.buttonMode = true;

// Pointers normalize touch and mouse
bathroomDoor.on('pointerdown', onClickDoor);

app.stage.addChild(bathroomDoor);

//############################### Office Door Sprite ########################

const officeDoor = PIXI.Sprite.from('https://raw.githubusercontent.com/DonValino/Hackaton/master/Door.png');

officeDoor.name = "Office";


// Set the initial position
officeDoor.anchor.set(0.0);
officeDoor.x = 550;
officeDoor.y = 310;
officeDoor.scale.x += .5;

var arc = (Math.PI * 2 * 0.125) * 2;
officeDoor.rotation += arc;

// Opt-in to interactivity
officeDoor.interactive = true;

// Shows hand cursor
officeDoor.buttonMode = true;

// Pointers normalize touch and mouse
officeDoor.on('pointerdown', onClickDoor);

app.stage.addChild(officeDoor);

//############################### Server Door Sprite ########################

const serverDoor = PIXI.Sprite.from('https://raw.githubusercontent.com/DonValino/Hackaton/master/Door.png');

serverDoor.name = "Server Room"

// Set the initial position
serverDoor.anchor.set(0.0);
serverDoor.x = 830;
serverDoor.y = 210;
serverDoor.scale.x += .5;

var arc = (Math.PI * 2 * 0.125) * 4;
serverDoor.rotation += arc;

// Opt-in to interactivity
serverDoor.interactive = true;

// Shows hand cursor
serverDoor.buttonMode = true;

// Pointers normalize touch and mouse
serverDoor.on('pointerdown', onClickDoor);

app.stage.addChild(serverDoor);


//############################ On Click Handlers  ##########################################

function onClickDoor(doorData){

	var data = doorData.currentTarget;

	updateConfigDetails(data.name);


}


function updateConfigDetails(doorName){
	
	var title = document.getElementById("config-title");
	title.innerHTML = doorName;
	
	var apiUrl = "https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/securedLocations"


	var settings = {
		"async": true,
		// "crossDomain": true,
		"url": "https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/securedLocations",
		"method": "GET",
		// "dataType": "jsonp",
		"headers": {
			"Authorization": "Bearer 9vbc1trbjcgqa7r0fvim5uy2m",
			// "cache-control": "no-cache"
		},
	}

	$.ajax(settings).done(function (response) {
		console.log(response);
	});


}


var configResponse = {"total":1,"data":[{"id":"efb3524bd7990149ae09d45f1200b401","descriptor":"Demo Lock","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/securedLocations/efb3524bd7990149ae09d45f1200b401","securedLocationName":"Demo Lock","securedLocationUID":"demo_lock","accessibleByPerson":[{"id":"9e74f2aa5d70488d88a739d799bcc9ab","descriptor":"Betty Liu (manager 4300, CostCtrMgr 30.3, 41200, PayIntPartner; PayPartner, PayAdmin)"},{"id":"2eb21d19e0a110106352191d4457015c","descriptor":"Richard Flanagan"},{"id":"dc5359499a640152d563d158a93fbc00","descriptor":"Dean Flood"}]}]}

var returnedDoorName = configResponse.data[0].securedLocationName;
var returnedDoorUID = configResponse.data[0].securedLocationUID;
var returnedDoorAccessList = configResponse.data[0].accessibleByPerson;

$("#access-list").empty();

for(var i in returnedDoorAccessList) {
	var userName = (returnedDoorAccessList[i].descriptor)

}


