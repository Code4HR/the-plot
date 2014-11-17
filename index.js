var http = require("http"),
	url = require("url"),
	path = require("path"),
	fs = require("fs");

http.createServer(function(request, response) {
	var uri = url.parse(request.url).pathname
	, filename = path.join(process.cwd(), uri);

	fs.exists(filename, function(exists) {

		try{
			if (fs.statSync(filename).isDirectory()) filename += '/index.html';

			fs.readFile(filename, "binary", function(err, file) {
				response.writeHead(200);
				response.write(file, "binary");
				response.end();
			});
		} catch(e) {
			console.log(e);
		}
	});
}).listen(8888);

console.log("Static file server running");
