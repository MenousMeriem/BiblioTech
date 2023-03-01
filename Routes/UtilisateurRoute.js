
const{
    ajouterUtilisateur,
    modifierUtilisateur,
    supprimerUtilisateur
} = require("../Controllers/UtilisateurController")

const UtilisateurRoute = require("express").Router()

UtilisateurRoute
    .post("/Ajouter", ajouterUtilisateur)
    .put("/Modifier/:id", modifierUtilisateur)
    .delete("/Supprimer/:ID",supprimerUtilisateur)

    module.exports = UtilisateurRoute