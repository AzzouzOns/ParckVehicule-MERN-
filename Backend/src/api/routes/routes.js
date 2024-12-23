module.exports = app => {
    const router = require('express').Router();
    const postController = require('../controllers/post.controllers');
    const agentController = require('../controllers/agent.controller');
    const vehiculeController = require('../controllers/vehicule.controller');
    const entretienController = require('../controllers/entretien.controller');
    const carburantController = require('../controllers/carburant.controller');
    const missionController = require('../controllers/mission.controller');
    const userController = require('../controllers/user.conroller');

    router.post('/agents', agentController.create);
    router.get('/agents', agentController.findAll);
    router.get('/agents/:id', agentController.findOne);
    router.delete('/agents/:id', agentController.delete);
    router.put('/agents/:id', agentController.update);

    router.post('/vehicules', vehiculeController.create);
    router.get('/vehicules', vehiculeController.findAll);
    router.get('/vehicules/:id', vehiculeController.findOne);
    router.delete('/vehicules/:id', vehiculeController.delete);
    router.put('/vehicules/:id', vehiculeController.update);
    router.get('/vehicules/:id/entretiens', vehiculeController.getEntretiensByVehiculeId);

    router.post('/register', userController.createUser); 
    router.post('/login', userController.login); 

    router.post('/entretiens', entretienController.create);
    router.get('/entretiens', entretienController.findAll);
    router.get('/entretiens/:id', entretienController.findOne);
    router.delete('/entretiens/:id', entretienController.delete);
    router.put('/entretiens/:id', entretienController.update);

    router.post('/carburants', carburantController.create);
    router.get('/carburants', carburantController.findAll);
    router.get('/carburants/:id', carburantController.findOne);
    router.delete('/carburants/:id', carburantController.delete);
    router.put('/carburants/:id', carburantController.update);

    router.post('/missions', missionController.create);
    router.get('/missions', missionController.findAll);
    router.get('/missions/:id', missionController.findOne);
    router.delete('/missions/:id', missionController.delete);
    router.put('/missions/:id', missionController.update);

    app.use('/api/', router);
}
