// skip command
const tools = require('../../functions.js');
const play = require('./play.js');

exports.run = (client, message) =>{
    // TODO: Add skip vote sys. 3 votes to skip
    if(!message.member.voiceChannel) return message.channel.send(tools.eMaker(null, "Gotta be on voice channel for that mate!", message.author.username, message.author.avatarURL, 11208320, null, null, null));
    if(!play.serverQueue) return message.channel.send(tools.eMaker(null, "No song going on, u mad?", message.author.username, message.author.avatarURL, 11208320, null, null, null));
    if(play.serverQueue.songs.length < 2) return message.channel.send(tools.eMaker(null, "Nothing to skip to, fam!", message.author.username, message.author.avatarURL, 11208320, null, null, null));
    play.serverQueue.connection.dispatcher.end('Skip command issued');
    message.channel.send(tools.eMaker(null, `Song skipped.\n\n**Now playing:** **__${play.serverQueue.songs[0].title}__**`, message.author.username, message.author.avatarURL, 11208320, null, null, null));
    message.delete({timeout: 1000});
    return undefined;
};

module.exports.help = {
    type: "music",
    name: "skip",
    desc: "Skips the current song.",
    usage: "skip"
}