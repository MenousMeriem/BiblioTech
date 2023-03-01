
const{
    afficherEmprunt,
    ajouterEmprunt,
} = require("../Controllers/EmpController")

const EmpRoute = require("express").Router()

EmpRoute
    .get("/Afficher", afficherEmprunt)
    .post("/Ajouter", ajouterEmprunt)

    module.exports = EmpRoute