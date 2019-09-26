const {bot} = require("../app");
const config = require("../config.json");
const tokenfile = require("../token.json");
const Discord = require("discord.js");
const fs = require("fs");
bot.commands = new Discord.Collection();

bot.on("messageUpdate", (message, oldMessage, newMessage) => {

  if(message.content.startsWith("https")) return;
  if(message.author.bot) return;
  const textInput = message.content

  if (textInput.length < "1248") {

    let editEmbed = new Discord.RichEmbed()

    .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
    .setTimestamp()
    .setFooter(`Author: ${message.author.id}`)
    .setColor("#0099ff")
    .setDescription(`**Message edited in ${message.channel}** [Jump to message](${message.url})\n  \n**Before**\n${message}\n \n**After**\n${oldMessage.content}`)

    const messagechannel = message.guild.channels.find(r => r.name === 'kananlogs');
    messagechannel.send(editEmbed);

  }else if (textInput.length > "1248") {

    let errorEmbed = new Discord.RichEmbed()

    .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
    .setTimestamp()
    .setFooter(`Author: ${message.author.id}`)
    .setColor("#0099ff")
    .setDescription(`**Message edited in ${message.channel}** [Jump to message](${message.url})\n  \n**Character limit** Message exceeded the character limit and cannot be logged.`)

    const messagechannel = message.guild.channels.find(r => r.name === 'kananlogs');
    messagechannel.send(errorEmbed);
  }

});
