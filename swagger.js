const swaggerAutogen = require("swagger-autogen")();

const doc = {
	info: {
		title: "Recipe Book API",
		description: "Recipe Book API",
	},
	host: "https://recipe-book-00.herokuapp.com",
	schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js", "./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
