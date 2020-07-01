module.exports = {
    graduation: function (option) {
        if (option === "medio") {
            return "Ensino Médio Completo";
        } else if (option === "superior") {
            return "Ensino Superior Completo";
        } else if (option === "mestrado") {
            return "Mestrado";
        } else {
            return "Doutorado";
        }
    },

    age: function age(timestamp) {
        const today = new Date();
        const birthDate = new Date(timestamp);

        let age = today.getFullYear() - birthDate.getFullYear();

        const month = today.getMonth() - birthDate.getMonth();

        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1;
        }

        return age;
    },

    date: function date(timestamp) {
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        };
    },

    grade: function grade(initials) {
        switch (initials) {
            case "5F":
                return "5º ano do Ensino Fundamental";
                break;
            case "6F":
                return "6º ano do Ensino Fundamental";
                break;
            case "7F":
                return "7º ano do Ensino Fundamental";
                break;
            case "8F":
                return "8º ano do Ensino Fundamental";
                break;
            case "9F":
                return "9º ano do Ensino Fundamental";
                break;
            case "1M":
                return "1º ano do Ensino Médio";
                break;
            case "2M":
                return "2º ano do Ensino Médio";
                break;
            case "3M":
                return "3º ano do Ensino Médio";
                break;
        }
    }
}