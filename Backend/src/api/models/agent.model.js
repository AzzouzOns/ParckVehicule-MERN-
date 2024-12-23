
module.exports = mongoose => {
    const Schema =  mongoose.Schema;
    let AgentSchema = new Schema({
        nom: { type: String, required: true},
        prenom: { type: String, required: true},
        Telephone: {type:Number, required: true},

    }, {
        timestamps: true  
    });
    AgentSchema.method('toJSON', function(){
        const{__v, _id, ...object}= this.toObject();
        object.id = _id;
        return object;
    })
    const Agent = mongoose.model('Agent', AgentSchema);
    return Agent;
}