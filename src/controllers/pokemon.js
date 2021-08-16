const express = require("express");
const Pokemon = require("../models/pokemon");
const route = express.Router();

route.get("/pokemon/all", async (req, res) => {
  try {
    const result = await Pokemon.find();
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "loading pokemon failed" });
  }
});

route.get("/pokemon/:param", async (req, res) => {
  try {
    const param = req.params.param;
    if (Number(param)) {
      const pokemon = await Pokemon.find({ id: param });
      return res.json(pokemon);
    } else {
      const pokemon = await Pokemon.find({ name: param });
      return res.json(pokemon);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "loading pokemon failed" });
  }
});

module.exports = route;
