import {Router} from 'express'
import Customer from '../models/customer.js'
import fs from 'fs'
import multer from 'multer'
import { log } from 'console'
import path from 'path'

const route=Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
       cb(null,uniqueSuffix  + path.extname(file.originalname))
    }
  })
const upload=multer({storage})
var filearray=[]
route.post("/newCustomer",upload.single("file"),async(req,res)=>{
    
    try {
        console.log(req.files);
        console.log(req.file.filename);
        
        
         

        filearray.push(req.file.path)
      
      var new_customer =new Customer({
       email:req.body.email
       ,
       name:req.body.name,
       projectname:req.body.projectname,
    
       file:filearray
       })
         
     await new_customer.save().then(resp=>{
        res.status(200).send(resp)
      }).catch(err=>console.log(err)) 


        
    } catch (error) {
        console.log(error);
    }
})
route.get("/getCustomeremail",async(req,res)=>{
    try{

        console.log("Called",req.body.projectname,req.body.email);
       var getCutomers =Customer.findOne({
          projectname:req.headers.projectname  
          ,email:req.headers.email
        })
    await getCutomers.then(resp=>{
        if (resp) {
            
            res.status(200).json(resp)
         
        } else {
            res.status(503).json(resp)
            
            
        }
     }).catch(err=>console.log(err))

    }catch(err){

    }
})

route.get("/getCustomerinfo",async(req,res)=>{
    try{

       
       var getCutomers =Customer.find({
          projectname:req.headers.projectname  
        })
    await getCutomers.then(resp=>{
        res.status(200).send(resp)
     
     }).catch(err=>console.log(err))

    }catch(err){

    }
})


route.put("/updateCustomer",upload.single("file"), async(req,res)=>{

try {
      console.log(req.file.path)
    var updateCustomer=Customer.findOneAndUpdate({name:req.body.name},{
         "$push": { "file":req.file.path }
    },{new:true})
    updateCustomer.then(resp=>res.status(200).send(resp)).catch(err=>console.log(err))
} catch (error) {
    console.log(error)
}


})

route.delete("/deleteCustomer",async(req,res)=>{
try {
    console.log(req.body);
    var deletecustomer=Customer.findOne({name:req.body.name})
   
  await  deletecustomer.then(resp=>{
      var array_delete=resp.file
   
      array_delete.map(path=>{
          fs.unlink(path, (err) => {
              if (err) {
                  console.error('Error deleting file:', err);
                  return;
                }
                console.log("file deleted succesfully");
            });
            
        })
        var response=delete_customer(resp.name)
        res.status(200).send("Deleted Customer")
    
        // deletecustomer.then(resp=>{
        //   var response  =
        //        res.status(200).send("Deleted Customer")
        // })
       }).catch(err=>console.log(err))
    
} catch (error) {
    
}
})

const delete_customer=(value)=>{
    Customer.deleteOne({name:value}).then(response=>{
        return true

     }).catch(err=>console.log(err))
    
}


route.delete("/delete_cust",(req,res)=>{
    Customer.deleteMany({projectname:req.body.projectname,

    }).then(resp=>{


        res.status(200).send("Deleted"+resp)

    }).catch(err=>{
        res.status(503)
        console.log(err)
    })
})
export default route