require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const express = require('express')
const app = express()

const port = process.env.PORT || 3001 // DEFAULT PORT

////ROUTER DECLARATIONS
const temperaturesRouter = require('./routes/temperatures') 
const humidityRouter = require('./routes/humidity')
const location = require('./routes/location')
const lightMode = require('./routes/lightMode')
const measuringMode = require('./routes/measuringMode')

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors())

////ROUTE DECLARATIONS
app.use('/temperature',temperaturesRouter) 
app.use('/humidity',humidityRouter)
app.use('/location',location)
app.use('/lightMode',lightMode)
app.use('/measuringMode', measuringMode)


app.get('/', function (req, res) {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log(`Backend running on port : ${port}`)
})