const routes = require("express").Router();
const {
	body,
	validationResult,
	check,
	checkSchema,
} = require("express-validator");
const swaggerAutogen = require("swagger-autogen");
const connect = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// Get all recipes

routes.get("/", (req, res) => {
	/* #swaggerAutogen.security = [
		{
			oAuthSample: ["write_recipes", "read_recipes"],
		},
	]; */
	const results = connect.getCollection().find();
	results.toArray().then((documents) => {
		res.status(200).json(documents);
		console.log("Returned all recipes");
	});
});

// Get a recipe by ID

routes.get("/:id", body("id").not().isEmpty().trim(), (req, res) => {
	const recipeId = new ObjectId(req.params.id);
	const results = connect.getCollection().find({ _id: recipeId });

	results.toArray().then((documents) => {
		res.status(200).json(documents[0]);
		console.log(`Returned Recipe ${req.params.id}`);
	});
});

// create a new recipe

routes.post(
	"/",
	check("name")
		.isLength({ min: 5 })
		.withMessage("Name must be longer than 5 characters"),
	(req, res) => {
		const recipe = {
			name: req.body.name,
			ingredients: req.body.ingredients,
			steps: req.body.steps,
		};

		console.log(req.body);

		const response = connect.getCollection().insertOne(recipe);
		if (response) {
			res.status(201).json("Recipe created successfully");
		} else {
			res.status(500).json("Some error occurred while creating the recipe");
		}
	}
);

// PUT (update) recipe by id

routes.put("/:id", body("id").not().isEmpty().trim(), (req, res) => {
	const id = new ObjectId(req.params.id);

	const recipe = {
		name: req.body.name,
		ingredients: req.body.ingredients,
		steps: req.body.steps,
	};

	const response = connect.getCollection().replaceOne({ _id: id }, recipe);
	if (response) {
		res.status(204).send();
	} else {
		res
			.status(500)
			.json(response.error || "Some error occurred while updating the recipe.");
	}
});

// DELETE recipe by id

routes.delete("/:id", body("id").not().isEmpty().trim(), (req, res) => {
	const id = new ObjectId(req.params.id);
	const response = connect.getCollection().deleteOne({ _id: id });
	if (response) {
		res.status(204).send();
	} else {
		res
			.status(500)
			.json(response.error || "Some error occurred while deleting the recipe");
	}
});

module.exports = routes;
