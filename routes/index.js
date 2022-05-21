const routes = require("express").Router();

routes.get("/", (req, res) => {
	res.send("Cody Mickelsen");
});

routes.use("/recipes", require("./recipes"));

module.exports = routes;
