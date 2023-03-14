
const{
    afficherEmprunt,
    ajouterEmprunt,
    historiqueAfficher,
    historiqueSupprimer,
    afficherStatistique,
    modifierEmprunt,
} = require("../Controllers/EmpController")
const { protectClient } = require("../Middleware/Protect")

const EmpRoute = require("express").Router()

EmpRoute
    .get("/Afficher", afficherEmprunt)
    .post("/Ajouter",protectClient, ajouterEmprunt)
    .get("/AfficherHis/:id", historiqueAfficher)
    .delete("/SupprimerHis/:id", historiqueSupprimer)
    .get("/AfficherStatistiques", afficherStatistique)
    .put("/ModifierEmp/:Id", modifierEmprunt)
    
    module.exports = EmpRoute