
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    var cityName = req.body.city;
    var apiKey = "21afcceed45dff6d348d0555ddc0d1e5";
    var unit = "metric";
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=" + unit;
https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
        var weatherData = JSON.parse(data);
        var description = "Weather is currently " + weatherData.weather[0].description;
        var icon = "https://openweathermap.org/img/wn/"+ weatherData.weather[0].icon +"@2x.png";
        res.write("<h1>Weather in " + cityName + " is " + weatherData.main.temp + " degrees celsius.</h1>");
        res.write("<h2>" + description + "</h2>");
        res.write("<img src="+icon+">");
        res.send();
    });
});
});


app.listen(3000, function(){
    console.log("Running");
});