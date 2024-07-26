const mongoose = require("mongoose");




(async function() {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb+srv://nikhil21fbd:GwwspD6mexyL7AAC@cluster0.sdxpnyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
})();

// Define the student schema
const candidateSchema = new mongoose.Schema({
name:{
    type:String,
    required:[true,"you have not rntered the anme"]
   },
email:{
    type:String,
    required:[true,"email it is required"],
    unique:[true,"you are already sign up"],
},
phoneno:{
    type:String,
    required:[true,"you have not entered mobile no"]
},
companysite:{
    type:String,
    required:true

},
pic:{
    type: String,
    default:"https://res.cloudinary.com/djobbmy33/image/upload/v1693216778/WIN_20210510_17_10_42_Pro_s5xam1.jpg"

 },
});


const candidateModel = mongoose.model("candidateModel", candidateSchema);



module.exports = candidateModel;
