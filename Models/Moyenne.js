
const mongoose = require("mongoose")


const moyenneModel = new mongoose.Schema ({
      
        
    No : [{
        Note:{
            type: Number, 
            required: true, 
        },
        Coef: {
            type: Number, 
            required: true, 
        },
        Nom: {
            type: String,
        } }]
      
})  

module.exports = mongoose.model("Moyenne", moyenneModel)