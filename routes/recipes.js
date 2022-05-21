const routes = require("express").Router();
const connect = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// Get all recipes

routes.get("/", (req, res) => {
	const results = connect.getCollection().find();
	results.toArray().then((documents) => {
		res.status(200).json(documents);
		console.log("Returned all recipes");
	});
});

// Get a recipe by ID

routes.get("/:id", (req, res) => {
	const recipeId = new ObjectId(req.params.id);
	const results = connect.getCollection().find({ _id: recipeId });

	results.toArray().then((documents) => {
		res.status(200).json(documents[0]);
		console.log(`Returned Recipe ${req.params.id}`);
	});
});

module.exports = routes;
