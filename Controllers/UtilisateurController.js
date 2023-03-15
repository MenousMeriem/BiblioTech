const UtilisateurModel = require("../Models/UtilisateurModel");
const bcrypt = require("bcrypt")
const expressAsyncHandler = require("express-async-handler");
const { Error } = require("mongoose");
const nodemailer = require("nodemailer");


//Ajouter un utilisateur : 
exports.ajouterUtilisateur = expressAsyncHandler(async (req,res)=> {
    try {
        const {Motdepasse, ...body} = req.body
       const user =  await UtilisateurModel.create({
            ...body,
            Motdepasse: await bcrypt.hash(Motdepasse, 12),
        })

"use strict";
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'danial.hegmann@ethereal.email',
        pass: 'Trzm8hjdPFPaX49D9d'
    }
});

  // send mail with defined transport object
  let info =  transporter.sendMail({
    from: 'meriemmenous1@gmail.com', // sender address
    to:  user.Mail, // list of receivers
    subject: "Hello ", // Subject line
    text: `Welcome ${user.Nom}`, // plain text body
  },
  function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })

    res.status(201).json("Utilisateur ajouté avec succes !!! ")
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})


//Modifier un utilisateur : 
exports.modifierUtilisateur = expressAsyncHandler(async (req,res) => {
    try {
        
        const id = req.params.id
        const resultat = await UtilisateurModel.findByIdAndUpdate(id , req.body)
        if(!resultat){
            return res.status(404).json("l'utilisateur n'existe pas")
        }
        res.status(200).json("Utilisateur Modifier")
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})


//Supprimer un utilisateur 
exports.supprimerUtilisateur = expressAsyncHandler (async (res, req) => {
    try {
        const {ID} = req.params 
        await UtilisateurModel.findByIdAndDelete(ID)
        res.status(202).json(" Utilisateur supprimé !! ")
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})