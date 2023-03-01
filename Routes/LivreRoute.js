const{
    afficherLivre,
    ajouterLivre,
    supprimerLivre,
} = require("../Controllers/LivreController")

const LivreRoute = require("express").Router()

LivreRoute
    .get("/Afficher", afficherLivre)
    .post("/Ajouter", ajouterLivre)
    .delete("/Supprimer/:id", supprimerLivre)

    module.exports = LivreRoute 



