// unpunish command
const tools = require("../../functions.js");

exports.run = (client, message) => {
    const role = message.guild.roles.find(role => role.name === "Punished");
    const args = message.content.split(' ');
    const user = args[1];

    // If user can not manage roles, do nothing
    if(!message.member.hasPermission('MANAGE_ROLES'))
        return undefined;

    if(user !== undefined){
        let member =  message.mentions.members.first();
        if(member.roles.has(role.id)){
            member.removeRole(role);
            client.punished.delete(`${message.guild.id}-${member.id}`);

            return message.channel.send(tools.eMaker(null, `${member.displayName} unpunished, be a better boy from now on ;)`, client.user.username, client.user.avatarURL,11208320, null, null, null));
        }
        else{
            return message.channel.send(tools.eMaker(null, `${member.displayName} hasn't been punished... yet. Poor soul.`, client.user.username, client.user.avatarURL,11208320, null, null, null));
        }
    }
}

module.exports.help = {
    type: "management",
    name: "unpunish",
    desc: "Unpunishes the given user, if he/she was",
    usage: "unpunish @user "
};