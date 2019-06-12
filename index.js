const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config/config.json");

// Point sistem
client.points = new Enmap({name: "points"});
// Punish system
client.punished = new Enmap({name: "punished"});

fs.readdir("./events/", (err, files) => {
    if(err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err,files) => {
    if(err) return console.error(err);
    files.forEach(file => {
        if(!file.endsWith(".js")) return undefined;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attemping to load command ${commandName}...`);
        client.commands.set(commandName, props);
    });
});


fs.readdir("./commands/music", (err,files) => {
    if(err) return console.error(err);
    console.log("\n-----Loading music commands-----")
    files.forEach(file => {
        if(!file.endsWith(".js")) return undefined;
        let props = require(`./commands/music/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attemping to load command ${commandName}...`);
        client.commands.set(commandName, props);
    });
});

fs.readdir("./commands/management", (err,files) => {
    if(err) return console.error(err);
    console.log("\n-----Loading management commands-----")
    files.forEach(file => {
        if(!file.endsWith(".js")) return undefined;
        let props = require(`./commands/management/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attemping to load command ${commandName}...`);
        client.commands.set(commandName, props);
    });
});

fs.readdir("./commands/points", (err, files) => {
    if(err) return console.error(err);
    console.log("\n-----Loading pointsys commands-----");
    files.forEach(file => {
        if(!file.endsWith(".js")) return undefined;
        let props = require(`./commands/points/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attemping to load command ${commandName}...`);
        client.commands.set(commandName, props);
    })
})

client.login(config.TOKEN);      