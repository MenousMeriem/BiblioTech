const expressAsyncHandler = require("express-async-handler");



//Creer une empreinte : 
exports.ajouterEmprunt = expressAsyncHandler(async(req,res) => {
    try {
       
      let Emp = []
        
    } catch (error) {
        
    }
})



//Afficher tous les emprunts : 
exports.afficherEmprunt = expressAsyncHandler(async(req,res) => {
    try {
        const Emprunt = await EmpModel.find()
        res.status(200).json(Emprunt)
    } catch (error) {
        res.status(400)
        console.Error(error)
    }
})

