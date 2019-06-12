// poll command
const tools = require('../../functions.js');

exports.run = async (client, message) => {
    const args = message.content.split(' ');
    const poll = args.slice(1).join(' ');
    if(!args[1]) return message.channel.send(tools.eMaker(null, "What's the poll about?", null, null, 11208320, null, null, null));

    let msg = await message.channel.send(tools.eMaker("**__React to vote!__**", poll, message.author.username, message.author.avatarURL, 11208320, null, null, null));
    await msg.react('✅');
    await msg.react('⛔');
    console.log("Poll created.");

    message.delete({timeout: 1000});
};

module.exports.help = {
    type: "management",
    name: "poll",
    desc: "Creates a poll for users to vote.",
    usage: "poll Are spaghettis good?"
}