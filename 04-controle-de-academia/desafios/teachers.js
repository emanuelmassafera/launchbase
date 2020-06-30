const fs = require("fs");
const data = require("./data.json");
const {graduation, age, date} = require("./utils");
const Intl = require("intl");

// CREATE
exports.post = function (req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Fill in all fields!");
        }
    }

    let { avatar_url, birth, name, schooling, lesson, services } = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.teachers.length + 1);

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        schooling,
        lesson,
        services,
        created_at
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Write file error!");
        }

        return res.redirect("/teachers");
    });
}

// SHOW
exports.show = function (req, res) {
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function (teacher) {
        return teacher.id == id;
    });

    if (!foundTeacher) {
        return res.send("Teacher not found!");
    }

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        schooling: graduation(foundTeacher.schooling),
        services: foundTeacher.services.split(","),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at)
    };

    return res.render("teachers/show", {teacher});
}

// EDIT
exports.edit = function(req, res) {
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function (teacher) {
        return teacher.id == id;
    });

    if (!foundTeacher) {
        return res.send("Teacher not found!");
    }

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    };

    return res.render("teachers/edit", {teacher});
}

// PUT - UPDATE
exports.update = function(req, res) {
    let { id } = req.body;
    id = Number(id);
    let index = 0;

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if (id === teacher.id) {
            index = foundIndex;
            return true;
        }
    });

    if (!foundTeacher) {
        return res.send("Teacher not found!");
    }

    const teacher = {
        ...foundTeacher,
        ...req.body,
        id: id,
        birth: Date.parse(req.body.birth)
    };

    data.teachers[index] = teacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("Write file error!");
        }

        return res.redirect(`/teachers/${id}`);
    });
}

// DELETE
exports.delete = function(req, res) {
    let { id } = req.body;
    id = Number(id);

    const filteredTeachers = data.teachers.filter(function(teacher) {
        return teacher.id != id;
    });

    data.teachers = filteredTeachers;

    fs.writeFile("data.json", JSON.stringify(data, null, 2 ), function(err) {
        if (err) {
            return res.send("Write file error!");
        }

        return res.redirect("/teachers");
    });
}