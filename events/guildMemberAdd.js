 const tools = require("../functions.js");
 
 module.exports = (client, guildMember) => {
    const role = guildMember.roles.find(role => role.name === "Punished");
    const key = `${guildMember.guild.id}-${guildMember.id}`;   
    if(client.punished.has(key)){
        guildMember.addRole(role);
    }
}