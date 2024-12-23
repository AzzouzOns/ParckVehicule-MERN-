
module.exports = mongoose => {
    const Schema =  mongoose.Schema;
    let CarburantSchema = new Schema({
        vehicule_id:  { type:Number, required: true},
        litres:  { type:Number, required: true},
        
    }, {
        timestamps: true  
    });
    CarburantSchema.method('toJSON', function(){
        const{__v, _id, ...object}= this.toObject();
        object.id = _id;
        return object;
    })
    const Carburant = mongoose.model('Carburant', CarburantSchema);
    return Carburant;
}