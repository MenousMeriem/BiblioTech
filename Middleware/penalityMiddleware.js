const expressAsyncHandler = require('express-async-handler')
const EmpModel = require('../Models/EmpModele')
const UserModel = require('../Models/UtilisateurModel')

const hasPenality = expressAsyncHandler(async (req,res,next) => {
    try {
        const emps = await EmpModel.find({Id_Client: req.utilisateur._id})
        if(emps.length === 0) {
            next()
        }
        const currentDate = new Date().getTime()
        emps.forEach(async (em) => {
            const duree = em.Nbre_jr*24*3600*1000
            if((new Date(em.createdAt).getTime()+duree) < currentDate) {
                await UserModel.findByIdAndUpdate(req.utilisateur._id, {active: false})
                setTimeout(async () => {
                    await UserModel.findByIdAndUpdate(req.utilisateur._id, {active: true})
                },864000000)
                next("TU as dépasser les delais")
            } else {next()}
        })
    }catch (err) {
        res.status(400)
        throw new Error(err)}
})
module.exports=hasPenality