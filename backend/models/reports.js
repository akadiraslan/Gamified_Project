class Report {
    constructor(id, user_id, test_id, score, test_name) {
            this.id = id;
            this.user_id = user_id;
            this.test_id = test_id;
            this.score = score;
            this.test_name = test_name;
    }
}

module.exports = Report;