const expressAsyncHandler = require("express-async-handler");
const UtilisateurModel = require("../Models/UtilisateurModel")
const Crypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const RefreshTokenModel = require("../Models/refreshTokenModel")

//Sign token
const generateToken = (data) => {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" })
    return token
}


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
    if(!motdepasseExiste){
        res.status(400)
        throw new Error("Mot de passe incorrect")
    }
    const accessToken = generateToken({
        _id: utilisateurExiste[0]._id,
        Role: utilisateurExiste[0].Role,
      })
      const refreshToken = jwt.sign(
        { _id: utilisateurExiste[0]._id, Role: utilisateurExiste[0].Role },
        process.env.REFRESH_TOKEN_SECRET
      )
      await RefreshTokenModel.create({ userId: utilisateurExiste[0]._id, refreshToken })
      res.status(200).json({
        _id: utilisateurExiste[0]._id,
        Mail: utilisateurExiste[0].Mail,
        Role: utilisateurExiste[0].Role,
        accessToken,
        refreshToken,
      })
    } catch (error) {
        res.status(400)
        throw new Error (error)
    }
})

//Refresh access token
exports.refreshAccess = expressAsyncHandler(async (req, res) => {
    try {
      const { token } = req.body
      if (!token) {
        res.status(400)
        throw new Error("No refreshToken!")
      }
      const refreshExists = await RefreshTokenModel.find({ refreshToken: token })
      if (refreshExists.length == 0) {
        res.status(400)
        throw new Error("No refreshToken!")
      }
      const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
      const { iat, ...data } = userData
      const accessToken = generateToken(data)
      res.status(200).json({ token: accessToken })
    } catch (error) {
      res.status(400)
      throw new Error(error)
    }
  })