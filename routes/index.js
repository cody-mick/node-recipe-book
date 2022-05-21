const routes = require("express").Router();

routes.get("/", (req, res) => {
	res.send("Cody Mickelsen");
});

module.exports = routes;
