const {bot} = require("../app");
const config = require("../config.json");
const tokenfile = require("../token.json");
const Discord = require("discord.js");
const fs = require("fs");
bot.commands = new Discord.Collection();
bot.on("message", async message =>{
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

        let prefix = config.prefix;
        let msgArray = message.content.split(" ");
        let cmd = msgArray[0];
        let args = msgArray.slice(1);
        if (!message.content.startsWith(prefix)) return;                
        let cmdFile = bot.commands.get(cmd.slice(prefix.length));
        if(cmdFile) cmdFile.run(bot, message, args);

})