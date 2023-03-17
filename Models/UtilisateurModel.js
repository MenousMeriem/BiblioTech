const mongoose = require("mongoose")

// Roles des utilisateurs : 
const Role = Object.freeze(["Employe","Client"])

// Genre :
const Sexe = Object.freeze(["Femme","Homme"])

//Super Classe : 

const UtilisateurModel = new mongoose.Schema( 
    {
        Nom: {
            type: String, 
            required: true, 
        }, 
        Prenom: {
            type: String, 
            required: true,
        }, 
        Sexe: {
            type: String, 
            required:true , 
            enum: Sexe,
        },
        DateNais: {
            type: Date,
            required: true, 
        },
        Adresse:{
            type: String,
            required: true, 
        },
        Tel: { 
            type: Number,
            required: true, 
        },
        Mail: {
            type: String, 
            required: true, 
            unique: true,
        },
        Motdepasse: {
            type: String,
            required: true, 
        },
        Role: {
            type: String, 
            enum: Role,
            default: "Employe",  
        },
        active: {
            type: Boolean,
            defualt: true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("utilisateur", UtilisateurModel)