const expressAsyncHandler = require("express-async-handler");
const UtilisateurModel = require("../Models/UtilisateurModel")
const Crypt = require("bcrypt")


//Se connecter : 
exports.seconnecter = expressAsyncHandler ( async (req,res) =>{
    try {
        console.log(req.body)
        const {Mail, Motdepasse} = req.body
        if (!Mail || !Motdepasse) {
            res.status(400)
            throw new Error("C'est Vide")
        }
    
    const utilisateurExiste = await UtilisateurModel.find({ Mail : Mail })
    if (utilisateurExiste.lenght == 0 ){
        res.status(400)
        throw new Error ("L'email n'existe pas ")
    }
    const motdepasseExiste = await Crypt.compare(
        Motdepasse,
        utilisateurExiste[0].Motdepasse
    )
       res.status(201).json("Vous etes connectés")
    if(!motdepasseExiste){
        res.status(400)
        throw new Error("Mot de passe incorrect")
    }
    } catch (error) {
        res.status(400)
        throw new Error (error)
    }
})