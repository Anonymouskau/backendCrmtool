import { Router } from "express";
import Employee from "../models/employee.js";




const route=Router()




route.post("/newEmployee",(req,res)=>{
    try {
        
        var new_Employee =new Employee({
            email:req.body.email,
            name:req.body.name,
            projectname:req.body.projectname
            ,position:req.body.position
        })
    
        new_Employee.save().then(resp=>{
            res.status(200).json(resp)
        }).catch(err=>console.log(err))

        
    } catch (error) {
        console.log(error);
        
    }
})

route.put("/updateEmployeepost",(req,res)=>{
    try {
      var updatedemployee =Employee.findOneAndUpdate({
            projectname:req.body.projectname,
            email:req.body.email
        },{position:req.body.position})


        updatedemployee.then(resp=>{
            res.status(200).send(resp)

        }).catch(err=>res.status(502).send(err))
    } catch (error) {
        
    }
})

route.put("/updateEmployeeproject",(req,res)=>{
    try {
      var updatedemployee =Employee.findOneAndUpdate({
            projectname:req.body.projectname,
            email:req.body.email
        },{projectname:req.body.updateproject})


        updatedemployee.then(resp=>{
            res.status(200).send(resp)

        }).catch(err=>res.status(502).send(err))
    } catch (error) {
        
    }
})

route.put("/updateEmployeeEmail",(req,res)=>{
    try {
      var updatedemployee =Employee.findOneAndUpdate({
            projectname:req.body.projectname,
            email:req.body.email
        },{email:req.body.updatedemail})


        updatedemployee.then(resp=>{
            res.status(200).send(resp)

        }).catch(err=>res.status(502).send(err))
    } catch (error) {
        
    }
})

route.get("/getEmployee",(req,res)=>{
    try {
         
        var getEmployee=Employee.find({
            projectname:req.headers.projectname
        })
       
        getEmployee.then(resp=>{
          res.status(200).json(resp)
        }).catch(err=>console.log(err))
       
        
    } catch (error) {
        console.log(error);
        
    }
})

route.get("/getEmployeeEmail",(req,res)=>{
    try {
         
        var getEmployee=Employee.findOne({
            projectname:req.headers.projectname,
            email:req.headers.email
        })
       
        getEmployee.then(resp=>{
          res.status(200).json(resp)
        }).catch(err=>res.status(503).send(err))
       
        
    } catch (error) {
        console.log(error);
        
    }
})




route.delete("/deleteEmployee",(req,res)=>{
    try {
           var deleteEmp =Employee.findByIdAndDelete({
               "_id":req.body._id
 
            })

            deleteEmp.then(resp=>{
                res.status(200).send(resp)
            }).catch(err=>console.log(err))


    } catch (error) {
        
    }
})

export default route