
const mongoose = require("mongoose")
const Crypt = require("crypto")

const LivreModel = new mongoose.Schema ({  

        IdCategorie: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Categorie", 
            required: true,
        },
        Nom: {
            type: String, 
            required: true, 
            unique: true, 
        },
        Auteur: {
            type: String, 
            required: true,
        },
        Note: {
            type: Number, 
            required: true,
        },
        Nb_Total_Livre: {
            type: Number,
            required: true,
          },
        Nb_Emp: {
            type: Number,
            default: 0,
        },
        Nb_Res_Livre: {
            type: Number,
            default: function () {
            return this.Nb_Total_Livre
        }
        },
        
        Com:[{            
            IdCom: {
                type: String, 
                default: Crypt.randomUUID().split('-').join("")
            },
            Date: {
                type: Date, 
                default: new Date()
            }, 

            User: {
                type: mongoose.SchemaTypes.ObjectId,
                required: false,
                ref: "Utilisateur"
            },
            body:String,
            Commentaire: [{   
                    body: {
                        type : String,
                        required: false
                    },
                    IdComm: {
                        type: String, 
                        default: Crypt.randomUUID().split('-').join("")
                    },                
                    User: {
                        type: mongoose.SchemaTypes.ObjectId,
                        required: false,
                        ref:"Utilisateur"
                    },
                    Date: {
                        type: Date,
                        default: new Date()
                    }
            }],

        }],})   


    module.exports = mongoose.model("Livre", LivreModel)