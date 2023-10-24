"use strict";
const nodemailer = require("nodemailer");
const cron = require('node-cron')
const Schedule = require("../models/scheduleModel")



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "notifierbot2@gmail.com",
      pass: "ktxy qyty ofup bnfa",
    },
  });


const sendMail = async () => {

  const date = new Date()

  


  


  // scheduling mails usindg node cron
  cron.schedule('* * * * *', async () => {

    const m = date.getMonth()
    const y = date.getFullYear()
    const d = date.getDate()

    const h = date.getHours()
    const min = date.getMinutes()

    console.log(`${h}:${min}:00`,schedules[0].time)

  // Retrieving all the schedules of this day
  const schedules = await Schedule.find({date: `${y}-${m+1}-${d}`})

  //sorting schedules according to time
  schedules.sort(
    ({time:a},{time:b}) => a>b ? 1 : a<b ? -1 : 0

  )

    if(schedules[0].time >= `${h}:${min}:00` || schedules[0].time < `${h}:${min+5}:00`)
    {
      // console.log("Success")
      const info = await transporter.sendMail({
          from: 'Notification Alert <notifierbot2@gmail.com>', // sender address
          to: `${schedules[0].to}`, // list of receivers
          subject: `${schedules[0].subject}`, // Subject line
          text: `${schedules[0].body}`, // plain text body
          html: `<div><p>${schedules[0].body}</p><br><p>You recieved this mail from ${schedules[0].from}.<br>You can reply</p></div>`, // html body
      });
      
    console.log(info.messageId)

    await Schedule.findByIdAndDelete(
        schedules[0].id,
        schedules[0],
        { new:true }
    )
    
    
    }
    else{
      console.log("No Success")
    }
  })

}

module.exports = sendMail