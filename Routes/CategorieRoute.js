
const{
    afficherCategorie,
    ajouterCategorie,
    supprimerCategorie
} = require("../Controllers/CategorieController")

const { protectEmploye } = require("../Middleware/Protect")
const CategorieRoute = require("express").Router()

CategorieRoute
    .get("/Afficher", afficherCategorie)
    .post("/Ajouter", protectEmploye,ajouterCategorie)
    .delete("/Supprimer/:id",protectEmploye, supprimerCategorie)

    module.exports = CategorieRoute