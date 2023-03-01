const expressAsyncHandler = require("express-async-handler");
const CategorieModel = require("../Models/CategorieModel");

//Afficher une categorie
exports.afficherCategorie = expressAsyncHandler(async (req,res) =>{
    try {
        const Categorie = await CategorieModel.find()
        console.log(req.Categorie)
        res.status(202).json(Categorie)
    } catch (error) {
        res.status(400)
        console.error(error)
    }
})

//Ajouter une categorie: 
exports.ajouterCategorie = expressAsyncHandler(async (req,res) =>{
    try {
        const { NomCat } = req.body
        if (!NomCat) {
            res.status(400).json("Aucune categorie n'est disponible")
        }
        await CategorieModel.create ({
            NomCat
        })
        res.status(201).json("Catégorie ajouté !! ")
    } catch (error) {
        res.status(400)
        console.log(error)
    }
})

//Supprimer une categorie : 
exports.supprimerCategorie = expressAsyncHandler(async (req,res) => {
    try {
        const {id} = req.params 
        await CategorieModel.findByIdAndDelete(id)
        res.status(202).json("Catégorie Supprimée")
    } catch (error) {
        res.status(400)
        console.log(error)
    }
})