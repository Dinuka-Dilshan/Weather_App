 const express = require("express");
 const bodyParser = require("body-parser");
 const https = require("https");
 const app = express();
 app.use(express.json());
 app.use(express.urlencoded({
  extended: true
}));
 app.use(express.static("public"));

 app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
    
 })

 app.post("/",function(req, res){
    const city = req.body.cityName.trim();
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=0ea54ab398ca544d55c4f35459fa1254&units=metric";

    https.get(url, function(response){
        response.on("data",function(data){
            const whetherData = (JSON.parse(data));
            try{
                const temparature = whetherData.main.temp;
                const description = whetherData.weather[0].description;
                const icon = whetherData.weather[0].icon;
                const image ="<img src=\"http://openweathermap.org/img/wn/"+icon+"@4x.png\"/>";
                const message = "<h2>Temperature in "+city+" is: "+temparature+" celcious.</h2>";
                const message2 = "<h2>Weather in "+ city+" is :"+ description+"</h2>";
                const messageFinal = "<center>"+message + message2 + image+"</center>";
                res.send(messageFinal);
            } catch(error){
                res.send("<h2>Invalid City name..!</h2>");
            }
            
             
            
        })
    })
 })

 app.listen(process.env.PORT);