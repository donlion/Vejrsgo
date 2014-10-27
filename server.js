var http = require("http"),
		fs = require("fs"),
		url = require("url"),
		path = require("path");

var options = {
	host: "0.0.0.0",
	port: 8004
};


var extArray = {
	"html": "text/html",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "png": "image/png",
  "js": "text/javascript",
  "css": "text/css"
};




var server = http.createServer(function(req, res) {

	Debug.enabled = true;

	console.log("Interaction with server!");

	console.log(new Date().toJSON()+" - Response start");

	var response = {
		code: 404,
		content : [],
		contentType: 'text/html'
	};

	//console.log(url.parse(req.url));

	if (Debug.enabled) {
		Debug.request(req);
	}


	var fileTest = url.parse(req.url).pathname.split("/");

	//console.log("File if: "+fileTest[fileTest.length-1].indexOf(extArray));

	//if (extArray.indexOf(fileTest[fileTest.length-1].substr(1)) > -1) {

	if (path.extname(fileTest[fileTest.length-1])) {

		var filePath = path.join(__dirname, url.parse(req.url).pathname.substr(1));

		if (Debug.enabled) {
			console.log("Through file if");
			console.log("Reading "+filePath);
		}

		fs.readFile(filePath, function(err, data) {
			if (err) {
				console.error("Something went wrong reading files!");
				console.error(err);
			} else {

				response.contentType = extArray[path.extname(fileTest[fileTest.length-1].substr(1))];

				response.content.push(data);

				endResponse();

			}

		});

	} else {


		if (req.method == "POST") {

			response.content.push(
				"POST succeeded!"
			);

		} else {

			/*response.content.push(
				"<form action='/' method='POST'>",
				"<input type='submit' value='Send' />",
				"</form>"
			);*/

			var cards = {"cards": [
				"1": {
					"city": "Roskilde",
					"size": "large-8"
				},
				"2": {
					"city": "Paris",
					"size": "large-4"
				},
				"3": {
					"city": "København",
					"size": "large-12"
				}
			]};

			response.content.push(
				JSON.stringify(cards)
			);
			response.contentType = "application/JSON";
			response.code = 200;

		}

		endResponse();

	}


	res.on("data", function(data) {
		console.log("Response data");
	});

	res.on("end", function() {
		console.log("Response end");
	});

	req.on("end", function() {
		console.log(new Date().toJSON()+" - Response end");
		console.log("\n");
	});
	
	function endResponse() {
		res.writeHead(response.code,
			{
				"Content-Type": response.contentType,
				"Access-Control-Allow-Origin": "*"
			}
		);

		res.write(response.content.join(""));
		res.end();
	}

});

server.on("listening", function() {
	console.log("Server is running on "+options.host+":"+options.port);
});

server.listen(options.port, options.host);






var Debug = {

	enabled: false,

	request: function(e) {

		console.log(e.url);

	}

}

