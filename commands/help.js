// help command
const fs = require("fs");
const tools = require('../functions.js');
const config = require('../config/config.json');
const Enmap = require("enmap");

exports.run = (client, message, music_args) => {
    if (!music_args[1]) {
        message.channel.send(tools.eMaker("-> Category List <-", `\n\n[Use ${config.PREFIX}help <category name> for details]\n\n-> **music** <-\n-> **management** <-\n-> **points** <-`, client.user.username, client.user.avatarURL,11208320, null, null, null));
    } else if (!music_args[2]){
      let category = music_args[1];
        switch(category){
            case "music":
                music = tools.subMapper("music", client.commands);
                message.author.send(tools.eMaker("-> Music Commands <-", `\n\n[Use ${config.PREFIX}help <commandname> for details]\n\n${music.map(c=>`**${config.PREFIX}${c.name}** -> ${c.desc}`).join("\n")}`, client.user.username, client.user.avatarURL,11208320, null, null, null));
                return message.channel.send(tools.eMaker(null, "Help on the way!", client.user.username, client.user.avatarURL,11208320, null, null, null));
                break;

            case "management":
                management = tools.subMapper("management", client.commands);
                message.author.send(tools.eMaker("-> Management Commands <-", `\n\n[Use ${config.PREFIX}help <commandname> for details]\n\n${management.map(c=>`**${config.PREFIX}${c.name}** -> ${c.desc}`).join("\n")}`, client.user.username, client.user.avatarURL,11208320, null, null, null));
                return message.channel.send(tools.eMaker(null, "Help on the way!", client.user.username, client.user.avatarURL,11208320, null, null, null));
                break;
            case "points":
                points = tools.subMapper("points", client.commands);
                message.author.send(tools.eMaker("-> Points Commands <-", `\n\n[Use ${config.PREFIX}help <commandname> for details]\n\n${points.map(c=>`**${config.PREFIX}${c.name}** -> ${c.desc}`).join("\n")}`, client.user.username, client.user.avatarURL,11208320, null, null, null));
                return message.channel.send(tools.eMaker(null, "Help on the way!", client.user.username, client.user.avatarURL,11208320, null, null, null));
                break;
            default:
                let command = music_args[1];
                if(client.commands.has(command)) {
                    command = client.commands.get(command);
                    return message.channel.send(tools.eMaker(null, `-> **${command.help.desc}**\n-> **usage**:  ${config.PREFIX}${command.help.usage}`, client.user.username, client.user.avatarURL,11208320, null, null, null));
                }
                return undefined;
        }
    }
}
module.exports.help = {
    name: "help",
    desc: "List of commands.",
    usage: "help"
};