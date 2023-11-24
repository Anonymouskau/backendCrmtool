import express from 'express'

import fast2sms from 'fast2sms'
import project from './controllers/projectController.js'
import cors from 'cors'
import Customer from './controllers/Customercontroller.js'
import Employee from './controllers/EmployeeControler.js'
import TaskController from './controllers/TaskController.js'
import mongoose from 'mongoose'
const uri = "mongodb+srv://crm:kapA4901@cluster0.otttqt4.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri).then(res=>console.log("connected to Atlas")).catch(err=>console.log(err))

var app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors('*'))
app.use("/customer",Customer)
app.use(express.static('uploads'))
app.get("/",(req,res)=>{

   res.send('Server healthy')
})

app.use("/project",project)
app.use("/employee",Employee)
app.use('/task',TaskController)
app.listen(5000,console.log("Listening on port 5000"))