const express = require("express");
const nunjucks = require("nunjucks");
const routes = require("./routes");
const methodOverride = require("method-override");

const server = express();

server.use(express.static("public"));
server.use(express.urlencoded({ extended: true })); // Faz o req.body funcionar
server.use(methodOverride("_method"));
server.use(routes);

server.set("view engine", "njk");

nunjucks.configure("src/app/views", {
    express: server,
    autoescape: false,
    noCache: true
});

server.listen(5002, function () {
    console.log("Server is running");
});