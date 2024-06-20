const express = require("express");
const router = express.Router();
const { BlogModel } = require("../models/BlogModel");

router.get("/", async (request, response, next) => {
  let result = await BlogModel.find({}).exec();

  response.json({
    message: "Blog router homepage",
    result: result,
  });
});

router.get("/:id", async (request, response, next) => {
  let result = await BlogModel.find({}).exec();
  response.json({
    message: "Blog router homepage",
    content: result,
  });
});
router.post("/", (request, response, next) => {
  response.json({
    message: "Blog router homepage",
  });
});
router.put("/", (request, response, next) => {
  response.json({
    message: "Blog router homepage",
  });
});
router.delete("/", (request, response, next) => {
  response.json({
    message: "Blog router homepage",
  });
});
module.exports = router;
