
module.exports = mongoose => {
    const Schema =  mongoose.Schema;
    let MissionSchema = new Schema({
        description: { type: String, required: true},
        date_deb: { type: String, required: true},
        date_fin: {type:String, required: true},

    }, {
        timestamps: true  
    });
    MissionSchema.method('toJSON', function(){
        const{__v, _id, ...object}= this.toObject();
        object.id = _id;
        return object;
    })
    const Mission = mongoose.model('Mission', MissionSchema);
    return Mission;
}