const express = require('express');
const router = express.Router();
const { firestore,
    TEMPERATURE,
    collection,
    deleteDoc,
    doc,
    addDoc,
    updateDoc,
    where,
    getDocs} = require('../firebase')
const http = require('http');
var deviceLocation = ""
var measuringMode = 0

router.get('/location', (req, res) => {
    res.json(deviceLocation)
})

router.get('/start', (req, res) => {
    res.json(measuringMode)
})



router.get('/', async(req, res) => { // SHOW EVERYTHING
    const querySnapshot = await getDocs(collection(firestore, TEMPERATURE));
    const temperature = [];
    querySnapshot.forEach((doc) => {
        const messageObject = {
            id: doc.id,
            temperature: doc.data().temperature,
            location: doc.data().location,
            time: doc.data().time,
            date: doc.data().date,
            pinned: doc.data().pinned
        };
        temperature.push(messageObject);
    });
    res.send(temperature);
});

router.post('/location', (req, res) => {    // Receive location of the device.
    if(process.env.API_KEY === req.body.apiKey) {
        deviceLocation = req.body.location;
        res.sendStatus(202)
    } else {
        res.sendStatus(403)
    }
})

router.post('/', async(req, res) => {    // CREATE collection OF temperature, or add to collection

   if(process.env.API_KEY === req.body.apiKey) {

    if(req.body.temperature === undefined) return res.send('Invalid data')

    let currentTime = new Date();
    let date = currentTime.getDate() + '.' + (currentTime.getMonth()+1)
    let time = currentTime.getHours() + ':' + currentTime.getMinutes()

    const docRef = await addDoc(collection(firestore, TEMPERATURE), {
        temperature: req.body.temperature,
        location: deviceLocation,
        time: time,
        date: date,
        pinned: false,
    }).then( () => {
        res.sendStatus(201);
    }).catch((err) => {
        res.send(err.message)
    })
   } else {
        res.sendStatus(403);
   }
})


router.post('/start', (req, res) => {    // Tell esp32 to start measuring or stop measuring
    if(process.env.API_KEY === req.body.apiKey) {

        if(req.body.measuringMode === undefined || req.body.measuringMode >= 2 || req.body.measuringMode <= -1 || isNaN(req.body.measuringMode) || req.body.lightMode === "") {
            return res.send('Invalid data')
        }  
        var url
        measuringMode = Number(req.body.measuringMode)
        if(measuringMode === 1) {
          url = process.env.esp32URLtempON
        } else if (measuringMode === 0) {
          url = process.env.esp32URLtempOFF
        } else {
          return res.send('Something went wrong')
        }

        http.get(url, (response) => {
        }).on('error', () => {
          res.status(500)
        });

        res.sendStatus(200)
       } else {
        res.sendStatus(403)
      }
})

router.put('/', async(req, res) => {
    if(process.env.API_KEY === req.body.apiKey) {
        if(req.body.id === undefined || req.body.id === "") return res.send('Invalid data')
        const docRef = doc(firestore,TEMPERATURE,req.body.id)
        await updateDoc(docRef, {
            pinned: req.body.pinned
        }).then ( () => {
            res.sendStatus(200)
        })
    } else {
			res.sendStatus(403)
	} 
})

router.delete('/', async(req, res) => { //Delete one from collection
    if(process.env.API_KEY === req.body.apiKey) {

    if(req.body.id === undefined || req.body.id === "") return res.send('Invalid data')
    const docRef = doc(firestore,TEMPERATURE,req.body.id)
      await deleteDoc(docRef).then( () => {
            res.sendStatus(200)
        }).catch ( err => res.send(err))
    } else {
        res.sendStatus(403)
    } 
})

module.exports = router