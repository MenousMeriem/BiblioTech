const expressAsyncHandler = require("express-async-handler");
const EmpModele = require("../Models/EmpModele");
const LivreModele = require("../Models/LivreModele");
const UtilisateurModel = require("../Models/UtilisateurModel");



//Creer une empreinte : 
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
      console.log(req.utilisateur)
      const Mois = 2629800000
      let Empmois = []
      
      Emprunt.forEach((a) => {
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

