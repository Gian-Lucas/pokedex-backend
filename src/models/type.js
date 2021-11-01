const mongoose = require("../database/index.js");

const TypeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  double_damage_from: {
    type: Array,
  },
  double_damage_to: {
    type: Array,
  },
  half_damage_from: {
    type: Array,
  },
  half_damage_to: {
    type: Array,
  },
});

const Type = mongoose.model("Type", TypeSchema);

module.exports = Type;
