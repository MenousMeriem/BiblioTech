
const expressAsyncHandler = require("express-async-handler");
const LivreModele = require("../Models/LivreModele");
const nodemailer = require("nodemailer");
const UtilisateurModel = require("../Models/UtilisateurModel");



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

//Afficher un livre par categorie // QUERY 
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
        const {IdCategorie, Nom, Auteur, Note, Nb_Total_Livre} = req.body
        if ( !IdCategorie || !Nom || !Auteur || !Note || !Nb_Total_Livre) {
            res.status(400).json("Aucun livre n'est disponible")
        }
        const livre = await LivreModele.create ({
            IdCategorie,Nom, Auteur, Note, Nb_Total_Livre
        })

        const users = await UtilisateurModel.find()
        users.forEach( us => {
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'danial.hegmann@ethereal.email',
                    pass: 'Trzm8hjdPFPaX49D9d'
                }
                });
            
                // send mail with defined transport object
                let info =  transporter.sendMail({
                from: 'meriemmenous1@gmail.com', // sender address
                to:  us.Mail, // list of receivers
                subject: "Hello ", // Subject line
                text: `Nouveau Livre disponible ${livre.Nom}`, // plain text body
                 },
                function (error, info) {
                    if (error) {
                    console.log(error)
                    } else {
                    console.log("Email sent: " + info.response)
                    }
              })
        })
        
    res.status(201).json("Livre ajouté !! ")
    
    } catch (error) {
        res.status(400)
        console.log(error)
    }
})

//Modifier un livre : 
exports.supprimerLivre = expressAsyncHandler(async (req,res) => {
    try {
        const {id} = req.params 
        await LivreModele.findOneAndUpdate(id)
        res.status(202).json("Livre modifié")
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
        if(exist.length == 0){
        res.status(404)
        throw new Error(" Le livre n'existe pas !!!!")
       }
        const {body} = req.body
        console.log(req.utilisateur)
        await LivreModele.findByIdAndUpdate( id, {
            $push: { Com: {User: req.utilisateur._id, body}}
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
        const { id } = req.params
        if (!id){
            res.status(400).json("Le livre n'existe pas !!!")
        } 
        const {Commentaire} = req.body
        if (!Commentaire) {
            res.status(400).json("Le commentaire n'existe pas !!!")
        }
        await LivreModele.findByIdAndUpdate( id, {
            $push: { Com: {User: req.utilisateur._id, body}}
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
        await LivreModele.findByIdAndDelete(IdCom)
        res.status(201).json("Commentaire modifier !!! ")
    
        } catch (error) {
            res.status(400)
            console.log(error)
        }
})



//Ajouter une reponse à un commentaire : 
exports.ajouterCommentaireCom = expressAsyncHandler(async (req,res) => {
    try {
        const {id,id_com} = req.params
        const {body} = req.body
        const exist = await LivreModele.findById(id)
        if(!exist){
        res.status(404)
        throw new Error(" Le livre n'existe pas !!!!")
        }
        const reponseObjet = {
            body,
            User: req.utilisateur._id
        }
        await LivreModele.findByIdAndUpdate( id, {
            $push: { "Com.$[coment].Commentaire": reponseObjet},},
            {arrayFilters: [{"coment.IdCom":id_com}]
        })
        res.status(201).json("Commentaire du commentaire ajouté !!! ")

        } catch (error) {
            res.status(400)
            console.log(error)
        }
})

//Modifier une reponse d'un commentaire :
exports.modifierCommentaireCom = expressAsyncHandler(async (req,res) => {
    try {
        const {id,id_com} = req.params
        const {body} = req.body
        const exist = await LivreModele.findById(id)
        if(!exist){
        res.status(404)
        throw new Error(" Le livre n'existe pas !!!!")
        }
        const reponseObjet = {
            body,
            User: req.utilisateur._id
        }
        await LivreModele.findByIdAndUpdate( id, {
            $push: { "Com.$[coment].Commentaire": reponseObjet},},
            {arrayFilters: [{"coment.IdCom":id_com}]
        })
        res.status(201).json("Commentaire du commentaire modifié !!! ")

        } catch (error) {
            res.status(400)
            console.log(error)
        }
})

// Supprimer une reponse d'un commentaire 
exports.supprimerCommentairecom = expressAsyncHandler(async (req,res) => {
    try {
        const {id,id_com} = req.params
        const {body} = req.body
        const exist = await LivreModele.findById(id)
        if(!exist){
        res.status(404)
        throw new Error(" Le livre n'existe pas !!!!")
        }
        const reponseObjet = {
            body,
            User: req.utilisateur._id
        }
        await LivreModele.findByIdAndDelete( id, {
            $push: { "Com.$[coment].Commentaire": reponseObjet},},
            {arrayFilters: [{"coment.IdCom":id_com}]
        })
        res.status(201).json("Commentaire du commentaire supprimé !!! ")

        } catch (error) {
            res.status(400)
            console.log(error)
        }
})


