const Talk = require('../models/Talk');

module.exports = {
    get_talks: (req, res, next)=>{
        Talk.find().populate('attendees.attendee').then(
            talks=>{
                res.render('talks', {talks: talks});
            }
        ).catch(next)
    },

    post_talk: (req, res, next)=>{
        Talk.create(req.body).then(talk=>{
            res.status(200).json(talk);
        }).catch(next)
    }
}