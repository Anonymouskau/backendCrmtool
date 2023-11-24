import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const ProjectSchema=new Schema({
    ProjectName:{
        type:String,
        required:true,
        
    },
    email:{
        type:String
        ,
        required:true,
        
    }
})
const Project = mongoose.model('Project',ProjectSchema);
export default Project