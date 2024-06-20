const express = require("express");
const app = express();

// Allows Post requests to have JSON Body Content
app.use(express.json());

// Home Route
app.get("/", (request, response, next) => {
  response.json({
    message: "Hello World",
  });
});

// Blog Page Routes
const blogRouter = require("./controllers/BlogRouter.js");
app.use("/blogs", blogRouter);

// 404 Handling Route
app.get("*", (request, response, next) => {
  response.status(404).json({
    message: "404 Page Not Found!",
  });
});

// Error Handling Route
app.use((error, request, response, next) => {
  response.json({
    message: "Error occured",
    error: error.message,
  });
});

module.exports = {
  app,
};
