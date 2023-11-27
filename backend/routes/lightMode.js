const express = require('express');
const router = express.Router();
const http = require('http');
var lightMode = {}

router.get('/', (req, res) => {
    res.json(lightMode)
})

router.post('/', (req, res) => { // tell esp to turn on or of lights
    if(process.env.API_KEY === req.body.apiKey) {
        if(req.body.lightMode === undefined || req.body.lightMode >= 2 || req.body.lightMode <= -1 || isNaN(req.body.lightMode) || req.body.lightMode === "") {
            return res.send('Invalid data') 
        }
        const options = {
            hostname: process.env.esp32IP,
            port: process.env.esp32Port,
            path: `/lights`,
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

module.exports = router