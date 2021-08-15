const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/pokemon", async (req, res) => {
  return res.send('pokemon');
});

// app.listen(process.env.PORT || 3000);
app.listen(3000);
