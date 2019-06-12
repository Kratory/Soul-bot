// stop command
const tools = require('../../functions.js');
const play = require('./play.js');
exports.run = (client, message) =>{
    if(!message.member.voiceChannel) return message.channel.send(tools.eMaker(null, "Gotta be on voice channel for that mate!", message.author.username, message.author.avatarURL, 11208320, null, null, null));
    if(!play.serverQueue) return message.channel.send(tools.eMaker(null, "No song going on, u mad?", message.author.username, message.author.avatarURL, 11208320, null, null, null));
    play.serverQueue.songs = [];
    play.serverQueue.connection.dispatcher.end('Stop command issued!');
    message.delete({timeout: 1000});
    return undefined;
} 

module.exports.help = {
    type: "music",
    name: "stop",
    desc: "Stops the music, erases the queue.",
    usage: "stop"
};