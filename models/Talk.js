const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const talkSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    attendees:[{
        attendee: {
            type: Schema.Types.ObjectId,
            ref: 'Attendee'
        }
    }]
})

module.exports = mongoose.model('Talk', talkSchema);