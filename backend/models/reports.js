class Report {
    constructor(id, user_id, topic_id, user_topic_score) {
            this.id = id;
            this.user_id = user_id;
            this.topic_id = topic_id;
            this.user_topic_score = user_topic_score;
    }
}

module.exports = Report;