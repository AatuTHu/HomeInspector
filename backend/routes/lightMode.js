const express = require('express');
const http = require('http');
const router = express.Router();
var lightMode = 0

router.get('/', (req, res) => {
  res.json(lightMode)
})

router.post('/', (req, res) => { // tell esp to turn on or of lights
    if(process.env.API_KEY === req.body.apiKey) {
        if(req.body.lightMode === undefined || req.body.lightMode >= 2 || req.body.lightMode <= -1 || isNaN(req.body.lightMode) || req.body.lightMode === "") {
            return res.send('Invalid data') 
        }
          var url
          lightMode = Number(req.body.lightMode)
          if(lightMode === 1) {
            url = process.env.esp32URLledON
          } else if (lightMode === 0) {
            url = process.env.esp32URLledOFF
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

module.exports = router