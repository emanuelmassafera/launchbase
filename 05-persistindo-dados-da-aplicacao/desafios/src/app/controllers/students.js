const { graduation, age, date, grade } = require("../../lib/utils");
const Intl = require("intl");
const Student = require("../models/Student");


module.exports = {
    index(req, res) {
        Student.all(function (students) {
            return res.render("students/index", { students });
        });
    },

    create(req, res) {
        return res.render("students/create");
    },

    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Fill in all fields!");
            }
        }

        Student.create(req.body, function (student) {
            return res.redirect(`/students/${student.id}`);
        });
    },

    show(req, res) {
        Student.find(req.params.id, function (student) {
            if (!student) return res.send("Student not found!");

            student.birth = date(student.birth).birthDay;
            student.year = grade(student.year);

            return res.render("students/show", { student });
        });
    },

    edit(req, res) {
        Student.find(req.params.id, function (student) {
            if (!student) return res.send("Student not found!");

            student.birth = date(student.birth).iso;

            return res.render("students/edit", { student });
        });
    },

    update(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Fill in all fields!");
            }
        }

        Student.update(req.body, function () {
            return res.redirect(`/students/${req.body.id}`);
        });
    },

    delete(req, res) {
        Student.delete(req.body.id, function () {
            return res.redirect("/students");
        });
    }
}
