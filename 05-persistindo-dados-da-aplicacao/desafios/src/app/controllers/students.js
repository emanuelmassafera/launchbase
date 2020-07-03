const fs = require("fs");
const data = require("../../../data.json");
const {date, grade} = require("../../lib/utils");


module.exports = {
    index(req, res) {
        let students = [];
    
        for (student of data.students) {
            let year = grade(student.year);
    
            students.push({
                ...student,
                year: year
            });
        }
        return res.render("students/index", { students });
    },

    create(req, res){
        return res.render("students/create");
    },

    post(req, res) {
        const keys = Object.keys(req.body);
    
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Fill in all fields!");
            }
        }
    
        const birth = Date.parse(req.body.birth);
    
        let id = 1;
        const lastStudent = data.students[data.students.length - 1];
    
        if (lastStudent) {
            id = lastStudent.id + 1;
        }
    
        data.students.push({
            id,
            ...req.body,
            birth
        });
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
            if (err) {
                return res.send("Write file error!");
            }
    
            return res.redirect(`/students`);
        });
    },

    show(req, res) {
        const { id } = req.params;
    
        const foundStudent = data.students.find(function (student) {
            return student.id == id;
        });
    
        if (!foundStudent) {
            return res.send("Student not found!");
        }
    
        const student = {
            ...foundStudent,
            birth: date(foundStudent.birth).birthDay,
            year: grade(foundStudent.year)
        };
    
        return res.render("students/show", {student});
    },

    edit(req, res) {
        const { id } = req.params;
    
        const foundStudent = data.students.find(function (student) {
            return student.id == id;
        });
    
        if (!foundStudent) {
            return res.send("Student not found!");
        }
    
        const student = {
            ...foundStudent,
            birth: date(foundStudent.birth).iso
        };
    
        return res.render("students/edit", {student});
    },

    update(req, res) {
        let { id } = req.body;
        id = Number(id);
        let index = 0;
    
        const foundStudent = data.students.find(function(student, foundIndex) {
            if (id === student.id) {
                index = foundIndex;
                return true;
            }
        });
    
        if (!foundStudent) {
            return res.send("Student not found!");
        }
    
        const student = {
            ...foundStudent,
            ...req.body,
            id: id,
            birth: Date.parse(req.body.birth)
        };
    
        data.students[index] = student;
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
            if (err) {
                return res.send("Write file error!");
            }
    
            return res.redirect(`/students/${id}`);
        });
    },

    delete(req, res) {
        let { id } = req.body;
        id = Number(id);
    
        const filteredStudents = data.students.filter(function(student) {
            return student.id != id;
        });
    
        data.students = filteredStudents;
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2 ), function(err) {
            if (err) {
                return res.send("Write file error!");
            }
    
            return res.redirect("/students");
        });
    }
}
