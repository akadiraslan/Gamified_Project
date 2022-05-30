'use strict';

const firebase = require('../db');
const User = require('../models/users');
const firestore = firebase.firestore();


const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        const users = await firestore.collection('users');
        const getData = await users.get();
        var flag = true;
        getData.forEach(doc => {
            if(data.email == doc.data().email){
                flag = false
                return res.send({
                    response: flag,
                    errmsg : 'User already exists with this email'
                });
            }
        });
        if(flag){
            await firestore.collection('users').doc().set(data);
            res.send('Record saved successfuly');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await firestore.collection('users');
        const data = await users.get();
        const usersArray = [];
        if(data.empty) {
            res.status(404).send('No user record found');
        }else {
            data.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().email,
                    doc.data().username,
                    doc.data().password,
                    doc.data().biography,
                    doc.data().register_date,
                    doc.data().total_score
                );
                usersArray.push(user);
            });
            res.send(usersArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const userLogin = async (req, res, next) => {
    try {
        const id = req.params.id;
        const password = req.params.password;
        const users = await firestore.collection('users');
        const data = await users.get();
        var user_id;
        var flag = false
        if(data.empty) {
            res.status(404).send('No user record found');
        }else {
            data.forEach(doc => {
                if(doc.data().email == id){
                    if(doc.data().password == password)
                        flag = true
                        user_id = doc.id;
                }                
            });
            if (flag){
                res.send(
                    {
                        id : user_id,
                        response : true
                    }
                );
            }else{
                res.send(flag);
            }
            
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await firestore.collection('users').doc(id);
        const data = await user.get();
        if(!data.exists) {
            res.status(404).send('user with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user =  await firestore.collection('users').doc(id);
        await user.update(data);
        res.send('user record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('users').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getUser,
    userLogin,
    updateUser,
    deleteUser
}