const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { firestore,
    HUMIDITY,
    collection,
    deleteDoc,
    doc,
    addDoc,
    getDocs } = require('../firebase')


router.get('/', async(req, res) => { // SHOW EVERYTHING
    const querySnapshot = await getDocs(collection(firestore, HUMIDITY));
    const humidity = [];
        querySnapshot.forEach((doc) => {
            const messageObject = {
                humidity: doc.data().humidity,
                location: doc.data().location,
                id: doc.data().id,
            };
            humidity.push(messageObject);
        });
    res.send(humidity);
});

router.post('/', async(req, res) => {    // CREATE ARRAY OF HUMIDITIES
   if(process.env.API_KEY === req.body.apiKey) {

    if(req.body.humidity === undefined || req.body.location === undefined) return res.send('Invalid data')

    await addDoc(collection(firestore, HUMIDITY), {
        id: uuidv4(),
        location: req.body.location,
        humidity: req.body.humidity,
    }).then( () => {
        res.sendStatus(201)
    }).catch( (err) => {
        res.send(err.message)
    })
   } else {
        res.sendStatus(403)
   }
})

router.delete('/', async(req, res) => { //Delete one from collection
    if(process.env.API_KEY === req.body.apiKey) {

        if(req.body.id === undefined || req.body.id === "") return res.send('Invalid data')

        const docRef = doc(firestore,HUMIDITY, req.body.id)

        await deleteDoc(docRef).then( (response) => {
            res.sendStatus(200)
        }).catch ( err => res.send(err))
      
    } else {
        res.sendStatus(403)
    }
})

module.exports = router