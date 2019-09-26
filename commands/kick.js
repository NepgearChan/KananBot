const Discord = require("discord.js");
const config = require("../config.json");
const ms = require("ms");
module.exports.run = async (bot, message, args) => {
    
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Insufficient permission.");
    let kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kickUser) return message.channel.send("Couldn't find user | **Usage:** `>kick @user <reason>`");
    if(kickUser.hasPermission("ADMINISTRATOR")) return message.channel.send(":clown: You tried. :clown:");
    let kickReason = args.join(" ").slice(22);
    if(!kickReason) return message.channel.send("Specifiy a reason | **Usage:** `>kick @user <reason>`")

    message.delete().catch();

    let kickLogEmbed = new Discord.RichEmbed()
    .setAuthor(`Punishment | ${kickUser.user.tag} | Kick`, kickUser.user.displayAvatarURL)
    .setDescription(`**Target:** ${kickUser}\n \n**Issued By:** ${message.author}\n \n**Issued Reason:** ${kickReason}\n \n**Issued In:** ${message.channel}`)
    .setColor("#e74c3c")
    .setTimestamp()
    .setFooter(`ID: ${kickUser.id}`)

    let kickChannel = message.guild.channels.find(c => c.name === "modlogs");
    if(!kickChannel) return message.channel.send("Couldn't find log channel.");

    kickUser.send(`You've been **kicked** from **${message.guild.name}** for: **${kickReason}**. Use this invite to join back -> https://discord.gg/YSsTkpf `).then(function() {
        message.guild.member(kickUser).kick(kickReason);
        console.log(`${kickUser.tag} has been notified about their kick.`);
    }).catch(function() {
        message.guild.member(kickUser).ban(kickReason);
        console.log(`${kickUser.tag} wasn't notified about their kick.`)
    })
    kickChannel.send(kickLogEmbed).then(() => {
        message.delete()
        message.channel.send(`${kickUser} has been **kicked**.`)
    });

    
    let memberKickLogEmbed = new Discord.RichEmbed()
    .setAuthor(`Member Kicked`, kickUser.displayAvatarURL)
    .setColor("#41f480")
    .setDescription(`${kickUser} | **${kickUser.tag}** has been kicked.`)
    .setFooter(`ID: ${kickUser.id}`)
    .setTimestamp()

    let memberKickLog = message.guild.channels.find(c => c.name === "kananlogs");

    memberKickLog.send(memberKickLogEmbed);

}

module.exports.help = {
    name: "kick"
}