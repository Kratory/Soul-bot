// pause command
const tools = require('../../functions.js');
const play = require('./play.js');
exports.run = (client, message) =>{
    if(!message.member.voiceChannel) return message.channel.send(tools.eMaker(null, "Gotta be on voice channel for that mate!", message.author.username, message.author.avatarURL, 11208320, null, null, null));
    if(play.serverQueue && play.serverQueue.playing){
        play.serverQueue.playing = false;
        play.serverQueue.connection.dispatcher.pause();
        console.log("Song paused.");
        message.delete({timeout: 1000});
        return message.channel.send(tools.eMaker(null, "Song paused, use **__resume__** to... resume it!", null, null, 11208320, null, null, null, null));
    }
    else return message.channel.send(tools.eMaker(null, "No song going on, u mad?", message.author.username, message.author.avatarURL, 11208320, null, null, null));
};

module.exports.help = {
    type: "music",
    name: "pause",
    desc: "Pauses the current song, to be resumed at some point.",
    usage: "pause"
};