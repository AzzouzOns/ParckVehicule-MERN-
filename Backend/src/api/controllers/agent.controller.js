
const db = require('../../database/db.config');
const Agent = db.agents;
exports.create=(req, res) => {
    //récupération des données
        const {nom, prenom, Telephone} = req.body;
        if(!nom || !prenom || !Telephone ) {
            return res.status(400).send({
                message : 'content can not be empty'
            })
        }
    
    const newAgent = new Agent({
        nom: nom,
        prenom: prenom,
        Telephone: Telephone,
        
    });
    newAgent.save(newAgent).then((data) =>{
        res.status(200).send({
            message: 'successufully created agent'
        })
    }).catch(err =>{
        console.log(err);
    });
},
    exports.findAll = (req, res) => {
        Agent.find({
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
        Agent.findById(id).then((data) => {
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
        Agent.findByIdAndDelete(id).then((data) => {
         if(!data){
             res.status(404).send({ message: "Agent not found "});  
         }
         res.status(200).send({ message: "Agent was successfull deleted "});
        })
     },

     exports.update = (req, res) => {
        const id = req.params.id;
        const updatedAgentData = req.body; // Assuming the updated data is sent in the request body
        
        Agent.findByIdAndUpdate(id, updatedAgentData, { new: true }) // { new: true } ensures that the updated document is returned
            .then((updatedAgent) => {
                if (!updatedAgent) {
                    res.status(404).send({ message: "Agent not found" });
                    return;
                }
                res.status(200).send({ message: "Agent was successfully updated", updatedAgent });
            })
            .catch((error) => {
                console.error("Error updating agent:", error);
                res.status(500).send({ message: "Error updating agent", error });
            });
    };
    
   