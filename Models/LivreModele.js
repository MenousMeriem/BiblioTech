
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
        },
        Disponible: {
            type: String, 
            required: true, 
        },
        Auteur: {
            type: String, 
            required: true,
        },
        Note: {
            type: String, 
            required: true,
        },
        Nb_emp: {
            type: Number,
            default: 0,
        },
        Nb_total: {
            type: Number,
            required: true,
          },
        Nb_res: {
            type: Number,
            default: function () {
            return this.Nb_total
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