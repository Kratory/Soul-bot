//TEST COMMAND (ping)
const tools = require('../../functions.js');
exports.run = (client, message, args) => {
    message.channel.send(tools.eMaker(null, 'Pinging...', message.author.username, message.author.avatarURL, 11208320, null, null, null))
        .then((msg) => {
            msg.edit(tools.eMaker(null, "Ping: " + Math.abs((Date.now() - msg.createdTimestamp) / 1000), message.author.username, message.author.avatarURL, 11208320, null, null, null));
        })
};

module.exports.help = {
    type: "management",
    name: "ping",
    desc: "Pings the bot.",
    usage: "ping"
};