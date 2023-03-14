const{
    afficherLivre,
    afficherLivreCat,
    afficherLivreAuteur,
    afficherLivreNote,
    ajouterLivre,
    supprimerLivre,
    ajouterCommentaire,
    modifierCommentaire,
    supprimerCommentaire,
    ajouterCommentaireCom,
    modifierCommentaireCom,
    supprimerCommentairecom,
} = require("../Controllers/LivreController")
const { protectEmploye, protectClient } = require("../Middleware/Protect")

const LivreRoute = require("express").Router()

LivreRoute
    .get("/Afficher", afficherLivre)
    .get("/Affichercat/:IdCategorie", afficherLivreCat)
    .get("/AfficherAuteur/:Auteur",afficherLivreAuteur)
    .get("/AfficherNote/:Note",afficherLivreNote)
    .post("/Ajouter",protectEmploye, ajouterLivre)
    .delete("/Supprimer/:id", protectEmploye, supprimerLivre)
    .put("/AjouterCom/:id",protectClient, ajouterCommentaire)
    .put("/ModifierCom/:id", modifierCommentaire)
    .delete("/SupprimerCom/:id", supprimerCommentaire)
    .put("/AjouterComCom/:id/:id_com",protectClient, ajouterCommentaireCom)
    .put("/ModifierComCom/:IdCom", modifierCommentaireCom)
    .delete("/SupprimerComCom/:IdCom", supprimerCommentairecom)
    module.exports = LivreRoute 



