const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const { firestore,
    TEMPERATURE,
    collection,
    addDoc,
    getDocs } = require('../firebase')



router.get('/', async(req, res) => { // SHOW EVERYTHING
    const querySnapshot = await getDocs(collection(firestore, TEMPERATURE));
    const temperature = [];
    querySnapshot.forEach((doc) => {
        const messageObject = {
            humidity: doc.data().temperature,
            id: doc.data().id,
        };
        temperature.push(messageObject);
    });
    res.send(temperature);
});

router.post('/', async(req, res) => {    // CREATE ARRAY OF temperature
   if(process.env.API_KEY === req.body.apiKey) {
    const docRef = await addDoc(collection(firestore, TEMPERATURE), {
        temperature: req.body.temperature,
        id: uuidv4(),    
    }).catch (err => res.send('Could not add TEMPERATURE to collection: ' + err.message))
    res.sendStatus(200)
   } else {
    res.sendStatus(403)
   }
})

module.exports = router