
module.exports = mongoose => {
    const Schema =  mongoose.Schema;
    let VehiculeSchema = new Schema({
        matricule: { type: String, required: true},
        marque: { type: String, required: true},
        model: { type: String, required: true},
        couleur: { type: String, required: true},

    }, {
        
    });


    VehiculeSchema.method('toJSON', function(){
        const{__v, _id, ...object}= this.toObject();
        object.id = _id;
        return object;
    })
    const Vehicule = mongoose.model('Vehicule', VehiculeSchema);
    return Vehicule;

}