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

	console.log(data);

}


function updateConfigDetails(doorName){
	
	var title = document.getElementById("config-title");
	title.innerHTML = doorName;
	
	var apiUrl = "https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/securedLocations"


	var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/securedLocations",
  "method": "GET",
  "headers": {
    "Authorization": "Bearer 7596lvaaxwa1h7c4ava6k5vo",
    "Content-Type": "text/plain",
   // "User-Agent": "PostmanRuntime/7.17.1",
    "Accept": "*/*",
    "Cache-Control": "no-cache",
    "Postman-Token": "058d48e9-13e7-42ef-816f-a32a82342009,8d537a18-ea91-45cd-8e83-f650eb39f6ea",
    // "Host": "i-092927d2dad9b747b.workdaysuv.com",
    // "Accept-Encoding": "gzip, deflate",
    // "Content-Length": "68",
    // "Connection": "keep-alive",
    "cache-control": "no-cache"
  }
  //"data": "{\n    \"accessDeviceUID\": \"keya\",\n    \"securedLocationUID\": \"locka\"\n}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});


}


function displayConfigResponse(){
	
	var configResponse = {"total":1,"data":[{"id":"efb3524bd7990149ae09d45f1200b401","descriptor":"Demo Lock","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/securedLocations/efb3524bd7990149ae09d45f1200b401","securedLocationName":"Demo Lock","securedLocationUID":"demo_lock","accessibleByPerson":[{"id":"9e74f2aa5d70488d88a739d799bcc9ab","descriptor":"Betty Liu (manager 4300, CostCtrMgr 30.3, 41200, PayIntPartner; PayPartner, PayAdmin)"},{"id":"2eb21d19e0a110106352191d4457015c","descriptor":"Richard Flanagan"},{"id":"dc5359499a640152d563d158a93fbc00","descriptor":"Dean Flood"}]}]}
	var returnedDoorName = configResponse.data[0].securedLocationName;
	var returnedDoorUID = configResponse.data[0].securedLocationUID;
	var returnedDoorAccessList = configResponse.data[0].accessibleByPerson;

	$(".access-list").empty();

	for(var i in returnedDoorAccessList) {
		var userName = (returnedDoorAccessList[i].descriptor)
		$(".access-list").append("<li class='access-list-value'>" + userName + "</li>");
	}
}

