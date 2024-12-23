
const db = require('../../database/db.config');
const Mission = db.missions;
exports.create=(req, res) => {
  
        const {description, date_deb, date_fin} = req.body;
        if(!description || !date_deb || !date_fin ) {
            return res.status(400).send({
                message : 'content can not be empty'
            })
        }
    
    const newMission= new Mission({
        description: description,
        date_deb: date_deb,
        date_fin: date_fin,
        
    });
    newMission.save(newMission).then((data) =>{
        res.status(200).send({
            message: 'successufully created Mission'
        })
    }).catch(err =>{
        console.log(err);
    });
},
    exports.findAll = (req, res) => {
        Mission.find({
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
        Mission.findById(id).then((data) => {
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
        Mission.findByIdAndDelete(id).then((data) => {
         if(!data){
             res.status(404).send({ message: "Mission not found "});  
         }
         res.status(200).send({ message: "Mission was successfull deleted "});
        })
     },

     exports.update = (req, res) => {
        const id = req.params.id;
       
        Mission.findByIdAndUpdate(id)
            .then((data) => {
                if (!data) {
                    res.status(404).send({ message: "Mission not found "});
                    return;
                }
                res.status(200).send({ message: "Mission was successfully updated "});
            })
            .catch((error) => {
                console.error("Error updating Mission:", error);
                res.status(500).send({ message: "Error updating mission", error });
            });
    };
   