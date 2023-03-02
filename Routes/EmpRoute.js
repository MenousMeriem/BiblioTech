
const{
    afficherEmprunt,
    ajouterEmprunt,
} = require("../Controllers/EmpController")
const { protectClient } = require("../Middleware/Protect")

const EmpRoute = require("express").Router()

EmpRoute
    .get("/Afficher", afficherEmprunt)
    .post("/Ajouter",protectClient, ajouterEmprunt)

    module.exports = EmpRoute