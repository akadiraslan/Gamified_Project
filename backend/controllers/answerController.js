'use strict';

const firebase = require('../db');
const Answer = require('../models/answers');
const firestore = firebase.firestore();


const addAnswer = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('answers').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllAnswers = async (req, res, next) => {
    try {
        const answers = await firestore.collection('answers');
        const data = await answers.get();
        const answersArray = [];
        if(data.empty) {
            res.status(404).send('No answer record found');
        }else {
            data.forEach(doc => {
                const answer = new Answer(
                    doc.id,
                    doc.data().user_id,
                    doc.data().question_id,
                    doc.data().wildcard_id,
                    doc.data().given_answer,
                    doc.data().is_correct,
                    doc.data().used_wildcard
                );
                answersArray.push(answer);
            });
            res.send(answersArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAnswer = async (req, res, next) => {
    try {
        const id = req.params.id;
        const answer = await firestore.collection('answers').doc(id);
        const data = await answer.get();
        if(!data.exists) {
            res.status(404).send('answer with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateAnswer = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const answer =  await firestore.collection('answers').doc(id);
        await answer.update(data);
        res.send('answer record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteAnswer = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('answers').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addAnswer,
    getAllAnswers,
    getAnswer,
    updateAnswer,
    deleteAnswer
}