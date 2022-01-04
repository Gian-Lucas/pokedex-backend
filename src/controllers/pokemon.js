const express = require("express");
const Pokemon = require("../models/pokemon");
const Type = require("../models/type");
const route = express.Router();

route.get("/pokemon/all/:generation", async (req, res) => {
  try {
    const generation = Number(req.params.generation);

    switch (generation) {
      case 1:
        getByGeneration(1, 151);
        break;
      case 2:
        getByGeneration(152, 251);
        break;
      case 3:
        getByGeneration(252, 386);
        break;
      case 4:
        getByGeneration(387, 493);
        break;
      case 5:
        getByGeneration(494, 649);
        break;
      case 6:
        getByGeneration(650, 721);
        break;
      case 7:
        getByGeneration(722, 809);
        break;
      case 8:
        getByGeneration(810, 898);
        break;

      default:
        return res.json({ error: "generation invalid" });
    }

    async function getByGeneration(first, last) {
      const result = await Pokemon.find();
      const pokemons = result.filter(
        (poke) => poke.id >= first && poke.id <= last
      );
      return res.json(pokemons);
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "loading pokemon failed" });
  }
});

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

    const typesResult = await Type.findOne({ name: pokemon.firstType });

    const types = {
      double_damage_to: typesResult.double_damage_to.map((type) => type.name),
      half_damage_to: typesResult.half_damage_to.map((type) => type.name),
      double_damage_from: typesResult.double_damage_from.map(
        (type) => type.name
      ),
      half_damage_from: typesResult.half_damage_from.map((type) => type.name),
    };
    pokemon.evolutionChain = evolutionChain;
    return res.json({ pokemon, damageRelations: types });
  } catch (error) {
    console.log(error);
    return res.json({ error: "loading pokemon failed" });
  }
});

module.exports = route;
