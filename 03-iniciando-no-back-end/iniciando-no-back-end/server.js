const express = require("express");
const nunjucks = require("nunjucks");

const server = express();
const videos = require("./data");

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
});

server.get("/", function (req, res) {
    const about = {
        avatar_url: "https://avatars1.githubusercontent.com/u/65625500?s=400&u=eb9e300de61698fc8531949a451ce2f0e9da46f9&v=4",
        name: "Emanuel Massafera",
        role: "Futuro Full Stack Developer",
        description: 'Estudando programação web pela <a href="https://rocketseat.com.br" target="_blank" > Rocketseat</a>',
        links: [
            { name: "Github", url: "https://www.github.com/emanuelmassafera/" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/emanuelmassafera/" }
        ]
    };

    return res.render("about", { about });
});

server.get("/portfolio", function (req, res) {
    return res.render("portfolio", { items: videos });
});

server.get("/video", function (req, res) {
    const id = req.query.id;
    const video = videos.find(function (video) {

        return video.id == id;
    });

    if (!video) {
        return res.send("Video not found!");
    }

    return res.render("video", { item: video });
});

server.listen(5000, function () {
    console.log("Server is running");
});