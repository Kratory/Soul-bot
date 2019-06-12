// resume command
const tools = require('../../functions.js');
const play = require('./play.js');
exports.run = (client, message) =>{
    if(play.serverQueue && !play.serverQueue.playing){
        play.serverQueue.playing = true;
        play.serverQueue.connection.dispatcher.resume();
        console.log("Song resumed.");
        message.delete({timeout: 1000});
        return message.channel.send(tools.eMaker(null, `Resuming **__${play.serverQueue.songs[0].title}__**...`, null, null, 11208320, null, null, null));
    }
    return message.channel.send(tools.eMaker(null, "No paused song brotha!", null, null, 11208320, null, null, null));
};

module.exports.help = {
    type: "music",
    name: "resume",
    desc: "Resumes a paused song.",
    usage: "resume"
};