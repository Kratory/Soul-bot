// queue command
const tools = require('../../functions.js');
const play = require('./play.js');

exports.run = (client, message) =>{
    if(!play.serverQueue) return message.channel.send(tools.eMaker(null, "No song going on, u mad?", message.author.username, message.author.avatarURL, 11208320, null, null, null));
    message.delete({timeout: 1000});
    return message.channel.send(tools.eMaker("**__QUEUE__**", `${play.serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')} \n\n**Now playing:** **__${play.serverQueue.songs[0].title}__**`, message.author.username, message.author.avatarURL, 11208320, null, null, null));
};

module.exports.help = {
    type: "music",
    name: "queue",
    desc: "Displays the server queue.",
    usage: "queue"
};