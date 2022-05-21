const swaggerAutogen = require("swagger-autogen")();

const doc = {
	info: {
		title: "Recipe Book API",
		description: "Recipe Book API",
	},
	host: "localhost:3000",
	schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js", "./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
