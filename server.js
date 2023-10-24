
const express = require('express');
const errorhandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConfig');
const sendMail = require('./controllers/mailSender');
const dotenv = require('dotenv').config()
const cron = require('node-cron')
const cors = require('cors');


const port = process.env.PORT || 5000;

connectDb()
const app = express()

app.use(cors());

app.use(express.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin, profilerefid(whatever header you need)");
  next();
  });

app.use("/api/users/",require('./routes/userRoute'))
app.use("/api/",require('./routes/scheduleRoutes'))
// app.use("/api/comments/",require('./routes/commentRoute'))



app.use(errorhandler)

sendMail()

app.listen(port,() => 
{
    console.log(`sever running on port ${port}`)
    // cron.schedule('* * * * * *', () => {
    //     console.log("hello")
    // })
})