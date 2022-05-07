const {Schema, model} = require('mongoose');

const QueriesSchema = Schema ({

    type: {
        type: String,
        required: true
    },
    idPet:{
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Pet'
    },
    position: {
        type: Number,
        required: true
    },
    idUser:{
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
    reports: [{
        typeReport: {type: String},
        reportId: {type: String},
        url: {type: String, required: true}
    }],
    service: {
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Service'
    },
    firstObservation: {
        type: String
    },
    tests: {
        type: String
    },
    treatment: [{
        type: Schema.Types.ObjectId,
        ref: 'Treatment'
    }],
    diagnostic: {
        type: String
    },
    finish: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        required: true
    },
    active: {
        type: Boolean,
        default: true,
    },
    deleteDate: {
        type: Date
    },
    deleteUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    deleteReason: {
        type: String
    }
});

//Para cambiar el nombre a un atributo o no visualizar uno que no quieres
QueriesSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Queries', QueriesSchema);
