// vol command
const tools = require('../../functions.js');
const play = require('./play.js');

exports.run = (client, message, music_args) => {
    const args = music_args;
    if(!message.member.hasPermission('ADMINISTRATOR')) return undefined;
    if(!message.member.voiceChannel) return message.channel.send(tools.eMaker(null, "Gotta be on voice channel for that mate!", message.author.username, message.author.avatarURL, 11208320, null, null, null));
    if(!args[1]) return message.channel.send(tools.eMaker(null, `Volume is set to: **__${play.serverQueue.volume}__**`, message.author.username, message.author.avatarURL, 11208320, null, null, null));
    else{
        play.serverQueue.volume = args[1];
        play.serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
        message.delete({timeout: 1000});
        return message.channel.send(tools.eMaker(null, `Volume updated to: **__${play.serverQueue.volume}__**`, message.author.username, message.author.avatarURL, 11208320, null, null, null)); 
    }
};

module.exports.help = {
    type: "music",
    name: "vol",
    desc: "Tells what the current volume is, or sets a new one.",
    usage: "vol [newVal]"
};