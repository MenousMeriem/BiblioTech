
const expressAsyncHandler = require("express-async-handler");
const LivreModele = require("../Models/LivreModele");

//Afficher un livre 
exports.afficherLivre = expressAsyncHandler(async (req,res) =>{
    try {
        const livre = await LivreModele.find()
        console.log(req.Utilisateur)
        res.status(202).json(livre)
    } catch (error) {
        res.status(400)
        console.error(error)
    }
})

//Ajouter un livre : 
exports.ajouterLivre = expressAsyncHandler(async (req,res) =>{
    try {
        const { Nom, Auteur, Note, Disponible } = req.body
        if (!Nom || !Auteur || !Note || !Disponible) {
            res.status(400).json("Aucun Livre est disponible")
        }
        await LivreModele.create ({
            Nom, Auteur, Note, Disponible
        })
        res.status(201).json("Livre ajouté !! ")
    } catch (error) {
        res.status(400)
        console.log(error)
    }
})

//Supprimer un livre : 
exports.supprimerLivre = expressAsyncHandler(async (req,res) => {
    try {
        const {id} = req.params 
        await LivreModele.findByIdAndDelete(id)
        res.status(202).json("Livre supprimé")
    } catch (error) {
        res.status(400)
        console.log(error)
    }
})