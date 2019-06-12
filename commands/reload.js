// reload command
const tools = require("../functions.js");

exports.run = (client, message) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return undefined;

    const args = message.content.split(' ');
    if(!args || args.size < 2) return undefined;
    
    const cmdType = args[1];
    const commandName = args[2];
    var props;
    
    if(!client.commands.has(commandName)) return undefined;

    switch(cmdType){
        case 'music':
            delete require.cache[require.resolve(`./music/${commandName}.js`)];
            client.commands.delete(commandName);
            props = require(`./music/${commandName}.js`);
            break;
        case "management":
            delete require.cache[require.resolve(`./management/${commandName}.js`)];
            client.commands.delete(commandName);
            props = require(`./management/${commandName}.js`);
            break;
        case "points":
            delete require.cache[require.resolve(`./points/${commandName}.js`)];
            client.commands.delete(commandName);
            props = require(`./points/${commandName}.js`);
            break;

        default:
            return undefined;
    }

    client.commands.set(commandName, props);
    return message.channel.send(tools.eMaker(null, `Command ${commandName} reloaded successfully!`, null, null, 11208320, null, null, null));
}

module.exports.help = {
    name: "reload",
    desc: "Reloads the given command",
    usage: "reload <category> <command>"
};