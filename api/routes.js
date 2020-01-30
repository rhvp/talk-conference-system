const express = require('express');
const router = express.Router();
const talk = require('../controllers/talkController');
const attendee = require('../controllers/attendeeController')
router.get('/', (req, res, next)=>{
    res.render('home')
})

router.get('/talks', talk.get_talks);
router.get('/talks/:id', talk.get_talk_detail);
router.post('/talk', talk.post_talk);
router.get('/talk/addAttendee', talk.add_talk_attendee);

router.get('/attendees', attendee.get_attendees);
router.post('/attendee', attendee.post_attendee);

module.exports = router;