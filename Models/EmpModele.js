const  mongoose = require("mongoose") 


const EmpModele = new mongoose.Schema(
    {
    
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
    Nbre_jr:{
        type: Number,
        required: true,
    },
    Rendre:{
        type: Boolean,
        default: false, 
    }, 
    Renouveler: {
        type: Boolean, 
        default: false, 
    }

    },
    {timestamps: true}
)

module.exports = mongoose.model("Emprunt", EmpModele)