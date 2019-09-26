const {bot} = require("../app");
const config = require("../config.json");
const tokenfile = require("../token.json");
const Discord = require("discord.js");
const fs = require("fs");
bot.commands = new Discord.Collection();
bot.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel
  
    if(oldUserChannel === undefined && newUserChannel !== undefined) {
  
       let joinChannel = new Discord.RichEmbed()
       .setAuthor(newMember.user.tag, newMember.user.displayAvatarURL)
       .setDescription(`${newMember} **connected to voice channel \`${newUserChannel.name}\`**`)
       .setTimestamp()
       .setFooter(`ID: ${newMember.id}`)
       .setColor("#0099ff")
  
       const messagechannel = oldMember.guild.channels.find(r => r.name === 'kananlogs');
  
       messagechannel.send(joinChannel);
    } else if(newUserChannel === undefined){
  
      let leaveChannel = new Discord.RichEmbed()
      .setAuthor(oldMember.user.tag, oldMember.user.displayAvatarURL)
      .setDescription(`${oldMember} **disconnected from voice channel \`${oldUserChannel.name}\`**`)
      .setTimestamp()
      .setFooter(`ID: ${oldMember.id}`)
      .setColor("#e74c3c")
  
      const messagechannel = oldMember.guild.channels.find(r => r.name === 'kananlogs');
  
      messagechannel.send(leaveChannel);
  
    } else if (oldUserChannel && newUserChannel && oldUserChannel.id != newUserChannel.id) {
      let leaveChannel = new Discord.RichEmbed()
      .setAuthor(oldMember.user.tag, oldMember.user.displayAvatarURL)
      .setDescription(`${oldMember} **switched from \`${oldUserChannel.name}\` to \`${newUserChannel.name}\`**`)
      .setTimestamp()
      .setFooter(`ID: ${oldMember.id}`)
      .setColor("#9a4ef6")
  
      const messagechannel = oldMember.guild.channels.find(r => r.name === 'kananlogs');
  
      messagechannel.send(leaveChannel);
      }
  
  })