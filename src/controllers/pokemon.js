const express = require("express");
const Pokemon = require("../models/pokemon");
const Type = require("../models/type");
const route = express.Router();

route.get("/pokemon/all", async (req, res) => {
  try {
    const result = await Pokemon.find();
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.json({ error: "loading pokemon failed" });
  }
});

route.get("/pokemon/:param", async (req, res) => {
  try {
    const param = req.params.param;

    const pokemon = Number(param)
      ? await Pokemon.findOne({ id: param })
      : await Pokemon.findOne({ name: param });

    const evolutionChain = await Pokemon.find({
      evolutionChain: pokemon.evolutionChain,
    });

    const types = await Type.findOne({ name: pokemon.firstType });

    pokemon.evolutionChain = evolutionChain;
    return res.json({ pokemon, damageRelations: types });
  } catch (error) {
    console.log(error);
    return res.json({ error: "loading pokemon failed" });
  }
});

module.exports = route;
