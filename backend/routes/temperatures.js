const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const temperatureChart = []

router.get('/', (req, res) => { // SHOW EVERYTHING
    res.json(temperatureChart);
})

router.get('/:temperatureId', (req, res) => { //SHOW TEMPERATURE BY ID

    let foundIndex = -1;
    for (let i = 0; i < temperatureChart.length; i++) {
        if(temperatureChart[i].id == req.params.temperatureId){
            foundIndex = i;
            break;
        }
    }
    if(foundIndex === -1){
        res.sendStatus(404);
    }else{
        res.json(temperatureChart[foundIndex]);
    }
    res.sendStatus(200);
})


router.post('/',(req, res) => {    // CREATE ARRAY OF TEMPERATURES
    if(process.env.API_KEY === req.body.apiKey) {
        temperatureChart.push({
            id: uuidv4(),
            temperature: req.body.temperature,
        });
        res.sendStatus(201);
    } else {
        res.sendStatus(403)
    }
    
})

module.exports = router