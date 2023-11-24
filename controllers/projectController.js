import {Router} from 'express'
import Project from '../models/Project.js'
const route =Router()

route.post("/newproject",async(req,res)=>{
 
    
try{
    var existing_project=Project.findOne({ProjectName:req.body.ProjectName,email:req.body.email})
      
  await  existing_project.then(resp=>{
           if(resp===null){
            
            
               var new_Project=new Project({
                       ProjectName:req.body.ProjectName ,
                       email:req.body.email
               })
             
             new_Project.save().then((u)=>{
               res.status(200).send(u)
           
               }).catch(err=>res.status(503).send(err))
           }
           else{
            
               res.status(200).send({status:503})
           }
    }).catch(err=>{
        console.log(err);
    })


}catch(err){
    console.log(err);

}




})

route.post("/myproject",(req,res)=>{
   
    try{
       
     var myproject = Project.find({
        email:req.body.email
      })

      myproject.then(response=>{
        res.status(200).send(response)
      })

    }catch(err){
        res.status(503).send(err)

    }




})


route.delete("/deleteproject",async(req,res)=>{
    try{  
       var deleteproject =Project.findOneAndDelete({
            ProjectName:req.body.ProjectName
        })

       await deleteproject.then(response=>{
              res.json(response)
        })


    }catch(err){
        console.log(err);
    }
})


export default route