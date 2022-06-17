const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connect = require("./db/connect");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUi.serve);
app.use("/api-docs", swaggerUi.setup(swaggerDocument));

// configure body parser
let bodyParser = require("body-parser");
app.use(bodyParser.json());

connect.initDatabase();

app.use("/", require("./routes"));

app.listen(port, () => {
	console.log(`Running on port ${port}`);
});
