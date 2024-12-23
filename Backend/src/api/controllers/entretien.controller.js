
const db = require('../../database/db.config');
const Entretien = db.entretiens;
exports.create=(req, res) => {
    
        const {vehicule_id, date, Description } = req.body;
        if(!vehicule_id || !date|| !Description ) {
            return res.status(400).send({
                message : 'content can not be empty'
            })
        }
    
    const newEntretien = new Entretien({
        vehicule_id: vehicule_id,
        date: date,
        Description: Description,
        
    });
    newEntretien.save(newEntretien).then((data) =>{
        res.status(200).send({
            message: 'successufully created Entretien'
        })
    }).catch(err =>{
        console.log(err);
    });
},
    exports.findAll = (req, res) => {
        Entretien.find({
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
        Entretien.findById(id).then((data) => {
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
       Entretien.findByIdAndDelete(id).then((data) => {
         if(!data){
             res.status(404).send({ message: "Entretien not found "});  
         }
         res.status(200).send({ message: "Entretien was successfull deleted "});
        })
     },

     exports.update = (req, res) => {
        const id = req.params.id;
       
        Entretien.findByIdAndUpdate(id)
            .then((data) => {
                if (!data) {
                    res.status(404).send({ message: "Entretien not found "});
                    return;
                }
                res.status(200).send({ message: "Entretien  was successfully updated "});
            })
            .catch((error) => {
                console.error("Error updating Entretien:", error);
                res.status(500).send({ message: "Error updating Entretien", error });
            });
    };
   