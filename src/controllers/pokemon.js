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
    if (Number(param)) {
      const pokemon = await Pokemon.findOne({ id: param });
      const evolutionChain = await Pokemon.find({
        evolutionChain: pokemon.evolutionChain,
      });

      const types = await Type.findOne({ name: pokemon.firstType });

      pokemon.evolutionChain = evolutionChain;
      return res.json({ pokemon, damageRelations: types });
    } else {
      const pokemon = await Pokemon.findOne({ name: param });
      const evolutionChain = await Pokemon.find({
        evolutionChain: pokemon.evolutionChain,
      });

      const typesFirst = await Type.findOne({ name: pokemon.firstType });

      if (pokemon.secondType) {
        const typesSecond = await Type.findOne({ name: pokemon.secondType });

        const typesAll = {
          double_damage_from: typesFirst.double_damage_from.concat(
            typesSecond.double_damage_from
          ),
          double_damage_to: typesFirst.double_damage_to.concat(
            typesSecond.double_damage_to
          ),
          half_damage_from: typesFirst.half_damage_from.concat(
            typesSecond.half_damage_from
          ),
          half_damage_to: typesFirst.half_damage_to.concat(
            typesSecond.half_damage_to
          ),
        };

        // função para remover types repetidos
        function removeTypesRepeated(typesArray) {
          const newTypesArray = (typesArray = typesArray.map(
            (type) => type.name
          ));

          return [...new Set(newTypesArray)];
        }

        // Removendo types repetidos
        typesAll.half_damage_to = removeTypesRepeated(typesAll.half_damage_to);
        typesAll.half_damage_from = removeTypesRepeated(
          typesAll.half_damage_from
        );
        typesAll.double_damage_from = removeTypesRepeated(
          typesAll.double_damage_from
        );
        typesAll.double_damage_to = removeTypesRepeated(
          typesAll.double_damage_to
        );

        pokemon.evolutionChain = evolutionChain;
        return res.json({ pokemon, damageRelations: typesAll });
      }

      pokemon.evolutionChain = evolutionChain;
      return res.json({ pokemon, damageRelations: typesFirst });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "loading pokemon failed" });
  }
});

module.exports = route;
