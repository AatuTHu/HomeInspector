require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const express = require('express')
const app = express()

const port = process.env.PORT || 3001 // DEFAULT PORT

////ROUTER DECLARATIONS
const temperaturesRouter = require('./routes/temperatures') 
const humidityRouter = require('./routes/humidity')
const lightMode = require('./routes/lightMode')

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors())

////ROUTE DECLARATIONS
app.use('/temperature',temperaturesRouter) 
app.use('/humidity',humidityRouter)
app.use('/lightMode',lightMode)



app.get('/', function (req, res) {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log(`Backend running on port : ${port}`)
})