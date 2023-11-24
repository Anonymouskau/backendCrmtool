import mongoose from 'mongoose'
const Schema = mongoose.Schema;
 const employeeSchema = new Schema({
    name: { type: String, required: true },
    position: { type: String },
    email:{type:String,required:true},
    projectname:{type:String, required:true}
    // Other employee fields
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee