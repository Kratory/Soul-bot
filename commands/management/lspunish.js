// punish command
const Discord = require("discord.js");
const tools = require("../../functions.js");
exports.run = (client, message) => {
    const filtered = client.punished.filter(p => p.guild === message.guild.id).array();
    
    const embed = new Discord.RichEmbed()
    .setTitle("**__WALL OF SHAME__**")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription("Punished cunts on the server!")
    .setColor(11208320);

    const now = Date.now() / 1000;
    for(const data of filtered) {
        const timeleft = Math.abs(Math.floor(now - (client.punished.get(`${data.guild}-${data.user}`, 'time') + client.punished.get(`${data.guild}-${data.user}`, 'date'))));
        embed.addField(client.users.get(data.user).tag, `${timeleft} seconds (Reason: ${data.reason})`);
    }
    return message.channel.send({embed});

    // return message.channel.send(tools.eMaker("**__WALL OF SHAME__**", `${filtered.map(p => `${p.user.tag} --- ${p.time} seconds --- Reason: ${p.reason}`).join('\n')}`, message.author.username, message.author.avatarURL, 11208320, null, null, null));
}

module.exports.help = {
    type: "management",
    name: "lspunish",
    desc: "Displays punished users on the server",
    usage: "lspunish"
};