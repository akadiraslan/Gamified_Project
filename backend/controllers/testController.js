'use strict';

const firebase = require('../db');
const Test = require('../models/tests');
const firestore = firebase.firestore();


const addTest = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('tests').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllTests = async (req, res, next) => {
    try {
        const tests = await firestore.collection('tests');
        const data = await tests.get();
        const testsArray = [];
        if(data.empty) {
            res.status(404).send('No test record found');
        }else {
            data.forEach(doc => {
                const test = new Test(
                    doc.id,
                    doc.data().name,
                    doc.data().question
                );
                testsArray.push(test);
            });
            res.send(testsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTest = async (req, res, next) => {
    try {
        const id = req.params.id;
        const test = await firestore.collection('tests').doc(id);
        const data = await test.get();
        if(!data.exists) {
            res.status(404).send('test with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateTest = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const test =  await firestore.collection('tests').doc(id);
        await test.update(data);
        res.send('test record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteTest = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('tests').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addTest,
    getAllTests,
    getTest,
    updateTest,
    deleteTest
}