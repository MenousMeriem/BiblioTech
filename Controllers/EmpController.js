const expressAsyncHandler = require("express-async-handler");
const EmpModele = require("../Models/EmpModele");
const LivreModele = require("../Models/LivreModele");
const UtilisateurModel = require("../Models/UtilisateurModel");



//Creer un emprunt : 
exports.ajouterEmprunt = expressAsyncHandler(async(req,res) => {
    try {
      const isActive = await UtilisateurModel.findById(req.utilisateur._id).select("active")
      console.log(isActive.active)
      const emps = await EmpModele.find({Id_Client: req.utilisateur._id})
      let isError = false
        const currentDate = new Date().getTime()
        emps.forEach((m) => {
            const duree = parseInt(m.Nbre_jr)*24*3600*1000
            if((new Date(m.createdAt).getTime()+duree) < currentDate) {
              isError=true
                setTimeout(async () => {
                  await UtilisateurModel.findByIdAndUpdate(req.utilisateur._id, {active: true})
                },864000000)
              }})
              
              if(isError) {                
                await UtilisateurModel.findByIdAndUpdate(req.utilisateur._id, {active: false})
                res.status(400)
                throw new Error("Votre compte est temporairement suspendu")}
        const { Id_Livre, Nbre_jr } = req.body

      if (!Id_Livre || !Nbre_jr) {
        res.status(400)
        throw new Error("C'est vide !")
      }

       const Emprunt = await EmpModele.find({
        Id_Client: req.utilisateur?._id,
      })
      const Mois = 2629800000
      let Empmois = []
      
      if(Emprunt.length > 0)
     { Emprunt.forEach((a) => {
        if (new Date()  - new Date(a.createdAt) <= Mois) {
          return Empmois.push(a)
        }
      })}

      if (Empmois.length >= 3) {
        res.status(400)
        throw new Error("Tu ne peux pas encore prendre un livre, vous avez dépassé 3 emprunts en un mois")
      } 
      const livre = await LivreModele.findById(Id_Livre)
      if (livre?.Nb_Res_Livre === 0) {
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
        $inc: { Nb_Res_Livre: -1, Nb_Emp: 1 },
      })
          res.status(201).json("Le livre a bien été emprunté")
    } 

    catch (error) {
      res.status(400)
      throw new Error(error)
    }
  })



// Rendre un livre
  exports.modifierEmprunt = expressAsyncHandler(async(req,res) => {
    try {
      const { id } = req.params
      const { Id_Client} = req.body
    
      if (!Id_Client) {
        res.status(400)
        throw new Error(" Utilisateur non dispo !!")
      } 
      await EmpModele.findOneAndUpdate({ Id_Client, Id_Livre: id },{ Rendre: true })
      await LivreModele.findByIdAndUpdate(id, { $inc: {Nb_Res_Livre: 1} })
        res.status(200).json("Livre rendu !!")
      } 
        catch (error) {
        res.status(400)
        throw new Error(error)
      }
  })    

//Renouveler les emprunts : 
exports.renouvelerEmprunt = expressAsyncHandler( async(req,res) => {
  try {
      const { id } = req.params
      const { Nbre_jr } = req.query
      const Emprunt = await EmpModele.findById(id)
      if (!Emprunt) {
        res.status(400)
        throw new Error("Emprunts non disponible !")
      }
      if (Emprunt.Renouveler === true) {
        res.status(400)
        throw new Error(" Emprunt deja renouveller !! !")
      }
      const Livre = await LivreModele.findById(idd)
      if (!Livre) {
        res.status(400)
        throw new Error(" Livre non disponible !! !")
      }

      Emprunt.Nbre_jr += parseInt(Nbre_jr)
      Emprunt.Renouveler = true
      await Emprunt.save()

  } catch (error) {
      res.status(400)
      console.Error(error)
  }
})


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
exports.afficherStatistique = expressAsyncHandler(async(req,res)=>{
    try {
      const Nb_Total_Livre = (await LivreModele.find()).length
      const Nb_Res_Livre = (await EmpModele.find()).length
      const Nb_Emp = (await EmpModele.find()).length

      res.status(202).json({
        Nb_Total_Livre :`Nombre de livres est ${ Nb_Total_Livre}`,
        Nb_Emp :`Nombre d'emprunts est ${Nb_Emp}`,
        Nb_Res_Livre :`Nombre des livres restants est ${Nb_Res_Livre}`,
      })

    } catch (err) {
      res.status(404)
      console.Error(err)
    }
})


//Afficher l'historique : 
exports.historiqueAfficher = expressAsyncHandler(async(req,res) =>{ 
  try {
    const his = await EmpModele.find({Id_Client: req.utilisateur?._id})
    res.status(200).json(his)
  } catch (error) {
      res.status(400)
      console.log(error)
  }
})


  

