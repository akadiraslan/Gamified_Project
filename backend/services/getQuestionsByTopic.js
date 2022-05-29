// /*Set up Admin API for Firebase*/
// const admin = require('firebase-admin');
// //Define path to secret key generated for service account
// const serviceAccount = require('./gamified-1fabd-firebase-adminsdk-dej3v-75d19e1cdd.json');
// //Initialize the app
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
const firebase = require('../db');

const questionsRef = firebase.firestore().collection('questions');


    questionsRef
    .get()
    .then((snapshot) => {
    const data = snapshot.docs.map( ff );

    function ff (doc){
        if(doc.data().topic_id == 1)
            return {
                id: doc.id,
                ...doc.data(),
            };
        else
            return null;
    }
    console.log("All data in 'questions' collection", data); 
    // [ { id: 'glMeZvPpTN1Ah31sKcnj', title: 'The Great Gatsby' } ]
    });

    

    // (doc) => (
    //     {
    //     id: doc.id,
    //     ...doc.data(),
    // })