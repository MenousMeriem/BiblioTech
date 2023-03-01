const UtilisateurModel = require("../Models/UtilisateurModel");
const bcrypt = require("bcrypt")
const expressAsyncHandler = require("express-async-handler");
const { Error } = require("mongoose");


//Ajouter un utilisateur : 
exports.ajouterUtilisateur = expressAsyncHandler(async (req,res)=> {
    try {
        const {Motdepasse, ...body} = req.body
        await UtilisateurModel.create({
            ...body,
            Motdepasse: await bcrypt.hash(Motdepasse, 12),
        })
        res.status(201).json("Utilisateur ajouté avec succes !!! ")
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})


//Modifier un utilisateur : 
exports.modifierUtilisateur = expressAsyncHandler(async (req,res) => {
    try {
        
        const id = req.params.id
        const resultat = await UtilisateurModel.findByIdAndUpdate(id , req.body)
        if(!resultat){
            return res.status(404).json("l'utilisateur n'existe pas")
        }
        res.status(200).json("Utilisateur Modifier")
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})


//Supprimer un utilisateur 
exports.supprimerUtilisateur = expressAsyncHandler (async (res, req) => {
    try {
        const {ID} = req.params 
        await UtilisateurModel.findByIdAndDelete(ID)
        res.status(202).json(" Utilisateur supprimé !! ")
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})