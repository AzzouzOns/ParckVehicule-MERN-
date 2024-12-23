const db = require('../../database/db.config');
const Vehicule = db.vehicules;
const Entretien = require('../models/entretien.model');

exports.getEntretiensByVehiculeId = async (req, res) => {
    try {
        const vehiculeId = req.params.id;
        const entretiens = await Entretien.find({ vehicule_id: vehiculeId });
        res.status(200).json(entretiens);
    } catch (error) {
        console.error('Error fetching entretiens by vehicule ID:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.create=(req, res) => {
 

        const {matricule, marque, model, couleur} = req.body;
        if(!matricule || !marque || !model || !couleur ) {
            return res.status(400).send({
                message : 'content can not be empty'
            })
        }
    
    const newVehicule = new Vehicule({
        matricule: matricule,
        marque: marque,
        model: model ,
        couleur: couleur
        
    });
    newVehicule.save(newVehicule).then((data) =>{
        res.status(200).send({
            message: 'successufully created vehicule'
        })
    }).catch(err =>{
        console.log(err);
    });
},

exports.findAll = (req, res) => {
    Vehicule.find({
    }).then((data) => {
    res.send(data);
    }).catch((err) => {
        console.log(err);
    });
},

exports.findOne = (req, res) => {
    const id = req.params.id;
    if(!id) {
     res.status(400).send({ message: "content is required "});
    }
    Vehicule.findById(id).then((data) => {
        res.send(data); 
    }).catch((err) => {
        console.log(err);
    });
},


exports.delete = (req, res) => {
    const id = req.params.id;
    if(!id) {
     res.status(400).send({ message: "content is required "});
    }
    Vehicule.findByIdAndDelete(id).then((data) => {
     if(!data){
         res.status(404).send({ message: "Vehicule not found "});  
     }
     res.status(200).send({ message: "Vehicule was successfull deleted "});
    })
 },
 exports.update = (req, res) => {
    const id = req.params.id;
    const { matricule, marque, model, couleur } = req.body; 
    
    Vehicule.findByIdAndUpdate(id, { matricule, marque, model, couleur }, { new: true })
        .then((data) => {
            if (!data) {
                return res.status(404).send({ message: "Vehicule not found "});
            }
            return res.status(200).send({ message: "Vehicule was successfully updated ", data });
        })
        .catch((error) => {
            console.error("Error updating vehicule:", error);
            return res.status(500).send({ message: "Error updating vehicule", error });
        });
};