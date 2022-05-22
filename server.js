const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connect = require("./db/connect");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUi.serve);
app.use("/api-docs", swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Z-Key, Content-Disposition"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	next();
});

// configure body parser
let bodyParser = require("body-parser");
app.use(bodyParser.json());

connect.initDatabase();

app.use("/", require("./routes"));

app.listen(port, () => {
	console.log(`Running on port ${port}`);
});
