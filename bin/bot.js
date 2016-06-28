# bin/bot.js

'use strict';

var MannieBot = require('../lib/manniebot');

var token = process.env.BOT_API_KEY;
var name = process.env.BOT_NAME;

var norrisbot = new MannieBot({
    token: 'xoxb-54852705830-aWnGp80FFQYkbWB5ViSmPpSz',
    name: 'manniebot'
});

manniebot.run();
