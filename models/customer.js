import mongoose from 'mongoose'
const Schema = mongoose.Schema;


// Schema for the Customer
const customerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    file:{type:Array}
    ,
    projectname:{type:String, required:true}
    // Other customer fields
});
const Customer = mongoose.model('Customer', customerSchema);

export default Customer