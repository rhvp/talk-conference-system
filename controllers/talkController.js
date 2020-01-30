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

    get_talk_detail: async (req, res)=>{
       const talk = await Talk.findById(req.params.id).populate('attendees');
       const attendees = await Attendee.find();
       res.render('talkDetails', {talk: talk, attendees: attendees});
    },

    add_talk_attendee: async (req, res)=>{
        let talk_id =  req.query.talk_id;
        let new_attendee_id = req.query.new_Attendee_id;
        const talk = await Talk.findById(talk_id);
        
        let n = talk.attendees.includes(new_attendee_id);
        if(n) {
            res.statusMessage = "Attendee has already been added";
            res.status(304).end();
        } else {
            talk.attendees.push(new_attendee_id)
            talk.save((err)=>{
                if(err) {
                    console.log(err);
                    res.status(500);
                }
                res.status(201).send('Attendee Added');
            });
        }
    },

    delete_talk: (req, res, next)=>{
        Talk.findByIdAndDelete(req.params.id).then(
            res.status(204).end()
        ).catch(next)
    }
}