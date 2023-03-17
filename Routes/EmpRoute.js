
const{
    afficherEmprunt,
    ajouterEmprunt,
    modifierEmprunt,
    renouvelerEmprunt,
    historiqueAfficher,
    afficherStatistique,
} = require("../Controllers/EmpController")
const { protectClient } = require("../Middleware/Protect")

const EmpRoute = require("express").Router()

EmpRoute
    .get("/Afficher", afficherEmprunt)
    .post("/Ajouter",protectClient, ajouterEmprunt)
    .get("/ModifierEmp/:id", modifierEmprunt)
    .put("/Renouveler/:id", renouvelerEmprunt)
    .get("/AfficherHis/:id", historiqueAfficher)
    .get("/AfficherStatistiques", afficherStatistique)


    module.exports = EmpRoute