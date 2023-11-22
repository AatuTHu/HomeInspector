const express = require('express');
const router = express.Router();
const { } = require('../firebase')


var location = {}

router.get('/', (req, res) => {
    res.json(location)
})


router.post('/', (req, res) => {    // Receive location of the device.
    if(process.env.API_KEY === req.body.apiKey) {
        location = req.body.location;
        res.sendStatus(200)
       } else {
        res.send("Access denied")
       }
})

module.exports = router