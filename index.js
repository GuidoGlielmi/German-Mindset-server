const express = require('express');
const psychAppointments = require('./data/3-schedule-interview-psychologist')
const app = express();

const port = process.env.port || 5000;;

app.listen(port, ()=>
console.log("server started on port 5000"))

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Postulante - Reservar, ver y cancelar un turno de entrevista con un Psicólogo de MindSet.

//Look interview

app.get("/psychologist-interviews/:id", (req, res)=>{
  const found = psychAppointments.some(interview => interview.id ===parseInt(req.params.id))
  if (found){
    res.json(psychAppointments.filter(interview => interview.id === parseInt(req.params.id)));
  }else{
    res.status(400).json({msg: `There's not an interview booked with the id ${req.params.id}`})
  }
})

//Delete Interview

app.delete("/psychologist-interviews/:id",(req, res)=>{
  const found = psychAppointments.some(interview => interview.id ===parseInt(req.params.id))
  if (found){
    res.json({
    msg: `The interview with the id of ${req.params.id} has been deleted`,
    });
  }else{
    res.status(400).json({msg: `There's not an interview with the id of ${req.params.id}`})
  }
})

//Book an appointment

app.post("/psychologist-interviews", (req, res)=>{
  const newInterview = {
    id: req.body.id,
    appointmentDay: req.body.appointmentDay,
    appointmentTime: req.body.appointmentTime
  }

  if(!newInterview.id || !newInterview.appointmentDay || !newInterview.appointmentTime){
    return res.status(400).json({msg: "Incomplete Data"});
  }

  const found = psychAppointments.some(interview => interview.id ===parseInt(req.body.id))
  if (found){
    return res.status(400).json({msg: `There's already an interview booked with the id ${req.body.id}`})
  }

  psychAppointments.push(newInterview);
  res.json({
    msg: `The interview with the id of ${newInterview.id} has been added`,
    psychAppointments
  })
})