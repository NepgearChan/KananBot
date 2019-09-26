const Discord = require("discord.js");
const config = require("../config.json");
const ms = require("ms");
module.exports.run = async (bot, message, args) => {
    
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Insufficient permission.");
    let blacklistUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!blacklistUser) return message.channel.send("Couldn't find user | **Usage:** `>blacklist @user <reason>`");
    if(blacklistUser.hasPermission("ADMINISTRATOR")) return message.channel.send(":clown: You tried. :clown:");
    let blacklistReason = args.join(" ").slice(22);
    if(!blacklistReason) return message.channel.send("Specify a reason | **Usage:** `>blacklist @user <reason>`");

    message.delete().catch();

    let blacklistLogEmbed = new Discord.RichEmbed()
    .setAuthor(`Punishment | ${blacklistUser.user.tag} | Blacklist`, blacklistUser.user.displayAvatarURL)
    .setDescription(`**Target:** ${blacklistUser}\n \n**Issued By:** ${message.author}\n \n**Issued Reason:** ${blacklistReason}\n \n**Issued In:** ${message.channel}`)
    .setColor("#e74c3c")
    .setTimestamp()
    .setFooter( `ID: ${blacklistUser.id}`)

    let blacklistChannel = message.guild.channels.find(c => c.name === "modlogs")
    if(!blacklistChannel) return message.channel.send("Couldn't find log channel.");

    blacklistUser.send(`You've been **permanently blacklisted** from **${message.guild.name}** for: **${blacklistReason}**. This type of punishment is **not** appealable.`).then(function() {
        message.guild.member(blacklistUser).ban(`Blacklist: ${blacklistReason}`);
        console.log(`${blacklistUser.tag} has been notified about their blacklist.`);
    }).catch(function() {
        message.guild.member(blacklistUser).ban(blacklistReason);
        console.log(`${blacklistUser.tag} wasn't notified about their blacklist.`)
    })
    blacklistChannel.send(blacklistLogEmbed).then(() => {
        message.delete()
        message.channel.send(`${blacklistUser} has been **permanently blacklisted**.`)
    });

    let blacklists = message.guild.channels.find(c => c.name === "blacklists");
  
    blacklists.send(`${blacklistUser} was **blacklisted** by ${message.author} for **${blacklistReason}**.`)

    let memberBlacklistLogEmbed = new Discord.RichEmbed()
    .setAuthor(`Member Blacklisted`, blacklistUser.user.displayAvatarURL)
    .setColor("#41f480")
    .setDescription(`${blacklistUser} | **${blacklistUser.user.tag}** has been **blacklisted**.`)
    .setFooter(`ID: ${blacklistUser.id}`)
    .setTimestamp()

    let memberBlacklistLog = message.guild.channels.find(c => c.name === "kananlogs");

    memberBlacklistLog.send(memberBlacklistLogEmbed);
}

module.exports.help = {
    name: "blacklist"
}