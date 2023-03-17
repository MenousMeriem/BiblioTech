const expressAsyncHandler = require("express-async-handler");
const Moyenne = require("../Models/Moyenne");
const moyenneModel = require("../Models/Moyenne");

// Ajouter une note 
exports.ajouterNote = expressAsyncHandler(async (req,res) =>{
    try {
        const {Note, Coef, Nom} = req.body

        if ( !Note || !Coef || !Nom) {
            res.status(400).json("Aucune note n'est disponible")
        }
        await moyenneModel.create ({
            $push: {Note,Coef,Nom} 
        })

        res.status(201).json("Note Ajouté  !! ")
    
    } catch (error) {
        res.status(400)
        console.log(error)
    }
})


// AfficherNote 
exports.afficherNote = expressAsyncHandler(async (req,res) =>{
    try {
        const Notes = await Moyenne.find()

        res.status(202).json(Notes)
    } catch (error) {
        res.status(400)
        console.error(error)
    }
})

// Calculer moyenne 
exports.calculerMoyenne = expressAsyncHandler(async(req,res) => {
try {
  const { Note, Coef, Nom } = req.body
    if (!Note || !Coef || !Nom) {
     res.status(400)
     throw new Error("C'est vide !")
    }

    let S = 0 
    let c = 0 

    const Notes = await moyenneModel.find()
    Notes.forEach( Notes => {
    c += (Coef)
    s += (Note*Coef) }
       
    )
    let Moy = s/c 
    res.status(202).json(Moy)

}
    catch (error) {
        res.status(400)
        console.error(error)
    }
})







  
