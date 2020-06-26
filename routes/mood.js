const express = require('express');
const router = express.Router();

const check_auth = require('../middlewares/check_auth');
const mood_controllers = require('../controllers/mood');
const mood_db = require('../models/mood');


router.post('/', check_auth, mood_controllers.post_new_mood);

router.get('/', check_auth, mood_controllers.get_all_moods);

module.exports = router;