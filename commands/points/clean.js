const tools = require('../../functions.js');
exports.run = (client, message) => {
    if(!message.member.hasPermission('ADMINISTRATOR'))
        return undefined;

    const filtered = client.points.filter( p => p.guild === message.guild.id );
    const rightNow = new Date();

    const toRemove = filtered.filter(data => {
        return !message.guild.members.has(data.user) || rightNow - 2592000000 > data.lastSeen;
    });

    toRemove.forEach(data => {
        client.points.delete(`${message.guild.id}-${data.user}`);
    });

    return message.channel.send(tools.eMaker(null, `Successfully deleted ${toRemove.size} users from the db!`, message.author.username, message.author.avatarURL, 11208320, null, null, null));
}

module.exports.help = {
    type: "points",
    name: "leaderboard",
    desc: "Displays the server's top 10 active users",
    usage: "leaderboard"
};