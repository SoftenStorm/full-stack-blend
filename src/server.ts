import * as SocketIO from "socket.io";
import fs from "fs";
import dotenv from "dotenv";

import app from "./app";

let socket = null;
let server = null;

if (["development", "staging", "production"].indexOf(process.env.NODE_ENV) == -1) {
  dotenv.config();
}

if (["development", "staging", "production"].indexOf(process.env.NODE_ENV) == -1) {
  const https = require("https");
  
  // Development SSL
  const sslkey = fs.readFileSync("localhost.key");
  const sslcert = fs.readFileSync("localhost.crt");
  const options = {
      key: sslkey,
      cert: sslcert
  };
  
  server = https.createServer(options, app).listen(443);
	socket = SocketIO.listen(server);
} else {
	const http = require("http");
	
	// [TODO] Replace and configure production SSL
  server = http.createServer(app).listen(process.env.PORT || 8000);
	socket = SocketIO.listen(server);
}

// StackBlend routes
// 
import * as endpoint from "./controllers/Endpoint";

try {
	const route = require("./route");
	route.default(app);
} catch (error) {
	console.log("\x1b[31m", error, "\x1b[0m");
	endpoint.addRecentError(error);
}

// StackBlend test console
// 
if (["production"].indexOf(process.env.NODE_ENV) == -1) {
	const controller = require("./controllers/components/Test");

	app.get("/test/api", controller.index);
	app.post("/test/api", controller.index);
	app.put("/test/api", controller.index);
	app.delete("/test/api", controller.index);
}

export {server, socket};
