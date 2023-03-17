

const{
    ajouterNote,
    calculerMoyenne,
    afficherNote,
} = require("../Controllers/Moyenne")

const MoyenneRoute = require("express").Router()

MoyenneRoute
    .post("/ajouterNote", ajouterNote)
    .get("/CalculerMoy", calculerMoyenne)
    .get("/Afficher",afficherNote)


    module.exports = MoyenneRoute