const swaggerAutogen = require("swagger-autogen")();

const doc = {
	info: {
		title: "Recipe Book API",
		description: "Recipe Book API",
	},
	host: "recipe-book-00.herokuapp.com",
	schemes: ["https"],
	securityDefinitions: {
		oAuthSample: {
			type: "oauth2",
			authorizationUrl: "https://recipe-book-00.herokuapp.com/oauth/authorize",
			flow: "implicit",
			scopes: {
				read_recipes: "read your recipes",
				write_recipes: "modify recipes in your account",
			},
		},
	},
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js", "./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
