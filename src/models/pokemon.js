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
  spriteOfficialArtwork: {
      type: String,
      require: true,
  },
  spriteDreamWorld: {
      type: String,
      require: true,
  },
  pokemonGif: {
      type: String,
      require: true,
  },
  hp: {
      type: Number,
      require: true,
  },
  weight: {
      type: Number,
      require: true,
  },
  height: {
      type: Number,
      require: true,
  },
  type01: {
      type: String,
      require: true,
  },
  type02: {
      type: String,
  },
});

const Pokemon = mongoose.model("Pokemon", PokeSchema);

module.exports = Pokemon;
