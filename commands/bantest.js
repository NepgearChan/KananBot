const Discord = require("discord.js");
const config = require("../config.json");
const ms = require("ms");
const PREFIX = '>';

module.exports.run = async (bot, message, args) => {
   
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Insufficient permission.");
    let banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!banUser) return message.channel.send("Couldn't find user | **Usage:** `>ban @user <reason>`");
    if(banUser.hasPermission("ADMINISTRATOR")) return message.channel.send(":clown: You tried. :clown:");
    let banReason = args.join(" ").slice(22);
    if(!banReason) return message.channel.send("Specify a reason | **Usage:** `>ban @user <reason>`")

    message.delete().catch();

    let banLogEmbed = new Discord.RichEmbed()
    .setAuthor(`Punishment | ${banUser.user.tag} | Ban`, banUser.user.displayAvatarURL)
    .setDescription(`**Target:** ${banUser}\n \n**Issued By:** ${message.author}\n \n**Issued Reason:** ${banReason}\n \n**Issued In:** ${message.channel}`)
    .setColor("#e74c3c")
    .setTimestamp()
    .setFooter( `ID: ${banUser.id}`)

    let banChannel = message.guild.channels.find(c => c.name === "modlogs")
    if(!banChannel) return message.channel.send("Couldn't find log channel.");


    banUser.send(`You've been **permanently banned** from **${message.guild.name}** for: **${banReason}**. If you feel this action is unjustified, contact @Huseey#6669 (<@215199639027056640>).`).then(function() {
        message.guild.member(banUser).ban(banReason);
        console.log(`${message.member.tag} has been notified about their ban.`);
    }).catch(function() {
        message.guild.member(banUser).ban(banReason);
        console.log(`${message.member.tag} wasn't notified about their ban.`)
    })
    banChannel.send(banLogEmbed).then(() => {
        message.delete()
        message.channel.send(`${banUser} has been **permanently banned**.`)
    });

    let wallofshame = message.guild.channels.find(c => c.name === "wall-of-shame");
  
    wallofshame.send(`${banUser} was **banned** by ${message.author} for **${banReason}**.`)

    let memberBanLogEmbed = new Discord.RichEmbed()
    .setAuthor(`Member Banned`, member.user.displayAvatarURL)
    .setColor("#41f480")
    .setDescription(`${member} | **${member.user.username}** has been banned.`)
    .setFooter(`ID: ${member.id}`)
    .setTimestamp()

    let memberBanLog = message.guild.channels.find(c => c.name === "kananlogs");

    memberBanLog.send(memberBanLogEmbed);
}


module.exports.help = {
    name: "bantest"
}