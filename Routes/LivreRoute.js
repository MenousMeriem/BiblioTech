const{
    afficherLivre,
    afficherLivreCat,
    afficherLivreAuteur,
    afficherLivreNote,
    ajouterLivre,
    supprimerLivre,
} = require("../Controllers/LivreController")
const { protectEmploye } = require("../Middleware/Protect")

const LivreRoute = require("express").Router()

LivreRoute
    .get("/Afficher", afficherLivre)
    .get("/Affichercat/:IdCategorie", afficherLivreCat)
    .get("/AfficherAuteur/:Auteur",afficherLivreAuteur)
    .get("/AfficherNote/:Note",afficherLivreNote)
    .post("/Ajouter",protectEmploye, ajouterLivre)
    .delete("/Supprimer/:id", protectEmploye, supprimerLivre)

    module.exports = LivreRoute 



