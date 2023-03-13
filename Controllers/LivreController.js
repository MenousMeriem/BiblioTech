
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

//Afficher un livre par categorie 
exports.afficherLivreCat = expressAsyncHandler(async (req,res) =>{
    try {
        const { IdCategorie } = req.params
        if (!IdCategorie) {
          res.status(400)
          throw new Error("Il n ya pas de catégorie !!!")
        }
        const cat = await LivreModele.find({IdCategorie:IdCategorie})
        res.status(202).json(cat)
    } catch (error) {
        res.status(400)
        console.error(error)
    }
})

//Afficher un livre par Auteur 
exports.afficherLivreAuteur = expressAsyncHandler(async (req,res) =>{
    try {
        const { Auteur } = req.params
        if (!Auteur) {
          res.status(400)
          throw new Error("Il n ya pas d'auteur !!!")
        }
        const Auteu = await LivreModele.find({Auteur: Auteur})
        res.status(202).json(Auteu)
    } catch (error) {
        res.status(400)
        console.error(error)
    }
})


//Afficher un livre par Note 
exports.afficherLivreNote = expressAsyncHandler(async (req,res) =>{
    try {
        const { Note } = req.params
        if (!Note) {
          res.status(400)
          throw new Error("Il n ya pas de note !!!")
        }
        const Note_ = await LivreModele.find({Note: Note})
        res.status(202).json(Note_)
    } catch (error) {
        res.status(400)
        console.error(error)
    }
})

//Ajouter un livre : 
exports.ajouterLivre = expressAsyncHandler(async (req,res) =>{
    try {
        const {IdCategorie, Nom, Auteur, Note, Disponible,Nb_total, Nb_emprunt} = req.body
        if ( !IdCategorie || !Nom || !Auteur || !Note || !Disponible || !Nb_total || !Nb_emprunt) {
            res.status(400).json("Aucun livre n'est disponible")
        }
        await LivreModele.create ({
            IdCategorie,Nom, Auteur, Note, Disponible,Nb_total,Nb_emprunt
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

//Ajouter un commentaire : 
exports.ajouterCommentaire = expressAsyncHandler(async (req,res) => {
    try {
        const {id} = req.params
        if (!id){
            res.status(400).json("Le livre n'existe pas !!!")
        } 
        const exist = await LivreModele.findById(id)
        if(exist.length ==0){
        res.status(404)
        throw new Error(" Le livre n'existe pas !!!!")
       }

        const {Commentaire} = req.body
        console.log(req.body)
        if (!Commentaire) {
            res.status(400).json("Le commentaire n'existe pas !!!")
        }
        await LivreModele.findByIdAndUpdate( id, {
            $push: { Commentaire}
        })
        res.status(201).json("Commentaire ajouté !!! ")

        } catch (error) {
            res.status(400)
            console.log(error)
        }
})


// Modifier un commentaire 
exports.modifierCommentaire = expressAsyncHandler(async (req,res) => {
    try {
        const {id} = req.params
        if (!id){
            res.status(400).json("Le livre n'existe pas !!!")
        } 
        const exist = await LivreModele.findById(id)
        if(exist.length ==0){
        res.status(404)
        throw new Error(" Le livre n'existe pas !!!!")
       }

        const {Commentaire} = req.body
        console.log(req.body)
        if (!Commentaire) {
            res.status(400).json("Le commentaire n'existe pas !!!")
        }
        await LivreModele.findByIdAndUpdate( id, {
            $push: { Commentaire}
        })
        res.status(201).json("Commentaire modifier !!! ")

        } catch (error) {
            res.status(400)
            console.log(error)
        }
})

// Supprimer un commentaire 
exports.supprimerCommentaire = expressAsyncHandler(async (req,res) => {
    try {
        const {id} = req.params
        if (!id){
            res.status(400).json("Le livre n'existe pas !!!")
        } 
        const exist = await LivreModele.findById(id)
        if(exist.length ==0){
        res.status(404)
        throw new Error(" Le livre n'existe pas !!!!")
       }

        const {Commentaire} = req.body
        console.log(req.body)
        if (!Commentaire) {
            res.status(400).json("Le commentaire n'existe pas !!!")
        }
        await LivreModele.findByIdAndDelete( id, {
            $push: { Commentaire}
        })
        res.status(201).json("Commentaire supprimer !!! ")

        } catch (error) {
            res.status(400)
            console.log(error)
        }
})



//Ajouter un commentaire à un commentaire : 
exports.ajouterCommentaireCom = expressAsyncHandler(async (req,res) => {
    try {
        const {Commentaire} = req.params
        if (!Commentaire){
            res.status(400).json("Le commentaire n'existe pas !!!")
        } 

        res.status(201).json("Commentaire à un commentaire ajouté !!! ")

    } catch (error) {
        res.status(400)
        console.log(error)
    }
})

//Modifier un commentaire d'un commentaire :
exports.modifierCommentaireCom = expressAsyncHandler(async (req,res) => {
    try {
        const {id} = req.params
        if (!id){
            res.status(400).json("Le livre n'existe pas !!!")
        } 
        const exist = await LivreModele.findById(id)
        if(exist.length ==0){
        res.status(404)
        throw new Error(" Le livre n'existe pas !!!!")
       }

        const {Commentaire} = req.body
        console.log(req.body)
        if (!Commentaire) {
            res.status(400).json("Le commentaire n'existe pas !!!")
        }
        await LivreModele.findByIdAndUpdate( id, {
            $push: { Commentaire}
        })
        res.status(201).json("Commentaire du commentaire modifier !!! ")

        } catch (error) {
            res.status(400)
            console.log(error)
        }
})

// Supprimer un commentaire 
exports.supprimerCommentairecom = expressAsyncHandler(async (req,res) => {
    try {
        const {id} = req.params
        if (!id){
            res.status(400).json("Le livre n'existe pas !!!")
        } 
        const exist = await LivreModele.findById(id)
        if(exist.length ==0){
        res.status(404)
        throw new Error(" Le livre n'existe pas !!!!")
       }

        const {Commentaire} = req.body
        console.log(req.body)
        if (!Commentaire) {
            res.status(400).json("Le commentaire n'existe pas !!!")
        }
        await LivreModele.findByIdAndDelete( id, {
            $push: { Commentaire}
        })
        res.status(201).json("Commentaire du comentaire supprimer !!! ")

        } catch (error) {
            res.status(400)
            console.log(error)
        }
})


