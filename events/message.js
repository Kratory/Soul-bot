module.exports = (client, message) => {
const config = require("../config/config.json");
const tools = require("../functions.js");

// Ignore other bots, and self.
if(message.author.bot) return undefined;

// Point system
if(message.guild){
    const key = `${message.guild.id}-${message.author.id}`;

    client.points.ensure(`${message.guild.id}-${message.author.id}`, {
        user: message.author.id,
        guild: message.guild.id,
        points: 0,
        level: 1
    });
    client.points.inc(key, "points");

    const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));

    if(client.points.get(key, "level") < curLevel){
        message.reply(tools.eMaker("**__LEVEL UP__**", `You just leveled up! Your level now is **__${curLevel}__**`, message.author.username, message.author.avatarURL, 11208320, null, null, null));
        client.points.set(key, curLevel, "level");
    }
}

// Ignore messages not starting with prefix
if(message.content.indexOf(config.PREFIX) !== 0) return undefined;

// Args default definition for commands
const music_args = message.content.split(' ');

const args = message.content.slice(config.PREFIX.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
     
// Command data from client.commands Enmap
const cmd = client.commands.get(command);
// If cmd doesnt exist
if(!cmd) return undefined;

// Run the command
cmd.run(client, message, music_args);
//else cmd.run(client, message, args);

};