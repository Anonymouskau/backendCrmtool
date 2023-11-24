import { Timestamp } from 'mongodb';
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

// Schema for the Employee

// Schema for the Task
const whatsapp = new Schema({
   
    message: { type: String, required: true },
    status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
     // Reference to the Customer
    assignedTo: { type: String,required:true }, 
    email: { type: String,required:true },
    // Reference to the Employee
    // Other task fields
    projectname:{type:String,required:true}
},{timestamps:true});


const whatsapp_schema = mongoose.model('whatsapp', whatsapp);


// module.exports = { Customer, Employee, Task, Project};
export default whatsapp_schema
