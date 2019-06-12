// cleanup command
const tools = require('../../functions.js');

exports.run = (client, message, music_args) => {
    const args = music_args;
    purge();


    async function purge(){
        message.delete(); // Erases the command message, so it doesnt count as part of the messages the user wants to get rid of.
        let manage_messages = message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES");

        if(!manage_messages) return message.channel.send(tools.eMaker(null, "You dont have permissions to issue this command!", null, null, 11208320, null, null, null));
        if(!args[1]) return message.channel.send(tools.eMaker(null, "You need to specify how many messages you want me to delete! (3 - 100)", null, null, 11208320, null, null, null));
        if(isNaN(args[1]) || args[1] < 3 || args[1] > 100) return message.channel.send(tools.eMaker(null, "I can only remove from 3 to 100 messages, and I'm not allowed to touch messages older than 2 weeks!", null, null, 11208320, null, null, null));

        const fetched = await message.channel.fetchMessages({limit: args[1]});
        console.log(fetched.size + ' messages found, deleting now...');

        message.channel.bulkDelete(fetched)
            .catch(error => message.channel.send(tools.eMaker(null, `Error: ${error}`, null, null, 11208320, null, null, null)));

        return message.channel.send(tools.eMaker("**__DELETED MESSAGES__**", `Successfully deleted ${fetched.size} messages!`, message.author.username, message.author.avatarURL, 11208320, null, null, null));
    }

};

module.exports.help = {
    type: "management",
    name: "cleanup",
    desc: "Deletes from 3 to 100 messages.",
    usage: "cleanup [3-100]"
};