const config = require('../config/config.json');
module.exports = (client, guild) => {
    console.log('Im ready babey!');
    client.user.setStatus('dnd');
    client.user.setPresence({
        game:{
            name: `${config.PREFIX}help`
        }
    });

    // Think again
    const now = Date.now() / 1000;
    client.guilds.forEach(guild => {
        const filtered = client.punished.filter(p => p.guild === guild.id).array();
        const role = guild.roles.find(role => role.name === "Punished");
        for(const data of filtered){
            if((data.time * 1000 + data.date) > now){
                const timeleft = Math.abs(Math.floor(now - (client.punished.get(`${data.guild}-${data.user}`, 'time') + client.punished.get(`${data.guild}-${data.user}`, 'date'))));
                client.punished.set(`${data.guild}-${data.user}`, timeleft, 'time');
                client.punished.set(`${data.guild}-${data.user}`, now, 'date');
               
                setTimeout(() => {
                    guild.members.forEach(member => {
                        if(member.user.id === data.user) member.removeRole(role);
                    });
                    client.punished.delete(`${data.guild}-${data.user}`);
                }, client.punished.get(`${data.guild}-${data.user}`, 'time') * 1000);
            }
            else{
                client.punished.delete(`${data.guild}-${data.user}`);
                guild.members.forEach(member => {
                    if(member.user.id === data.user) member.removeRole(role);
                });
            }
        }
    });
};