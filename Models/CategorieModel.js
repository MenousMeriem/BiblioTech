const mongoose = require("mongoose")

const CategorieModel = new mongoose.Schema({
    NomCat: {
        type: String, 
    }
})

module.exports  =  mongoose.model("Categorie", CategorieModel)
