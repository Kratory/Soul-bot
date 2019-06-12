// punish command
const tools = require("../../functions.js");

/*
    WORKING FEATURES: -> If role doesnt exist, create it and apply to channels.
                      -> Check if user issuing command is admin.
                      -> Manage time input (h/d/w/m/y)
                      -> Apply role to given user
                      -> Remove role form given user after time has expired
                      -> Punish role will stay even if the user leaves and joins the server back.
                      -> If the bot goes offline, the punishment timer will be updated on the next boot. If the punishment should have expired, it will.
*/

exports.run = async(client, message) => {
    const role = message.guild.roles.find(role => role.name === "Punished");

    async function createRole(){
        await message.guild.createRole({
            name: "Punished",
            color: 'GREY',
            hoist: true,
            position: 1,
            permissions: 0,
            mentionable: false
        });

        while(role === null){
            role = message.guild.roles.find(role => role.name === "Punished");
        }
        console.log("Punished role created.");
        return;
    }

    async function applyToChannels(){
        if(!role) await createRole();
        await message.guild.channels.forEach(channel => {
                if(channel.type === "voice"){
                    channel.overwritePermissions(role.id, {
                        'SPEAK': false
                    });
                    console.log("Punished role applied to" + channel.type + "channel: " + channel.name);
                }
    
                if(channel.type === "text"){
                    channel.overwritePermissions(role.id, {
                        'SEND_MESSAGES': false
                    });
                    console.log("Punished role applied to" + channel.type + "channel: " + channel.name);
                }
        });
        return;
    }

    const args = message.content.split(' ');
    const user = args[1];
    const time = args[2];
    const reason = args.slice(3).join(' ');

    // If user can not manage roles, do nothing
    if(!message.member.hasPermission('MANAGE_ROLES'))
        return undefined;

    // If role doesnt exist, calls to createRole() and then edits the message.
    if(!role){
        message.channel.send(tools.eMaker(null, "Punished role doesnt exist, creating it and applying to channels...", client.user.username, client.user.avatarURL,11208320, null, null, null))
        .then(async (msg) => {
            function edit(){
                msg.edit(tools.eMaker(null, "Done! Punished role created and applied to every channel =^3^=", client.user.username, client.user.avatarURL,11208320, null, null, null));
            }
            await applyToChannels();
            setInterval(edit, 5000);
        });
    }

    // If first param is "apply" add punished restrictions to channels again. (In case new channels are added)
    if(user === "apply"){
        message.channel.send(tools.eMaker(null, "Checking if punished role is set up on every channel...", client.user.username, client.user.avatarURL,11208320, null, null, null))
        .then(async (msg) => {
            function edit(){
                msg.edit(tools.eMaker(null, "Done! Punished role applied to every channel =^3^=", client.user.username, client.user.avatarURL,11208320, null, null, null));
            }
            setInterval(edit, 5000);
        });
        await applyToChannels();
    }

    // If given username
    if(user !== "apply"){
        let member =  message.mentions.members.first();
        if(member.roles.has(role.id))
            return message.channel.send(tools.eMaker(null, `${member.displayName} is already punished! No can do!`, client.user.username, client.user.avatarURL,11208320, null, null, null));
        if(member !== undefined){
            if(time !== undefined && time !== ' '){
                if(!isNaN(tools.handleTime(time))){
                    member.addRole(role);
                    message.channel.send(tools.eMaker(null, `${member.displayName} punished!\n**Time**: ${tools.handleTime(time)} seconds. \n**Reason**: ${reason}  \n;)`, client.user.username, client.user.avatarURL,11208320, null, null, null));
                    setTimeout(() => {
                        member.removeRole(role);
                        client.punished.delete(`${message.guild.id}-${member.id}`);
                    }, tools.handleTime(time) * 1000);
                }else{
                    member.addRole(role);
                    message.channel.send(tools.eMaker(null, `${member.displayName} punished!\n**Time**: 3600 seconds. \n**Reason**: ${reason}  \n;)`, client.user.username, client.user.avatarURL,11208320, null, null, null));
                    setTimeout(() => {
                        member.removeRole(role);
                        client.punished.delete(`${message.guild.id}-${member.id}`);
                    }, 3600 * 1000);
                }
            }
            else{
                return message.channel.send(tools.eMaker(null, `${member.displayName} punished until someone remember to revoke it ;)`, client.user.username, client.user.avatarURL,11208320, null, null, null));
            }

            const rightNow = Date.now() / 1000;

            client.punished.ensure(`${message.guild.id}-${member.id}`,{
                    user: member.id,
                    guild: message.guild.id,
                    time: tools.handleTime(time),
                    reason: reason,
                    date: rightNow
            });
        }
        else{
             return message.channel.send(tools.eMaker(null, ">punish @user [Xh/d/w/m/y] [reason]", client.user.username, client.user.avatarURL,11208320, null, null, null));
        }
    }

}

module.exports.help = {
    type: "management",
    name: "punish",
    desc: "Punishes the given user for the given time period and for the given reason. If given parameter apply alone, role will be applied to new channels",
    usage: "punish [apply] @user [X[h/d/w/m/y]] [reason]"
};