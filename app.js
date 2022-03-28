const app = express();
const port = 3000;

// Imports
import express from "express";
import fetch from "node-fetch";

app.use(express.static("public"));
app.set("view engine", "ejs");

// Overview page
app.get("/", (req, res) => {
  fetch("https://chipr.api.fdnd.nl/v1/project")
    .then((res) => res.json())
    .then((data) => {
      res.render("index", { data: data.data });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
