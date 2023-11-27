const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const { firestore,
    TEMPERATURE,
    collection,
    deleteDoc,
    doc,
    addDoc,
    getDocs,
    serverTimestamp } = require('../firebase')
const http = require('http');


var deviceLocation = ""
var measuringMode = {}

router.get('/location', (req, res) => {
    console.log(deviceLocation)
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
            humidity: doc.data().temperature,
            location: doc.data().location,
            time: doc.data().time,
            id: doc.data().id,
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

    const docRef = await addDoc(collection(firestore, TEMPERATURE), {
        temperature: req.body.temperature,
        location: deviceLocation,
        time: serverTimestamp(),
        id: uuidv4(),    
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
        const options = {
            hostname: process.env.esp32IP,
            port: process.env.esp32Port,
            path: `/startTemperature`,
            method: 'GET',
          };
        
          const request = http.request(options, (response) => {
            let data = '';
        
            response.on('data', (chunk) => {
              data += chunk;
            });
        
            response.on('end', () => {
              console.log('Response from ESP32:', data);
              res.status(200).send(data);
            });
          });
        
          request.on('error', (e) => {
            console.error(`Problem with request: ${e.message}`);
            res.status(500).send('Internal Server Error');
          });
        
          // Send GET request to ESP32
          request.end();
       } else {
        res.sendStatus(403)
      }
})

router.delete('/', async(req, res) => { //Delete one from collection
    if(process.env.API_KEY === req.body.apiKey) {

        if(req.body.id === undefined || req.body.id === "") return res.send('Invalid data')

        const docRef = doc(firestore,TEMPERATURE, req.body.id)
       deleteDoc(docRef).then( () => {
            res.sendStatus(201)
        }).catch ( err => res.send(err))
    } else {
        res.sendStatus(403)
    } 
})

module.exports = router