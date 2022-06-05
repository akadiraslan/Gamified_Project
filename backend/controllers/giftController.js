'use strict';

const firebase = require('../db');
const Gift = require('../models/gifts');
const firestore = firebase.firestore();


const addGift = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('gifts').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllgifts = async (req, res, next) => {
    try {
        const gifts = await firestore.collection('gifts');
        const data = await gifts.get();
        const giftsArray = [];
        if(data.empty) {
            res.status(404).send('No gift record found');
        }else {
            data.forEach(doc => {
                const gift = new Gift(
                    doc.id,
                    doc.data().gifts
                );
                giftsArray.push(gift);
            });
            res.send(giftsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getgift = async (req, res, next) => {
    try {
        const id = req.params.id;
        const gifts = await firestore.collection('gifts').doc(id);
        const data = await gifts.get();
        if(!data.exists) {
            res.status(404).send('gift with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updategift = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const gift =  await firestore.collection('gifts').doc(id);
        await gift.update(data);
        res.send('gift record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletegift = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('gifts').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addGift,
    getAllgifts,
    getgift,
    updategift,
    deletegift
}