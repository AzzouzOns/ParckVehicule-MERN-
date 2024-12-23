const config = require('../config/config');
const mongoose = require('mongoose');
const db = {};
mongoose.Promise = global.Promise;
mongoose.set('strictQuery',false);
db.mongoose = mongoose;
db.url = config.DB_URL;
db.posts= require('../api/models/post.model')(mongoose);
db.agents= require('../api/models/agent.model')(mongoose);
db.vehicules= require('../api/models/vehicule.model')(mongoose);
db.entretiens= require('../api/models/entretien.model')(mongoose);
db.carburants= require('../api/models/carburant.model')(mongoose);
db.missions=require('../api/models/mission.model')(mongoose);

module.exports = db;