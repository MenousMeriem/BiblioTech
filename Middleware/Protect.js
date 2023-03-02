const expressAsyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

//Protect Employe
exports.protectEmploye = expressAsyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) {
      res.status(400)
      throw new Error("No token!")
    }
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const { Role, _id } = user
    const isEmploye = Role === "Employe"
    
    if (!isEmploye) {
      res.status(404)
      throw new Error("Unauthorized, you are not an Employe ")
    }
    req.utilisateur = { _id, Role }
    next()
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})



//Protect client
exports.protectClient = expressAsyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) {
      res.status(400)
      throw new Error("No token!")
    }
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const { Role, _id } = user
    const isClient = Role === "Client"
    if (!isClient) {
      res.status(404)
      throw new Error("Unauthorized, you are not a Client!")
    }
    req.utilisateur = { _id, Role }
    next()
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

