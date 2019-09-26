const {bot} = require("../app");
const config = require("../config.json");
const tokenfile = require("../token.json");
const Discord = require("discord.js");
const fs = require("fs");
bot.commands = new Discord.Collection();

bot.on('messageDelete', message => {

    if(message.channel.type === "dm") return;
    if(message.author.bot) return;
    if (message.content.startsWith("!")) return
    const textInput = message.content
    
    if (textInput.length < "1248") {
    
      let deleteEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setDescription(`**Message sent by ${message.author} deleted in ${message.channel}**\n${message.cleanContent}`)
      .setTimestamp()
      .setFooter(`Author: ${message.author.id} | Message ID: ${message.id}`)
      .setColor("#e74c3c")
    
      let sChannel = bot.channels.find(r => r.name === 'kananlogs');
      sChannel.send(deleteEmbed);
    
      }else if (textInput.length > "1248") {
    
      let deleteEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setDescription(`**Message sent by ${message.author} deleted in ${message.channel}**\n  \n**Character limit** Message exceeded the character limit and cannot be logged.`)
      .setTimestamp()
      .setFooter(`Author: ${message.author.id} | Message ID: ${message.id}`)
      .setColor("#e74c3c")
    
      let sChannel = bot.channels.find(r => r.name === 'kananlogs');
      sChannel.send(deleteEmbed);
    
      }
    
    });