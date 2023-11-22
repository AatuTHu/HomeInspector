const express = require('express');
const router = express.Router();

var measuringMode = {}

router.get('/', (req, res) => {
    res.json(measuringMode)
})


router.post('/', (req, res) => {    // Receive 1 or 0 for turning DHT22 on or of.
    if(process.env.API_KEY === req.body.apiKey) {

        if(req.body.measuringMode === undefined || req.body.measuringMode >= 2 || req.body.measuringMode <= -1 || isNaN(req.body.measuringMode) || req.body.lightMode === "") {
            return res.send('Invalid data')
        }  
            measuringMode = req.body.measuringMode;
            res.sendStatus(200)
       } else {
        res.send("Access denied");
      }
})

module.exports = router