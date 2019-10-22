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
        backgroundColor: 0xecf0f1
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

const  doors = [
    { 'x' : 655, 'y': 425, 'name' : 'Entrance', 'id': '1', 'angle': 0 },
    { 'x' : 340, 'y': 375, 'name' : 'Bathroom', 'id': '2', 'angle': 0 },
    { 'x' : 550, 'y': 310, 'name' : 'Office', 'id': '3', 'angle': Math.PI * 0.5  },
    { 'x' : 830, 'y': 210, 'name' : 'Server Room', 'id': 'efb3524bd7990149ae09d45f1200b401', 'angle': Math.PI  }

];

doors.forEach((data) => {
    const door = PIXI.Sprite.from('https://raw.githubusercontent.com/DonValino/Hackaton/master/Door.png');
    door.name = data.name;
    door.id = data.id;
    door.anchor.set(0.0);
    door.x = data.x;
    door.y = data.y;
    door.scale.x += .5;
    door.rotation = data.angle;
    door.interactive = true;
    door.buttonMode = true;
    door.on('pointerdown', onClickDoor);
    app.stage.addChild(door);

})


//############################ On Click Handlers  ##########################################
function onClickDoor(doorData){
    var data = doorData.currentTarget;
    updateConfigDetails(data.id);
    updateAccessDetails(data.id);
}
function updateConfigDetails(doorId){
    var apiUrl = "http://localhost:3000/securedLocations/" + doorId
    var settings = {
      "crossDomain": true,
      "url": apiUrl,
      "method": "GET",
    }
    $.ajax(settings).done(function (response) {
      displayConfigResponse(response);
    });
}
function updateAccessDetails(doorId){
    var apiUrl = "http://localhost:3000/locationAccessRequests/"
    var settings = {
      "crossDomain": true,
      "url": apiUrl,
      "method": "GET",
    }
    $.ajax(settings).done(function (response) {
      displayAccessLogResponse(doorId, response);
    });
}
function displayConfigResponse(configResponse){
    console.log(configResponse)
    
    var returnedDoorName = configResponse.securedLocationName;
    var returnedDoorUID = configResponse.securedLocationUID;
    var returnedDoorAccessList = configResponse.accessibleByPerson;
    var title = document.getElementById("config-title");
    var name = document.getElementById("location-name");
    var id = document.getElementById("location-id");
    title.innerHTML = returnedDoorName;
    name.innerHTML = returnedDoorName;
    id.innerHTML = returnedDoorUID;
    $(".access-list").empty();
    for(var i in returnedDoorAccessList) {
        var userName = (returnedDoorAccessList[i].descriptor)
        $(".access-list").append("<li class='access-list-value'>" + userName + "</li>");
    }
    
}
function displayAccessLogResponse(doorId, accessLogResponse) {
    var accessLog = accessLogResponse.data.filter((v, i ,a) => { return  (v != null) && (v.securedLocation != null) && v.securedLocation.id == doorId  })
    var totalGranted = accessLog.reduce((total, e) => { return total + (e.accessGranted ? 1 : 0) }, 0);
    var totalDenied = accessLog.reduce((total, e) => { return total + (e.accessGranted ? 0 : 1) }, 0);
    
    // console.log("Total Granted: " + totalGranted);
    // console.log("Total Denied: " + totalDenied);
	// console.log(accessLog)

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

        $(".granted").text("Total Granted: " + totalGranted);
        $(".denied").text("Total Denied: " + totalDenied);

    }   
    
}
