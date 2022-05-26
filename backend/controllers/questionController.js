'use strict';

const firebase = require('../db');
const Question = require('../models/questions');
const firestore = firebase.firestore();


const addQuestion = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('questions').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllQuestions = async (req, res, next) => {
    try {
        const questions = await firestore.collection('questions');
        const data = await questions.get();
        const questionsArray = [];
        if(data.empty) {
            res.status(404).send('No question record found');
        }else {
            data.forEach(doc => {
                const question = new Question(
                    doc.id,
                    doc.data().topic_id,
                    doc.data().question_body,
                    doc.data().question_options,
                    doc.data().correct_option
                );
                questionsArray.push(question);
            });
            res.send(questionsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getQuestion = async (req, res, next) => {
    try {
        const id = req.params.id;
        const question = await firestore.collection('questions').doc(id);
        const data = await question.get();
        if(!data.exists) {
            res.status(404).send('question with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateQuestion = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const question =  await firestore.collection('questions').doc(id);
        await question.update(data);
        res.send('question record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteQuestion = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('questions').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addQuestion,
    getAllQuestions,
    getQuestion,
    updateQuestion,
    deleteQuestion
}