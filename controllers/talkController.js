const Talk = require('../models/Talk');
const Attendee = require('../models/Attendee');

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
            res.status(201).json(talk);
        }).catch(next)
    },

    get_talk_detail: async (req, res, next)=>{
       try {
        const talk = await Talk.findById(req.params.id).populate('attendees');
        const attendees = await Attendee.find();
        res.render('talkDetails', {talk: talk, attendees: attendees});
       } catch(err){
           next(err);
       }
       
    },

    add_talk_attendee: async (req, res, next)=>{
        let talk_id =  req.query.talk_id;
        let new_attendee_id = req.query.new_Attendee_id;
        try {
            const talk = await Talk.findById(talk_id);
            const attendee = await Attendee.findById(new_attendee_id);
            let attendee_exists = talk.attendees.includes(new_attendee_id);
        if(attendee_exists) {
            res.statusMessage = "Attendee has already been added";
            res.status(304).end();
        } else {
            talk.attendees.push(new_attendee_id)
            talk.save((err)=>{
                if(err) {
                    res.status(500).end();
                }
                res.status(201).send(attendee);
            });
        }
        } catch(err){
            next(err);
        }
        
        
        
    },

    delete_talk: (req, res, next)=>{
        Talk.findByIdAndDelete(req.params.id).then(
            res.status(204).end()
        ).catch(next)
    }
}