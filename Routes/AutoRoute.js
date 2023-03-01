const{
    seconnecter,
} = require ("../Controllers/Authentification")

const authentificationRoute = require("express").Router()

authentificationRoute
    .post("/Seconnecter", seconnecter)

    module.exports = authentificationRoute