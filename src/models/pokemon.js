const mongoose = require("../database/index.js");

const PokeSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  firstType: {
    type: String,
    require: true,
  },
  secondType: {
    type: String,
  },
  sprite: {
    type: String,
    require: true,
  },
  gameSprite: {
    type: String,
    require: true,
  },
  gameSpriteShiny: {
    type: String,
    require: true,
  },
  evolutionChain: {
    type: Array,
    require: true,
  },
});

const Pokemon = mongoose.model("Pokemon", PokeSchema);

module.exports = Pokemon;
