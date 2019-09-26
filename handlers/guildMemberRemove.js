const {bot} = require("../app");
const config = require("../config.json");
const tokenfile = require("../token.json");
const Discord = require("discord.js");
const fs = require("fs");
bot.commands = new Discord.Collection();

bot.on("guildMemberRemove", async member => {

    let logEmbed = new Discord.RichEmbed()
    .setAuthor(`Member left`, member.user.displayAvatarURL)
    .setColor("#e74c3c")
    .setDescription(`${member} | **${member.user.username}** left the server`)
    .setFooter(`ID: ${member.id}`)
    .setTimestamp()
  
    let logchannel = member.guild.channels.find(r => r.name === 'logs');
    logchannel.send(logEmbed);
  });