const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
       rating: {
        type: Number,
        required: true,
        default: 2.5,
    },
       uclwinner: {
        type: Boolean,
        default: false,
    },
       location: {
        type: String,
        enum: ['England', 'Italy', 'France', 'Spain', 'Germany']
    },
},
{timestamps: true})

module.exports = mongoose.model('Team', teamSchema)