const {bot} = require("../app");
const config = require("../config.json");
const tokenfile = require("../token.json");
const Discord = require("discord.js");
const fs = require("fs");
bot.commands = new Discord.Collection();
bot.on('guildMemberUpdate', (oldMember, newMember) => {

    var members = [oldMember.nickname, newMember.nickname];
  
    if(members[0] == null)
    {
        members[0] = oldMember.user.username;
    }
    if(members[1] == null)
    {
        members[1] = newMember.user.username;
    }
    if(oldMember.nickname != newMember.nickname)
    {
      let nickEmbed = new Discord.RichEmbed()
      .setAuthor(newMember.user.tag, newMember.user.displayAvatarURL)
      .setDescription(`${oldMember} **nickname changed**\n  \n**Before**\n${members[0]}\n  \n**After**\n${members[1]}`)
      .setTimestamp()
      .setFooter(`ID: ${oldMember.id}`)
      .setColor("#0099ff")
  
      const messagechannel = oldMember.guild.channels.find(r => r.name === 'kananlogs');
  
      messagechannel.send(nickEmbed);
    }
  
      const messagechannel = oldMember.guild.channels.find(r => r.name === 'kananlogs');
  
    if (oldMember.roles.size < newMember.roles.size) {
      const embed = new Discord.RichEmbed()
          .setColor("#9a4ef6")
          .setTimestamp()
          .setAuthor(oldMember.user.tag, oldMember.user.displayAvatarURL)
          .setFooter(`ID: ${oldMember.id}`)
  
          for (const role of newMember.roles.map(x => x.id)) {
              if (!oldMember.roles.has(role)) {
                  embed.setDescription(`${oldMember} **was given the** \`${oldMember.guild.roles.get(role).name}\` **role**`);
              }
          }
          messagechannel.send({
              embed
          });
      }
  
      if (oldMember.roles.size > newMember.roles.size) {
            const embed = new Discord.RichEmbed()
            .setColor("#e74c3c")
            .setTimestamp()
            .setAuthor(oldMember.user.tag, oldMember.user.displayAvatarURL)
            .setFooter(`ID: ${oldMember.id}`)
  
            for (const role of oldMember.roles.map(x => x.id)) {
                if (!newMember.roles.has(role)) {
                    embed.setDescription(`${oldMember} **was removed from the \`${oldMember.guild.roles.get(role).name}\` role**`);
                }
            }
            messagechannel.send({
                embed
            });
        }
  
  });