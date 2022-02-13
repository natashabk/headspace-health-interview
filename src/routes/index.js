const express = require("express");
const router = express.Router();
const articles = require("./articles");
const authors = require("./authors");

router.get("/articles", articles);
router.get("/authors", authors);

module.exports = router;
