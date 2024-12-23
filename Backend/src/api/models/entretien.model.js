
module.exports = mongoose => {
    const Schema =  mongoose.Schema;
    let EntretienSchema = new Schema({
        vehicule_id: { type:Number, required: true},
        date: { type: String, required: true},
        Description : {type: String, required: true},

    }, {
        timestamps: true  
    });
    EntretienSchema.method('toJSON', function(){
        const{__v, _id, ...object}= this.toObject();
        object.id = _id;
        return object;
    })
    const Entretien = mongoose.model('Entretien', EntretienSchema);
    return Entretien;
}