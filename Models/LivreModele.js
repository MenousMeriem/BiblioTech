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
        },
    }
        
    })

    module.exports = mongoose.model("Livre", LivreModel)