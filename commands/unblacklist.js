const Discord = require("discord.js");
const config = require("../config.json");
const ms = require("ms");

module.exports.run = async(bot, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Insufficient permission.");
    let blacklistedMember = await bot.fetchUser(args[0])
        if(!blacklistedMember) return message.channel.send ("User not found. | **Usage:** `>unblacklist @user <reason>`")
    let blacklistedReason = args.slice(1).join(" ")
        if(!blacklistedReason) return message.channel.send ("Specify a reason | **Usage:** `>unblacklist @user <reason>`")

    if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send("I have insufficient permission.")

    try {
        message.guild.unban(blacklistedMember, blacklistedReason)
        message.channel.send(`${blacklistedMember} has been **unblacklisted**.`)
    } catch(e) {
         console.log(e.message);
    }

    let unblacklistLogEmbed = new Discord.RichEmbed()
    .setAuthor(`Punishment | ${blacklistedMember.tag} | Unblacklist`, blacklistedMember.displayAvatarURL)
    .setDescription(`**Target:** ${blacklistedMember}\n \n**Removed By:** ${message.author}\n \n**Issued Reason:** ${blacklistedReason}\n \n**Issued In:** ${message.channel}`)
    .setColor("#e74c3c")
    .setTimestamp()
    .setFooter( `ID: ${blacklistedMember.id}`)

    let unblacklistLog = message.guild.channels.find(c => c.name === "modlogs");
  
    unblacklistLog.send(unblacklistLogEmbed)

    let memberUnblacklistLogEmbed = new Discord.RichEmbed()
    .setAuthor(`Member Unblacklisted`, blacklistedMember.displayAvatarURL)
    .setColor("#41f480")
    .setDescription(`${blacklistedMember} | **${blacklistedMember.tag}** has been **unblacklisted**.`)
    .setFooter(`ID: ${blacklistedMember.id}`)
    .setTimestamp()

    let memberUnblacklistLog = message.guild.channels.find(c => c.name === "kananlogs");
  
    memberUnblacklistLog.send(memberUnblacklistLogEmbed)



}

module.exports.help = {
    name: "unblacklist"
}