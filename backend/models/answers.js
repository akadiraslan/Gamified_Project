class Answer {
    constructor(id, user_id, question_id, wildcard_id, given_answer, is_correct, used_wildcard) {
            this.id = id;
            this.user_id = user_id;
            this.question_id = question_id;
            this.wildcard_id = wildcard_id;
            this.given_answer = given_answer;
            this.is_correct = is_correct;
            this.used_wildcard = used_wildcard;
    }
}

module.exports = Answer;