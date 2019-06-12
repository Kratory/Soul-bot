// shuffle command
const tools = require('../../functions.js');
const play = require('./play.js');

exports.run = (client, message) => {
    if(!message.member.voiceChannel) return message.channel.send(tools.eMaker(null, "Gotta be on voice channel for that mate!", message.author.username, message.author.avatarURL, 11208320, null, null, null));
    if(!play.serverQueue) return message.channel.send(tools.eMaker(null, "No song going on, u mad?", message.author.username, message.author.avatarURL, 11208320, null, null, null));
    if(play.serverQueue.songs.length < 3) return message.channel.send(tools.eMaker(null, "What do you want me to shuffle? Jeez...", message.author.username, message.author.avatarURL, 11208320, null, null, null)); 

    
    console.log("Queue shuffled.");
    message.delete({timeout: 1000});
    message.channel.send(tools.eMaker("**Shuffling...**", `${play.serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')} \n\n**Now playing:** **__${play.serverQueue.songs[0].title}__**`, message.author.username, message.author.avatarURL, 11208320, null, null, null))
        .then((msg) => {
            function edit(){
                msg.edit(tools.eMaker("**QUEUE SHUFFLED!**", `${play.serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')} \n\n**Now playing:** **__${play.serverQueue.songs[0].title}__**`, message.author.username, message.author.avatarURL, 11208320, null, null, null));
            };
            tools.kShuffle(play.serverQueue.songs, [0,1]); // KEEP POSTION 0 AND 1 (AVOIDS PROBLEMS WITH NOW PLAYING AND PLAYING NEXT)
            setTimeout(edit, 1500);
        });
    
    return undefined;
};

module.exports.help = {
    type: "music",
    name: "shuffle",
    desc: "Randomizes the current server queue.",
    usage: "shuffle"
};