'use strict';

const firebase = require('../db');
const Wildcard = require('../models/wildcards');
const firestore = firebase.firestore();


const addWildcard = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('wildcards').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllWildcards = async (req, res, next) => {
    try {
        const wildcards = await firestore.collection('wildcards');
        const data = await wildcards.get();
        const wildcardsArray = [];
        if(data.empty) {
            res.status(404).send('No wildcard record found');
        }else {
            data.forEach(doc => {
                const wildcard = new Wildcard(
                    doc.id,
                    doc.data().wildcard_name
                );
                wildcardsArray.push(wildcard);
            });
            res.send(wildcardsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getWildcard = async (req, res, next) => {
    try {
        const id = req.params.id;
        const wildcards = await firestore.collection('wildcardss').doc(id);
        const data = await wildcard.get();
        if(!data.exists) {
            res.status(404).send('wildcard with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateWildcard = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const wildcard =  await firestore.collection('wildcards').doc(id);
        await wildcard.update(data);
        res.send('wildcard record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteWildcard = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('wildcards').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addWildcard,
    getAllWildcards,
    getWildcard,
    updateWildcard,
    deleteWildcard
}