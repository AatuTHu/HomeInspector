const express = require('express');
const router = express.Router();

const humidityChart = []

router.get('/', (req, res) => { // SHOW EVERYTHING
    res.json(humidityChart);
})

router.get('/:humidityId', (req, res) => { //SHOW HUMIDITY BY ID
    let foundIndex = -1;
    for (let i = 0; i < humidityChart.length; i++) {
        if(humidityChart[i].id == req.params.humidityId){
            foundIndex = i;
            break;
        }
    }
    if(foundIndex === -1){
        res.sendStatus(404);
    }else{
        res.json(humidityChart[foundIndex]);
    }
    res.sendStatus(200);
})


router.post('/',(req, res) => {    // CREATE ARRAY OF HUMIDITIES
   if(process.env.API_KEY === req.body.apiKey) {
    humidityChart.push({
        id: uuidv4(),
        humidity: req.body.humidity
    });
    res.sendStatus(201);
   } else {
    res.sendStatus(403)
   }
})

module.exports = router