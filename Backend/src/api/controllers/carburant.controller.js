
const db = require('../../database/db.config');
const Carburant = db.carburants;
exports.create=(req, res) => {
    
    
        const {vehicule_id, litres} = req.body;
        if(!vehicule_id || !litres  ) {
            return res.status(400).send({
                message : 'content can not be empty'
            })
        }
    
    const newCarburant = new Carburant({
        vehicule_id: vehicule_id,
        litres: litres,
       
        
    });
    newCarburant.save(newCarburant).then((data) =>{
        res.status(200).send({
            message: 'successufully created carburant'
        })
    }).catch(err =>{
        console.log(err);
    });
},
    exports.findAll = (req, res) => {
        Carburant.find({
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
        Carburant.findById(id).then((data) => {
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
        Carburant.findByIdAndDelete(id).then((data) => {
         if(!data){
             res.status(404).send({ message: "Carburant not found "});  
         }
         res.status(200).send({ message: "Carburant was successfull deleted "});
        })
     },

     exports.update = (req, res) => {
        const id = req.params.id;
       
        Carburant.findByIdAndUpdate(id)
            .then((data) => {
                if (!data) {
                    res.status(404).send({ message: "Carburant not found "});
                    return;
                }
                res.status(200).send({ message: "Carburant was successfully updated "});
            })
            .catch((error) => {
                console.error("Error updating Carburant:", error);
                res.status(500).send({ message: "Error updating Carburant", error });
            });
    };
   