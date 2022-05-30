class User {
    constructor(id, email, username, password, biography, register_date, total_score) {
            this.id = id;
            this.email = email;
            this.username = username;
            this.password = password;
            this.biography = biography;
            this.register_date = register_date;
            this.total_score = total_score;
    }
}

module.exports = User;