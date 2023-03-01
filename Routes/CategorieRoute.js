
const{
    afficherCategorie,
    ajouterCategorie,
    supprimerCategorie
} = require("../Controllers/CategorieController")

const CategorieRoute = require("express").Router()

CategorieRoute
    .get("/Afficher", afficherCategorie)
    .post("/Ajouter", ajouterCategorie)
    .delete("/Supprimer/:id",supprimerCategorie)

    module.exports = CategorieRoute