var express = require('express')
const request = require('request');


var app = express()
app.use('/js', express.static('js'))
app.use('/images', express.static('images'))
app.use('/css', express.static('css'))


const port = 3000


var suv = "https://i-092927d2dad9b747b.workdaysuv.com"
var user = "NWY2ODdiMWItNWY0Zi00NzJlLWE0MGEtMmYxYjU0ZTg0MDc2"
var pass = "eav4np8nv84m5lt3ic9czsqbmmyrmwgfy2t091aanhx0hqqnybem0irehhbxjyaaddp8t1af9bvm6it28du9s74b8oz7mm2zvs8"
var token = "7kgibk50ygc6404glmaov9s7k";
let pass64 = new Buffer.from(user+":"+pass).toString('base64');






var securedLocationsById = function(doorId) {
    console.log("Requesting all Locations " + token);
    const requestLocation= {
        url: suv + '/ccx/api/locationSecurity/v1Alpha/super/securedLocations/' + doorId,
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token  }
    };
    return new Promise((resolve, reject) => {
        request(requestLocation, function(err, res, body) {
            let json = JSON.parse(body);
            console.log(json)
            if ("Invalid access token.".localeCompare(json.error) == 0) {
                reject(json)
            }
            else  {
                resolve(json);
            }
        });

    })
}

var locationAccessRequests = function() {
    console.log("Requesting all AccessRequests " + token);
    const requestLocation= {
        url: suv + '/ccx/api/locationSecurity/v1Alpha/super/locationAccessRequests/',
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token  }
    };
    return new Promise((resolve, reject) => {
        request(requestLocation, function(err, res, body) {
            let json = JSON.parse(body);
            console.log(json)
            if ("Invalid access token.".localeCompare(json.error) == 0) {
                reject(json)
            }
            else  {
                resolve(json);
            }
        });

    })
}





// respond with "hello world" when a GET request is made to the homepage




app.get('/securedLocations/:doorId', async function (req, res) {
    try {
        json = await securedLocationsById(req.params.doorId);
        res.json(json);
    } catch (e) {
        res.json(e);
  }
});

app.get('/locationAccessRequests', async function (req, res) {
    try {
        json = await locationAccessRequests();
        res.json(json);
    } catch (e) {
        res.json(e);
  }
});


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})












app.listen(port, () => console.log(`Example app listening on port ${port}!`))
