const express = require('express');
const router = express.Router();
const { firestore,
    HUMIDITY,
    collection,
    deleteDoc,
    doc,
    addDoc,
    updateDoc,
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
    const querySnapshot = await getDocs(collection(firestore, HUMIDITY));
    const humidity = [];
        querySnapshot.forEach((doc) => {
            const messageObject = {
                id: doc.id,
                humidity: doc.data().humidity,
                location: doc.data().location,
                time: doc.data().time,
                date: doc.data().date,
                note: doc.data().note,
                pinned: doc.data().pinned,
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
    let currentTime = new Date();
    let date = currentTime.getDate() + '.' + (currentTime.getMonth()+1)
    let time = currentTime.getHours() + ':' + currentTime.getMinutes()
    await addDoc(collection(firestore, HUMIDITY), {
        humidity: req.body.humidity,
        location: deviceLocation,
        time: time,
        date: date,
        pinned: false
    }).then( () => {
        res.sendStatus(201)
    }).catch( (err) => {
        res.send(err.message)
    })
   } else {
        res.sendStatus(403)
   }
})

router.post('/start', (req, res) => {   // Tell esp32 to start measuring or stop measuring
    if(process.env.API_KEY === req.body.apiKey) {

        if(req.body.measuringMode === undefined || req.body.measuringMode >= 2 || req.body.measuringMode <= -1 || isNaN(req.body.measuringMode) || req.body.lightMode === "") {
            return res.send('Invalid data')
        }
        var url
        measuringMode = Number(req.body.measuringMode)
        console.log("humidity start " + measuringMode)
        if(measuringMode === 1) {
          url = process.env.esp32URLhumON
        } else if (measuringMode === 0) {
          url = process.env.esp32URLhumOFF
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

router.put('/pinned', async(req, res) => {
    if(process.env.API_KEY === req.body.apiKey) {
        if(req.body.id === undefined || req.body.id === "") return res.send('Invalid data')
        const docRef = doc(firestore,HUMIDITY,req.body.id)
        await updateDoc(docRef, {
            pinned: req.body.pinned
        }).catch (error => console.log(error))
        res.sendStatus(200)
    } else {
        res.sendStatus(403)
    } 
})

router.put('/note', async(req, res) => {
    if(process.env.API_KEY === req.body.apiKey) {
        if(req.body.id === undefined || req.body.id === "") return res.send('Invalid data')
        const docRef = doc(firestore,HUMIDITY,req.body.id)
        await updateDoc(docRef, {
            note: req.body.note
        }).catch (error => console.log(error))
        res.sendStatus(200)
    } else {
        res.sendStatus(403)
    } 
})


router.delete('/', async(req, res) => { //Delete one from collection
    if(process.env.API_KEY === req.body.apiKey) {
        if(req.body.id === undefined || req.body.id === "") return res.send('Invalid data')
        const docRef = doc(firestore,HUMIDITY,req.body.id) 
        await deleteDoc(docRef).catch ( err => res.send(err))  

        res.sendStatus(200)
    } else {
        res.sendStatus(403)
    }
})

module.exports = router