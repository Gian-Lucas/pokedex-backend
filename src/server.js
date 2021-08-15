const express = require("express");
const cors = require("cors");
const pokemon = require("./controllers/pokemon");
const app = express();

app.use(cors());
app.use(express.json());

app.use(pokemon);

app.listen(process.env.PORT || 3000);
