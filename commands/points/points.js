// points command
const tools = require('../../functions.js');
exports.run = (client, message) => {
    const key = `${message.guild.id}-${message.author.id}`;
    return message.channel.send(tools.eMaker("**__LEVEL & POINTS__**", `You currently have **__${client.points.get(key, "points")}__** points, and your level is **__${client.points.get(key, "level")}__**!`, message.author.username, message.author.avatarURL, 11208320, null, null, null));
}

module.exports.help = {
    type: "points",
    name: "points",
    desc: "Shows how many points the user has, and what level he's at",
    usage: "points"
};