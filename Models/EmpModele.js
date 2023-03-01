const  mongoose = require("mongoose") 


const EmpModel = new mongoose.schema({
    
    Id_Livre:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Livre", 
        required: true,
    },
    Id_Client:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "utilisateur", 
        required: true,
    },
    Date_emp:{
        type: Date, 
        required: true,
    },
    Retour:{
        type: Boolean,
        default: false,
    },
    Nbre_emp:{
        type: Number, 
        required: true,
    }
})

module.exports = mongoose.model("Emprunt", EmpModel)