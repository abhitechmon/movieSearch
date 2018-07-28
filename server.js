const port=process.env.PORT || 3000;
const express=require("express");
const request=require("request");

var app=express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("search");
});

app.get("/results", function(req, res){
	var query=req.query.search;
	var url="http://www.omdbapi.com/?s="+query+"&apikey=thewdb";			//dynamic url

	request(url, function(error, response, body){
			if(!error && response.statusCode==200){
				var data=JSON.parse(body);			//turning string to javascript object
				res.render("results", {data: data});
			}
	});
});

app.listen(port, function(){
	console.log("Movie finding server has started!!");
});