function displayAccessLogResponse() {
	var accessLogResponse = {"total":9,"data":[{"id":"efb3524bd79901121fcb3a8ea5003d06","descriptor":"2019-10-22T03:05:17.056[TZ005] - Access Granted","accessDeviceUID":"838430061525","accessGranted":true,"accessMoment":"2019-10-22T10:05:17.056Z","securedLocation":{"id":"efb3524bd7990149ae09d45f1200b401","descriptor":"Demo Lock","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/securedLocations/efb3524bd7990149ae09d45f1200b401","securedLocationName":"Demo Lock","accessibleByPerson":[{"id":"9e74f2aa5d70488d88a739d799bcc9ab","descriptor":"Betty Liu (manager 4300, CostCtrMgr 30.3, 41200, PayIntPartner; PayPartner, PayAdmin)"},{"id":"2eb21d19e0a110106352191d4457015c","descriptor":"Richard Flanagan"},{"id":"dc5359499a640152d563d158a93fbc00","descriptor":"Dean Flood"}],"securedLocationUID":"demo_lock"},"locationAccessDevice":{"id":"efb3524bd799017f8724dca062004904","descriptor":"keychain","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/locationAccessDevices/efb3524bd799017f8724dca062004904","locationAccessDeviceUID":"838430061525","locationAccessDeviceName":"keychain","ownedByPerson":{"id":"1386aa4fcca4100044225144a1630f99","descriptor":"Seth Jones"}},"securedLocationUID":"demo_lock"},{"id":"efb3524bd79901f84dbf638fa5003e06","descriptor":"2019-10-22T03:05:22.037[TZ005] - Access Granted","accessDeviceUID":"276289070252","accessGranted":true,"accessMoment":"2019-10-22T10:05:22.037Z","securedLocation":{"id":"efb3524bd7990149ae09d45f1200b401","descriptor":"Demo Lock","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/securedLocations/efb3524bd7990149ae09d45f1200b401","accessibleByPerson":[{"id":"9e74f2aa5d70488d88a739d799bcc9ab","descriptor":"Betty Liu (manager 4300, CostCtrMgr 30.3, 41200, PayIntPartner; PayPartner, PayAdmin)"},{"id":"2eb21d19e0a110106352191d4457015c","descriptor":"Richard Flanagan"},{"id":"dc5359499a640152d563d158a93fbc00","descriptor":"Dean Flood"}],"securedLocationUID":"demo_lock","securedLocationName":"Demo Lock"},"locationAccessDevice":{"id":"efb3524bd79901ec7f7d0a481200b101","descriptor":"keycard","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/locationAccessDevices/efb3524bd79901ec7f7d0a481200b101","locationAccessDeviceName":"keycard","ownedByPerson":{"id":"9e74f2aa5d70488d88a739d799bcc9ab","descriptor":"Betty Liu (manager 4300, CostCtrMgr 30.3, 41200, PayIntPartner; PayPartner, PayAdmin)"},"locationAccessDeviceUID":"276289070252"},"securedLocationUID":"demo_lock"},{"id":"efb3524bd7990156b9bf8a54a6004306","descriptor":"2019-10-22T03:19:28.801[TZ005] - Access Granted","accessDeviceUID":"276289070252","accessGranted":true,"accessMoment":"2019-10-22T10:19:28.801Z","securedLocation":{"id":"efb3524bd7990149ae09d45f1200b401","descriptor":"Demo Lock","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/securedLocations/efb3524bd7990149ae09d45f1200b401","securedLocationName":"Demo Lock","accessibleByPerson":[{"id":"9e74f2aa5d70488d88a739d799bcc9ab","descriptor":"Betty Liu (manager 4300, CostCtrMgr 30.3, 41200, PayIntPartner; PayPartner, PayAdmin)"},{"id":"2eb21d19e0a110106352191d4457015c","descriptor":"Richard Flanagan"},{"id":"dc5359499a640152d563d158a93fbc00","descriptor":"Dean Flood"}],"securedLocationUID":"demo_lock"},"locationAccessDevice":{"id":"efb3524bd79901ec7f7d0a481200b101","descriptor":"keycard","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/locationAccessDevices/efb3524bd79901ec7f7d0a481200b101","locationAccessDeviceUID":"276289070252","ownedByPerson":{"id":"9e74f2aa5d70488d88a739d799bcc9ab","descriptor":"Betty Liu (manager 4300, CostCtrMgr 30.3, 41200, PayIntPartner; PayPartner, PayAdmin)"},"locationAccessDeviceName":"keycard"},"securedLocationUID":"demo_lock"},{"id":"efb3524bd799014484a66056a6004406","descriptor":"2019-10-22T03:19:36.683[TZ005] - Process Denied","accessDeviceUID":"838430061525","accessGranted":false,"accessMoment":"2019-10-22T10:19:36.683Z","securedLocation":{"id":"efb3524bd7990149ae09d45f1200b401","descriptor":"Demo Lock","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/securedLocations/efb3524bd7990149ae09d45f1200b401","securedLocationUID":"demo_lock","securedLocationName":"Demo Lock","accessibleByPerson":[{"id":"9e74f2aa5d70488d88a739d799bcc9ab","descriptor":"Betty Liu (manager 4300, CostCtrMgr 30.3, 41200, PayIntPartner; PayPartner, PayAdmin)"},{"id":"2eb21d19e0a110106352191d4457015c","descriptor":"Richard Flanagan"},{"id":"dc5359499a640152d563d158a93fbc00","descriptor":"Dean Flood"}]},"locationAccessDevice":{"id":"efb3524bd799017f8724dca062004904","descriptor":"keychain","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/locationAccessDevices/efb3524bd799017f8724dca062004904","ownedByPerson":{"id":"1386aa4fcca4100044225144a1630f99","descriptor":"Seth Jones"},"locationAccessDeviceName":"keychain","locationAccessDeviceUID":"838430061525"},"securedLocationUID":"demo_lock"},{"id":"efb3524bd799012304ee41a7a9007206","descriptor":"2019-10-22T04:20:22.592[TZ005] - Access Granted","accessDeviceUID":"276289070252","accessGranted":true,"accessMoment":"2019-10-22T11:20:22.592Z","securedLocation":{"id":"efb3524bd7990149ae09d45f1200b401","descriptor":"Demo Lock","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/securedLocations/efb3524bd7990149ae09d45f1200b401","securedLocationName":"Demo Lock","securedLocationUID":"demo_lock","accessibleByPerson":[{"id":"9e74f2aa5d70488d88a739d799bcc9ab","descriptor":"Betty Liu (manager 4300, CostCtrMgr 30.3, 41200, PayIntPartner; PayPartner, PayAdmin)"},{"id":"2eb21d19e0a110106352191d4457015c","descriptor":"Richard Flanagan"},{"id":"dc5359499a640152d563d158a93fbc00","descriptor":"Dean Flood"}]},"locationAccessDevice":{"id":"efb3524bd79901ec7f7d0a481200b101","descriptor":"keycard","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/locationAccessDevices/efb3524bd79901ec7f7d0a481200b101","locationAccessDeviceName":"keycard","locationAccessDeviceUID":"276289070252","ownedByPerson":{"id":"9e74f2aa5d70488d88a739d799bcc9ab","descriptor":"Betty Liu (manager 4300, CostCtrMgr 30.3, 41200, PayIntPartner; PayPartner, PayAdmin)"}},"securedLocationUID":"demo_lock"},{"id":"efb3524bd79901cc1596170dae009406","descriptor":"2019-10-22T05:40:58.018[TZ005] - Access Granted","accessDeviceUID":"276289070252","accessGranted":true,"accessMoment":"2019-10-22T12:40:58.018Z","securedLocation":{"id":"efb3524bd7990149ae09d45f1200b401","descriptor":"Demo Lock","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/securedLocations/efb3524bd7990149ae09d45f1200b401","securedLocationUID":"demo_lock","accessibleByPerson":[{"id":"9e74f2aa5d70488d88a739d799bcc9ab","descriptor":"Betty Liu (manager 4300, CostCtrMgr 30.3, 41200, PayIntPartner; PayPartner, PayAdmin)"},{"id":"2eb21d19e0a110106352191d4457015c","descriptor":"Richard Flanagan"},{"id":"dc5359499a640152d563d158a93fbc00","descriptor":"Dean Flood"}],"securedLocationName":"Demo Lock"},"locationAccessDevice":{"id":"efb3524bd79901ec7f7d0a481200b101","descriptor":"keycard","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/locationAccessDevices/efb3524bd79901ec7f7d0a481200b101","locationAccessDeviceUID":"276289070252","ownedByPerson":{"id":"9e74f2aa5d70488d88a739d799bcc9ab","descriptor":"Betty Liu (manager 4300, CostCtrMgr 30.3, 41200, PayIntPartner; PayPartner, PayAdmin)"},"locationAccessDeviceName":"keycard"},"securedLocationUID":"demo_lock"},{"id":"efb3524bd79901c4a0a81a11ae009606","descriptor":"2019-10-22T05:41:15.249[TZ005] - Access Granted","accessDeviceUID":"276289070252","accessGranted":true,"accessMoment":"2019-10-22T12:41:15.249Z","securedLocation":{"id":"efb3524bd7990149ae09d45f1200b401","descriptor":"Demo Lock","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/securedLocations/efb3524bd7990149ae09d45f1200b401","securedLocationName":"Demo Lock","securedLocationUID":"demo_lock","accessibleByPerson":[{"id":"9e74f2aa5d70488d88a739d799bcc9ab","descriptor":"Betty Liu (manager 4300, CostCtrMgr 30.3, 41200, PayIntPartner; PayPartner, PayAdmin)"},{"id":"2eb21d19e0a110106352191d4457015c","descriptor":"Richard Flanagan"},{"id":"dc5359499a640152d563d158a93fbc00","descriptor":"Dean Flood"}]},"locationAccessDevice":{"id":"efb3524bd79901ec7f7d0a481200b101","descriptor":"keycard","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/locationAccessDevices/efb3524bd79901ec7f7d0a481200b101","locationAccessDeviceName":"keycard","ownedByPerson":{"id":"9e74f2aa5d70488d88a739d799bcc9ab","descriptor":"Betty Liu (manager 4300, CostCtrMgr 30.3, 41200, PayIntPartner; PayPartner, PayAdmin)"},"locationAccessDeviceUID":"276289070252"},"securedLocationUID":"demo_lock"},{"id":"efb3524bd79901a51f912915ae009806","descriptor":"2019-10-22T05:41:32.680[TZ005] - Access Granted","accessDeviceUID":"276289070252","accessGranted":true,"accessMoment":"2019-10-22T12:41:32.680Z","securedLocation":{"id":"efb3524bd7990149ae09d45f1200b401","descriptor":"Demo Lock","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/securedLocations/efb3524bd7990149ae09d45f1200b401","securedLocationName":"Demo Lock","securedLocationUID":"demo_lock","accessibleByPerson":[{"id":"9e74f2aa5d70488d88a739d799bcc9ab","descriptor":"Betty Liu (manager 4300, CostCtrMgr 30.3, 41200, PayIntPartner; PayPartner, PayAdmin)"},{"id":"2eb21d19e0a110106352191d4457015c","descriptor":"Richard Flanagan"},{"id":"dc5359499a640152d563d158a93fbc00","descriptor":"Dean Flood"}]},"locationAccessDevice":{"id":"efb3524bd79901ec7f7d0a481200b101","descriptor":"keycard","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/locationAccessDevices/efb3524bd79901ec7f7d0a481200b101","locationAccessDeviceUID":"276289070252","ownedByPerson":{"id":"9e74f2aa5d70488d88a739d799bcc9ab","descriptor":"Betty Liu (manager 4300, CostCtrMgr 30.3, 41200, PayIntPartner; PayPartner, PayAdmin)"},"locationAccessDeviceName":"keycard"},"securedLocationUID":"demo_lock"},{"id":"efb3524bd799017e84675117ae009a06","descriptor":"2019-10-22T05:41:41.938[TZ005] - Process Denied","accessDeviceUID":"838430061525","accessGranted":false,"accessMoment":"2019-10-22T12:41:41.938Z","securedLocation":{"id":"efb3524bd7990149ae09d45f1200b401","descriptor":"Demo Lock","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/securedLocations/efb3524bd7990149ae09d45f1200b401","securedLocationName":"Demo Lock","securedLocationUID":"demo_lock","accessibleByPerson":[{"id":"9e74f2aa5d70488d88a739d799bcc9ab","descriptor":"Betty Liu (manager 4300, CostCtrMgr 30.3, 41200, PayIntPartner; PayPartner, PayAdmin)"},{"id":"2eb21d19e0a110106352191d4457015c","descriptor":"Richard Flanagan"},{"id":"dc5359499a640152d563d158a93fbc00","descriptor":"Dean Flood"}]},"locationAccessDevice":{"id":"efb3524bd799017f8724dca062004904","descriptor":"keychain","href":"https://i-092927d2dad9b747b.workdaysuv.com/ccx/api/locationSecurity/v1Alpha/super/locationAccessDevices/efb3524bd799017f8724dca062004904","locationAccessDeviceUID":"838430061525","ownedByPerson":{"id":"1386aa4fcca4100044225144a1630f99","descriptor":"Seth Jones"},"locationAccessDeviceName":"keychain"},"securedLocationUID":"demo_lock"}]}

	var accessLog = accessLogResponse.data

	//console.log(accessLogResponse.data);

	$(".access-log-body").empty();


	for(var i in accessLog) {
		var username = accessLog[i].locationAccessDevice.ownedByPerson.descriptor;
		var device = accessLog[i].locationAccessDevice.descriptor;
		var status = accessLog[i].accessGranted;
		var timestamp = accessLog[i].accessMoment;
		
		


		$(".access-log-body").append(`

			<tr class='access-log-row'>
				<td>` + username + `</td>
				<td>` + device + `</td>
				<td>` + status + `</td>
				<td>` + timestamp + `</td>
			</tr>

			`)
	}	

}

displayConfigResponse();
displayAccessLogResponse();


