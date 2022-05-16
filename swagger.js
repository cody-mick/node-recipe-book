const swaggerAutogen = require("swagger-autogen");

const doc = {
	info: {
		title: "Recipe Book API",
		description: "Recipe Book API",
	},
	host: "",
	schemes: [""],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js", "./routes/index.js"];
