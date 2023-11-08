const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { firestore,
    HUMIDITY,
    collection,
    addDoc,
    getDocs } = require('../firebase')



router.get('/', async(req, res) => { // SHOW EVERYTHING
    const querySnapshot = await getDocs(collection(firestore, HUMIDITY));
    const humidity = [];
        querySnapshot.forEach((doc) => {
            const messageObject = {
                humidity: doc.data().humidity,
                id: doc.data().id,
            };
            humidity.push(messageObject);
        });
        res.send(humidity);
});

router.post('/', async(req, res) => {    // CREATE ARRAY OF HUMIDITIES
   if(process.env.API_KEY === req.body.apiKey) {
    console.log('Creating collection or adding to collection')
    const docRef = await addDoc(collection(firestore, HUMIDITY), {
        id: uuidv4(),
        humidity: req.body.humidity,
    }).catch (err => res.send('Could not add humidity to collection: ' + err.message))
    res.sendStatus(200)
   } else {
    res.sendStatus(403)
   }
})

module.exports = router