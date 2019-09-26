const Discord = require("discord.js");
const config = require("../config.json");
const ms = require("ms");

module.exports.run = async(bot, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Insufficient permission.");
    let bannedMember = await bot.fetchUser(args[0])
        if(!bannedMember) return message.channel.send ("User not found. | **Usage:** `>unban @user <reason>`")
    let bannedReason = args.slice(1).join(" ")
        if(!bannedReason) return message.channel.send ("Specify a reason | **Usage:** `>unban @user <reason>`")

    if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send("I have insufficient permission.")

    try {
        message.guild.unban(bannedMember, bannedReason)
        message.channel.send(`${bannedMember} has been **unbanned**.`)
    } catch(e) {
         console.log(e.message);
    }

    let unbanLogEmbed = new Discord.RichEmbed()
    .setAuthor(`Punishment | ${bannedMember.tag} | Unban`, bannedMember.displayAvatarURL)
    .setDescription(`**Target:** ${bannedMember}\n \n**Removed By:** ${message.author}\n \n**Issued Reason:** ${bannedReason}\n \n**Issued In:** ${message.channel}`)
    .setColor("#e74c3c")
    .setTimestamp()
    .setFooter( `ID: ${bannedMember.id}`)

    let unbanLog = message.guild.channels.find(c => c.name === "modlogs");
  
    unbanLog.send(unbanLogEmbed)

    let memberUnbanLogEmbed = new Discord.RichEmbed()
    .setAuthor(`Member Unbanned`, bannedMember.displayAvatarURL)
    .setColor("#41f480")
    .setDescription(`${bannedMember} | **${bannedMember.tag}** has been **unbanned**.`)
    .setFooter(`ID: ${bannedMember.id}`)
    .setTimestamp()

    let memberUnbanLog = message.guild.channels.find(c => c.name === "kananlogs");
  
    memberUnbanLog.send(memberUnbanLogEmbed)



}

module.exports.help = {
    name: "unban"
}