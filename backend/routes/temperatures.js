const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const { firestore,
    TEMPERATURE,
    collection,
    deleteDoc,
    doc,
    addDoc,
    getDocs } = require('../firebase')



router.get('/', async(req, res) => { // SHOW EVERYTHING
    const querySnapshot = await getDocs(collection(firestore, TEMPERATURE));
    const temperature = [];
    querySnapshot.forEach((doc) => {
        const messageObject = {
            humidity: doc.data().temperature,
            location: doc.data().location,
            id: doc.data().id,
        };
        temperature.push(messageObject);
    });
    res.send(temperature);
});

router.post('/', async(req, res) => {    // CREATE ARRAY OF temperature
   if(process.env.API_KEY === req.body.apiKey) {

    if(req.body.temperature === undefined || req.body.location === undefined) return res.send('Invalid data')

    const docRef = await addDoc(collection(firestore, TEMPERATURE), {
        temperature: req.body.temperature,
        location: req.body.location,
        id: uuidv4(),    
    }).then( () => {
        res.sendStatus(200);
    }).catch((err) => {
        res.send(err.message)
    })
   } else {
        res.send('Access denied')
   }
})

router.delete('/', async(req, res) => { //Delete one from collection
    if(process.env.API_KEY === req.body.apiKey) {

        if(req.body.id === undefined || req.body.id === "") return res.send('Invalid data')

        const docRef = doc(firestore,TEMPERATURE, req.body.id)
       deleteDoc(docRef).then( () => {
            res.sendStatus(200)
        }).catch ( err => res.send(err))
    } else {
        res.send('Access denied')
    } 
})

module.exports = router