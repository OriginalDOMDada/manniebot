# manniebot

'use strict';

var Bot = require('slackbots');

var MannieBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'manniebot';

    this.user = null;
};

// inherits methods and properties from the Bot constructor
util.inherits(MannieBot, Bot);


MannieBot.prototype.run = function () {
    MannieBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

MannieBot.prototype._onStart = function () {
    this._loadBotUser();
    this._firstRunCheck();
};


MannieBot.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};


MannieBot.prototype._welcomeMessage = function () {
    this.postMessageToChannel(this.channels[0].name, 'Hi' + this.name + '` welcome to my slack',
        {as_user: true});
};


MannieBot.prototype._onMessage = function (message) {
    if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFromMannieBot(message) &&
        this._isMentioningMannie(message)
    ) {
        this._replyWithPizza(message);
    }
};

MannieBot.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

MannieBot.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'C';
};

MannieBot.prototype._isFromMannieBot = function (message) {
    return message.user === this.user.id;
};


NorrisBot.prototype._isMentioningMannie = function (message) {
    return message.text.toLowerCase().indexOf('mannie') > -1 ||
        message.text.toLowerCase().indexOf(this.name) > -1;
};


MannieBot.prototype._replyWithPizza = function (originalMessage) {
    var self = this;
    var channel = self._getChannelById(originalMessage.channel);
    var pizza = ':pizza:';
    self.postMessageToChannel(channel.name, pizza, {as_user: true});
};

module.exports = MannieBot;

