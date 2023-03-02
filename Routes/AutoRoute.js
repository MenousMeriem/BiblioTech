const{
    seconnecter,  
    refreshAccess,
} = require ("../Controllers/Authentification")

const authentificationRoute = require("express").Router()
const { protectEmploye } = require("../Middleware/Protect")

authentificationRoute
    .post("/Seconnecter", seconnecter)
    .post("/token", protectEmploye, refreshAccess)
  

module.exports = authentificationRoute

    
      

     