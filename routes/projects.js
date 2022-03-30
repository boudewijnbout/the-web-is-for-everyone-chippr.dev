const express = require("express");
const router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Overview page with all projects data
router.get("/", (req, res) => {
  getApiData("https://chipr.api.fdnd.nl/v1/project").then(function (jsonData) {
    res.render("index", {
      projects: jsonData.data,
    });
  });
});

// Get specific project data according to ID
router.get("/:id", (req, res) => {
  getApiData(`https://chipr.api.fdnd.nl/v1/project/${req.params.id}`).then(
    function (jsonData) {
      res.render("detail", {
        project: jsonData.data[0],
      });
    }
  );
});

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function getApiData(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
}

module.exports = router;
