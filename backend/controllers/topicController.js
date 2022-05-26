'use strict';

const firebase = require('../db');
const Topic = require('../models/topics');
const firestore = firebase.firestore();


const addTopic = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('topics').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllTopics = async (req, res, next) => {
    try {
        const topics = await firestore.collection('topics');
        const data = await topics.get();
        const topicsArray = [];
        if(data.empty) {
            res.status(404).send('No topic record found');
        }else {
            data.forEach(doc => {
                const topic = new Topic(
                    doc.id,
                    doc.data().topic_name
                );
                topicsArray.push(topic);
            });
            res.send(topicsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTopic = async (req, res, next) => {
    try {
        const id = req.params.id;
        const topics = await firestore.collection('topicss').doc(id);
        const data = await topic.get();
        if(!data.exists) {
            res.status(404).send('Topic with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateTopic = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const topic =  await firestore.collection('topics').doc(id);
        await topic.update(data);
        res.send('Topic record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteTopic = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('topics').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addTopic,
    getAllTopics,
    getTopic,
    updateTopic,
    deleteTopic
}