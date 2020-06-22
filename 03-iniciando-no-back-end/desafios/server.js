const express = require("express");
const nunjucks = require("nunjucks");

const server = express();
const courses = require("./data");

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false
});

server.get("/about", function (req, res) {
    const about = {
        img: "https://avatars0.githubusercontent.com/u/28929274?s=200&v=4",
        name: "Rocketseat",
        description: "As melhores tecnologias em programação, direto ao ponto e do jeito certo",
        list: ["JavaScript", "NodeJS", "ReactJS", "React Native"],
        links: [
            { name: "Github", url: "https://github.com/rocketseat/" },
            { name: "Instagram", url: "https://www.instagram.com/rocketseat_oficial/" },
            { name: "Facebook", url: "https://www.facebook.com/rocketseat/" }
        ]
    };

    return res.render("about", { about });
});

server.get("/courses", function (req, res) {
    return res.render("courses", { items: courses });
});

server.get("/courses/:id", function (req, res) {
    const route = req.params.id;
    const id = route.substring(1);

    const course = courses.find(function (course) {
        return course.id == id;
    });

    if (!course) {
        return res.send(`Course not found!. O id fornecido na rota é: ${id}`);
    }

    return res.render("course-description", { item: course });
});

server.use(function (req, res) {
    res.status(404).render("not-found");
});

server.listen(5501, function () {
    console.log("Server is running");
});