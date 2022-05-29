'use strict';

const firebase = require('../db');
const Report = require('../models/reports');
const firestore = firebase.firestore();


const addReport = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('reports').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllReports = async (req, res, next) => {
    try {
        const reports = await firestore.collection('reports');
        const data = await reports.get();
        const reportsArray = [];
        if(data.empty) {
            res.status(404).send('No report record found');
        }else {
            data.forEach(doc => {
                const report = new Report(
                    doc.id,
                    doc.data().user_id,
                    doc.data().test_id,
                    doc.data().score
                );
                reportsArray.push(report);
            });
            res.send(reportsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getReport = async (req, res, next) => {
    try {
        const id = req.params.id;
        const report = await firestore.collection('reports').doc(id);
        const data = await report.get();
        console.log(data.data())
        if(!data.exists) {
            res.status(404).send('report with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getReportByUserID = async (req, res, next) => {
    try {
        const id = req.params.id;
        const reports = await firestore.collection('reports');
        const data = await reports.get();
        const reportsArray = [];
        if(data.empty) {
            res.status(404).send('No report record found');
        }else {
            data.forEach(doc => {
                if(doc.data().user_id == id){
                    const report = new Report(
                        doc.id,
                        doc.data().user_id,
                        doc.data().test_id,
                        doc.data().score
                    );
                    reportsArray.push(report);
                }
            });
            res.send(reportsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }

}

const updateReport = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const report =  await firestore.collection('reports').doc(id);
        await report.update(data);
        res.send('report record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const deleteReport = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('reports').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addReport,
    getAllReports,
    getReport,
    getReportByUserID,
    updateReport,
    deleteReport
}