const express = require('express');
const router = express.Router();
var lightMode = {}

router.get('/', (req, res) => {
    res.json(lightMode)
})

router.post('/', (req, res) => { // tell esp to turn on or of lights
    if(process.env.API_KEY === req.body.apiKey) {
        if(req.body.lightMode === undefined || req.body.lightMode >= 2 || req.body.lightMode <= -1 || isNaN(req.body.lightMode) || req.body.lightMode === "") {
            return res.send('Invalid data') 
        }
          lightMode = req.body.lightMode
          res.sendStatus(200)
       } else {
        res.sendStatus(403)
      }
})

module.exports = router