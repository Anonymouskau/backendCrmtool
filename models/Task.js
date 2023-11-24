import { Timestamp } from 'mongodb';
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

// Schema for the Employee

// Schema for the Task
const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
    customer: { type: String,required:true }, // Reference to the Customer
    assignedTo: { type: String,required:true }, 
    email: { type: String,required:true },
    // Reference to the Employee
    // Other task fields
    projectname:{type:String,required:true}
},{timestamps:true});


const Task = mongoose.model('Task', taskSchema);


// module.exports = { Customer, Employee, Task, Project};
export default Task
