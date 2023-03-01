const express = require("express")
const mongoose = require("mongoose")
const ErrorHandler = require("./Middleware/ErrorHandler")
const LivreRoute = require("./Routes/LivreRoute")
const UtilisateurRoute = require("./Routes/UtilisateurRoute")
const EmpRoute = require("./Routes/EmpRoute")
const CategorieRoute = require("./Routes/CategorieRoute")
const AutoRoute = require ("./Routes/AutoRoute")

require("dotenv").config()

const index = express()
index.use(express.json())
index.use(express.urlencoded({ extended: true}))

index.use("/utilisateur", UtilisateurRoute)
index.use("/livre", LivreRoute)
index.use("/emprunt", EmpRoute)
index.use("/categorie", CategorieRoute)
index.use("/login", AutoRoute)


index.use("/*",(req,res) => {
    res.status(404).json(" Not Found !! ")
})

index.use(ErrorHandler)

// mongoose.set('strictQuery', false)

mongoose 
    .connect(process.env.MONGO_URI)
    .then((res) => {
        index.listen(process.env.PORT, () => {
            console.log(" Server Running !! ")
        })
    })

    .catch((err) => console.log(err))