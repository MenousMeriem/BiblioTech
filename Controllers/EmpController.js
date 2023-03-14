const expressAsyncHandler = require("express-async-handler");
const EmpModele = require("../Models/EmpModele");
const LivreModele = require("../Models/LivreModele");
const UtilisateurModel = require("../Models/UtilisateurModel");



//Creer un emprunt : 
exports.ajouterEmprunt = expressAsyncHandler(async(req,res) => {
    try {
        const { Id_Livre, Nbre_jr } = req.body

      if (!Id_Livre || !Nbre_jr) {
        res.status(400)
        throw new Error("C'est vide !")
      }

       const Emprunt = await EmpModele.find({
        Id_Client: req.utilisateur?._id,
      })
      const Mois = 2629800000
      const currentDate = new Date().getTime()
      let Empmois = []
      
      Emprunt.forEach((a) => {
        if(((new Date(a.createdAt).getTime())+(a.Nbre_jr*24*3600*1000)) < currentDate) {
          res.status(400)
          throw new Error("")
        }
        if (new Date()  - new Date(a.createdAt) <= Mois) {
          return Empmois.push(a)
        }
      })

      if (Empmois.length >= 3) {
        res.status(400)
        throw new Error("Tu ne peux pas encore prendre un livre, vous avez dépassé 3 emprunts en un mois")
      } 

      const livre = await LivreModele.findById(Id_Livre)
      if (livre?.Nb === 0) {
        res.status(400)
        throw new Error("Le Livre n'est pas disponible")
      }
      console.log(req.utilisateur)
      await EmpModele.create({
        Id_Client: req.utilisateur?._id,
        Id_Livre,
        Nbre_jr,
      })

      await UtilisateurModel.findByIdAndUpdate(req.utilisateur?._id, { $inc: { NBLE: 1 } })
      
      await LivreModele.findByIdAndUpdate(Id_Livre, {
        $inc: { Nb_res: -1, Nb_emp: 1 },
      })

      res.status(201).json("Le livre a bien été emprunté")
    } 

    catch (error) {
      res.status(400)
      throw new Error(error)
    }
  })

// Afficher les pénalatités : 

exports.afficherPenalites = expressAsyncHandler(async(req,res)=> {
   
  try {
    const { Id_Livre, Nbre_jr } = req.body

    if (!Id_Livre || !Nbre_jr) { 
      res.status(400)
      throw new Error("C'est vide !")
    }
    const Emp = await EmpModele.find({
      Id_Client: req.utilisateur?._id,
    })
    console.log(req.utilisateur)
    const Jrs = 864000000 
    
    Emp.forEach((a) => {
      if (new Date()  - new Date(a.createdAt) <= Jrs) {
        
      }
    }
    
  )} 
  catch (error) {
    res.status (400)
    throw new Error (error)
  }
})

  //Modifier un emprunts
  exports.modifierEmprunt = expressAsyncHandler(async(req,res) => {
      try {
        const { Id } = req.params
        const { User } = req.body
        
        if (!User) {
          res.status(400)
          throw new Error("Utilisateur n'existe pas")
        }
        await EmpModele.findOneAndUpdate(
          { User, Id_livre: Id },
          { Rendre: true }
        )
        await LivreModele.findByIdAndUpdate(Id, { $inc: { Nb_res: 1 } })
        res.status(202).json("Livre rendu !!!!!!")
      } 
      catch (error) {
        res.status(400)
        throw new Error(error)
      }
    }
  )


//Afficher tous les emprunts : 
exports.afficherEmprunt = expressAsyncHandler(async(req,res) => {
    try {
        const Emprunt = await EmpModele.find()
        res.status(200).json(Emprunt)
    } catch (error) {
        res.status(400)
        console.Error(error)
    }
})


// Afficher les statistiques : 
// CHARTS 
exports.afficherStatistique = expressAsyncHandler(async(req,res)=>{
    try {
      
      const Nb_livre = (await LivreModele.find()).length
      const Nb_emp = (await EmpModele.find()).length
      const Nb_total = (await EmpModele.find()).length
      const Nb_res = (await EmpModele.find()).length
      
      res.status(202).json({
      livres_nb :`Nombre de livres est ${Nb_livre}`,
      nb_emp :`Nombre de livres est ${Nb_emp}`,
      nb_total :`Nombre de livres est ${Nb_total}`,
      nb_res :`Nombre de livres est ${Nb_res}`,
      })

    } catch (err) {
      res.status(404)
      console.Error(error)
    }
})


//Afficher l'historique : 
exports.historiqueAfficher = expressAsyncHandler(async(req,res) =>{ 
  try {
  const {id} = req.params
  if (!id){
      res.status(400).json("L'id n'existe pas !!!")
  } 

  const exist = await UtilisateurModel.findById(id)
  if(exist.length == 0){
  res.status(404)
  throw new Error("L'utilisateur n'existe pas !!!!")
  }


  const his = await EmpModele.findById(id)
  res.status(201).json(his)

  } catch (error) {
      res.status(400)
      console.log(error)
  }
})

//Supprimer l'historique: 
exports.historiqueSupprimer = expressAsyncHandler(async(req,res) =>{ 
  try {

  const {id} = req.params
  if (!id){
      res.status(400).json("L'id n'existe pas !!!")
  } 

  const exist = await UtilisateurModel.findById(id)
  if(exist.length ==0){
  res.status(404)
  throw new Error(" L'utilisateur n'existe pas !!!!")
 }
  const his = await EmpModele.findByIdAndDelete(id)
  res.status(201).json(his)

  } catch (error) {
      res.status(400)
      console.log(error)
  }
})
 
  

