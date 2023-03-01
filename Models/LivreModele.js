const mongoose = require("mongoose")

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
        }
        
    })

    module.exports = mongoose.model("Livre", LivreModel)