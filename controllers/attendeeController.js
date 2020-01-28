const Attendee = require('../models/Attendee');

module.exports = {
    get_attendees: (req, res, next)=> {
        Attendee.find().then(attendees=>{
            res.render('attendees', {attendees: attendees})
        }).catch(next)
    },
    post_attendee: (req, res, next)=> {
        Attendee.create(req.body).then(attendee=>{
            res.status(200).json(attendee)
        }).catch(next)
    }
}