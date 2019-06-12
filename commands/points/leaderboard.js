// leaderboard command
const Discord = require("discord.js");
const tools = require('../../functions.js');
exports.run = (client, message) => {
    const filtered = client.points.filter(p => p.guild === message.guild.id).array();
    const sorted = filtered.sort((a,b) => b.points - a.points);
    const top10 = sorted.splice (0, 10);

    const embed = new Discord.RichEmbed()
    .setTitle("**__LEADERBOARD__**")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription("Our top 10 points active cunts!")
    .setColor(11208320);
    for(const data of top10) {
        embed.addField(client.users.get(data.user).tag, `${data.points} points (level ${data.level})`);
    }
    return message.channel.send({embed});
}

module.exports.help = {
    type: "points",
    name: "leaderboard",
    desc: "Displays the server's top 10 active users",
    usage: "leaderboard"
};