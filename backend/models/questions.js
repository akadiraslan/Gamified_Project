class Question {
    constructor(id, topic_id, topic_name, question_body, question_options, correct_option) {
            this.id = id;
            this.topic_id = topic_id;
            this.topic_name = topic_name;
            this.question_body = question_body;
            this.question_options = question_options;
            this.correct_option = correct_option;
    }
}

module.exports = Question;