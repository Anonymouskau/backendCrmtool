import { Router } from "express";
import Task from "../models/Task.js";
import axios from "axios";
import fs from "fs";
import nodemailer from "nodemailer";


import { log } from "console";
import whatsapp from "../models/WhatsappTask.js";
import whatsapp_schema from "../models/WhatsappTask.js";
import pkg from "whatsapp-web.js";

const client=new pkg.Client({
  puppeteer:{
    headless:true
  },
  authStrategy:new pkg.NoAuth()
})  

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "n2242597@gmail.com",
    pass: "sijvtqfkmmkwjdes",
  },
});

const route = Router();

route.post("/todoTask", (req, res) => {
  try {
    var idcustomer = axios.get(
      "https://crmbackend-hkqn.onrender.com/customer/getCustomeremail",
      {
        headers: {
          projectname: req.body.projectname,
          email: req.body.customeremail,
        },
      }
    );
    var employee_id = "";
    var idemployee = axios.get(
      "https://crmbackend-hkqn.onrender.com/employee/getEmployeeEmail",
      {
        headers: {
          projectname: req.body.projectname,
          email: req.body.assignedTo,
        },
      }
    );
    idemployee
      .then((resp) => {
        employee_id = resp.data.email;
      })
      .catch((err) => console.log(err));

    var customer_id = "";

    idcustomer
      .then((resp) => {
        customer_id = resp.data.email;
        resp.data.file.map((value) => {
          var mailOptions = {
            from: req.body.senderEmail,
            to: req.body.assignedTo,
            subject: req.body.title,
            text: req.body.description,
            attachments: [
              {
                filename: value,
                path: value,
              },
            ],
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });

          console.log(req.body.projectname, req.body.customeremail);
        });
        // console.log(filearray);
      })
      .catch((err) => console.log(err));

    var todoTask = new Task({
      projectname: req.body.projectname,
      title: req.body.title,
      customer: req.body.customeremail,
      description: req.body.description,
      assignedTo: req.body.assignedTo,
      email: req.body.senderEmail,
    });

    todoTask
      .save()
      .then((resp) => {
        res.status(200).json(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {}
});

route.patch("/updateTasks", (req, res) => {
  try {
    Task.findByIdAndUpdate(
      { _id: req.body._id },
      {
        title: req.body.title,
        customer: req.body.customeremail,
        description: req.body.description,
        assignedTo: req.body.assignedTo,
        status: req.body.status,
      }
    )
      .then((resp) => res.status(200).send(resp))
      .catch((err) => {
        res.status(503).send(err);
      });
  } catch (error) {}
});

route.delete("/deletetask", (req, res) => {
  try {
    log(req.body._id);
    Task.deleteOne({ _id: req.body._id })
      .then((resp) => res.status(200).send(resp))
      .catch((err) => {
        res.status(503).send(err);
      });
  } catch (error) {}
});

route.delete("/deletewhatsapp", (req, res) => {
  try {
    log(req.body._id);
    whatsapp_schema.deleteOne({ _id: req.body._id })
      .then((resp) => res.status(200).send(resp))
      .catch((err) => {
        res.status(503).send(err);
      });
  } catch (error) {}
});

route.delete('/deletemanyTask',(req,res)=>{
  try {
    Task.deleteMany({
      email:req.body.email,
      projectname:req.body.projectname
    }).then((resp) => res.status(200).send(resp))
    .catch((err) => {
      res.status(503).send(err);
    });
  } catch (error) {
    
  }
})
route.delete('/deleteWhatsappTask',(req,res)=>{
  try {
    whatsapp_schema.deleteMany({
      email:req.body.email,
      projectname:req.body.projectname
    }).then((resp) => res.status(200).send(resp))
    .catch((err) => {
      res.status(503).send(err);
    });
  } catch (error) {
    
  }
})
route.get("/statusTasks", (req, res) => {
  Task.find({
    projectname: req.headers.projectname,
    email: req.headers.email,
    status: req.headers.status,
  })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(503).send(err));
});
route.post("/whatsapp", async (req, res) => {
  try {
    
    
    client.on('qr',async(qr)=>{
     
     await res.send({"qr":qr})
    })
    client.initialize()
   
 
   
  
  } catch (error) {}
});
route.post('/whatsappsave',(req,res)=>{
  try {
    
    client.on('ready',async() => {
      console.log("Client is ready"); 
        const number = req.body.phone_number;
  
    // Your message.
   const text = req.body.message;
  
    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
   const chatId = number.substring(1) + "@c.us";
  
   // Sending message.
   client.sendMessage(chatId, text)
      
     var whatsapp = new whatsapp_schema({
        message: req.body.message,
        assignedTo: req.body.assignedTo,
        email: req.body.email,
        projectname: req.body.projectname,
      });
    
      setTimeout(() => {
         whatsapp
        .save()
        .then((resp) => res.status(200).send("CreatedTask"))
        .catch((err) => console.log(err)); 
        
       
        

      },6000);
   
    });

    
  
  } catch (error) {
    
  }
})
route.get("/statuswhatsapp", (req, res) => {
  whatsapp_schema.find({
    projectname: req.headers.projectname,
    email: req.headers.email,
    status: req.headers.status,
  })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(503).send(err));
});

route.patch("/updatewhatsapp", (req, res) => {
  try {
    whatsapp_schema.findByIdAndUpdate(
      { _id: req.body._id },
      {
        message:req.body.message,
        projectname:req.body.projectname,
        email:req.body.email,
        assignedTo: req.body.assignedTo,
        status: req.body.status,
      }
    )
      .then((resp) => res.status(200).send(resp))
      .catch((err) => {
        res.status(503).send(err);
      });
  } catch (error) {}
});

export default route;
