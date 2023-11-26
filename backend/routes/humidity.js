const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { firestore,
    HUMIDITY,
    collection,
    deleteDoc,
    doc,
    addDoc,
    getDocs, 
    serverTimestamp} = require('../firebase')



var deviceLocation = ""
var measuringMode = {}

router.get('/location', (req, res) => {
    res.json(deviceLocation)
})

router.get('/start', (req, res) => {
    res.json(measuringMode)
})
  
router.get('/', async(req, res) => { // SHOW EVERYTHING
    const querySnapshot = await getDocs(collection(firestore, HUMIDITY));
    const humidity = [];
        querySnapshot.forEach((doc) => {
            const messageObject = {
                location: doc.data().location,
                humidity: doc.data().humidity,
                id: doc.data().id,
                time: doc.data().time,
            };
            humidity.push(messageObject);
        });
    res.send(humidity);
});

router.post('/location', (req, res) => {    // Receive location of the device.
    if(process.env.API_KEY === req.body.apiKey) {
        deviceLocation = req.body.location;
        res.sendStatus(202)
        } else {
        res.sendStatus(403)
        }
})

router.post('/', async(req, res) => {    // CREATE collection OF HUMIDITIES or add to the collection
   if(process.env.API_KEY === req.body.apiKey) {

    if(req.body.humidity === undefined) return res.send('Invalid data')
    console.log(deviceLocation)
    await addDoc(collection(firestore, HUMIDITY), {
        location: deviceLocation,
        humidity: req.body.humidity,
        time: serverTimestamp(),
        id: uuidv4(),
    }).then( () => {
        res.sendStatus(201)
    }).catch( (err) => {
        res.send(err.message)
    })
   } else {
        res.sendStatus(403)
   }
})

router.post('/start', (req, res) => {    // Receive 1 or 0 for 'turning' humidity sensor on..
    if(process.env.API_KEY === req.body.apiKey) {

        if(req.body.measuringMode === undefined || req.body.measuringMode >= 2 || req.body.measuringMode <= -1 || isNaN(req.body.measuringMode) || req.body.lightMode === "") {
            return res.send('Invalid data')
        }  
            measuringMode = req.body.measuringMode;
            res.sendStatus(202)
       } else {
        res.sendStatus(403)
      }
})


router.delete('/', async(req, res) => { //Delete one from collection
    if(process.env.API_KEY === req.body.apiKey) {
        if(req.body.id === undefined || req.body.id === "") return res.send('Invalid data')

        const docRef = doc(firestore,HUMIDITY, req.body.id)
        await deleteDoc(docRef).then( () => {
            res.sendStatus(200)
        }).catch ( err => res.send(err))  
    } else {
        res.sendStatus(403)
    }
})

module.exports = router