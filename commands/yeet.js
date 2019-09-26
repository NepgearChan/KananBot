const Discord = require("discord.js");
const config = require("../config.json");
const ms = require("ms");
const PREFIX = '>';

module.exports.run = async (bot, message, args) => {
   
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Insufficient permission.");
    let banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!banUser) return message.channel.send("Couldn't find user | **Usage:** `>yeet @user <reason>`");
    if(banUser.hasPermission("ADMINISTRATOR")) return message.channel.send(":clown: You tried. :clown:");
    let banReason = args.join(" ").slice(22);
    if(!banReason) return message.channel.send("Specify a reason | **Usage:** `>yeet @user <reason>`")

    message.delete().catch();

    let banLogEmbed = new Discord.RichEmbed()
    .setAuthor(`Punishment | ${banUser.user.tag} | Yeet`, banUser.user.displayAvatarURL)
    .setDescription(`**Target:** ${banUser}\n \n**Issued By:** ${message.author}\n \n**Issued Reason:** ${banReason}\n \n**Issued In:** ${message.channel}`)
    .setColor("#e74c3c")
    .setTimestamp()
    .setFooter( `ID: ${banUser.id}`)

    let banChannel = message.guild.channels.find(c => c.name === "modlogs")
    if(!banChannel) return message.channel.send("Couldn't find log channel.");

    banUser.send(`You've been **permanently banned** from **${message.guild.name}** for: **${banReason}**. If you feel this action is unjustified, contact @Huseey#6669 (<@215199639027056640>).`).catch(err => console.log(err))
    message.guild.member(banUser).ban(banReason);
    banChannel.send(banLogEmbed).then(() => {
        message.delete()
        message.channel.send(`${banUser} has been **YEETED**.`)
    });

    let wallofshame = message.guild.channels.find(c => c.name === "wall-of-shame");
  
    wallofshame.send(`${banUser} was **banned** by ${message.author} for **${banReason}**.`)
}


module.exports.help = {
    name: "yeet"
}