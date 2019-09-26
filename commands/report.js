const Discord = require("discord.js");
const config = require("../config.json");
const ms = require("ms");
const handled = "✅"
module.exports.run = async (bot, message, args) => {
    
    let reportUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!reportUser) return message.channel.send("User not found | **Usage:** `>report @user <reason>`")
    let reportReason = args.slice(1).join(" ")
    if(!reportReason) return message.channel.send("Specify a reason | **Usage:** `>report @user <reason>`")
    if(reportUser.hasPermission("ADMINISTRATOR")) return message.channel.send("You cannot report a Manager or Owner.");

    message.delete().catch();

    let reportLogEmbed = new Discord.RichEmbed()
    .setAuthor(`Report | ${reportUser.user.tag}`, reportUser.user.displayAvatarURL)
    .setDescription(`**Target:** ${reportUser}\n \n**Issued By:** ${message.author}\n \n**Issued Reason:** ${reportReason}\n \n**Issued In:** ${message.channel}`)
    .setColor("#e74c3c")
    .setTimestamp()
    .setFooter(`ID: ${reportUser.id}`)

    let reportHandledLogEmbed = new Discord.RichEmbed()
    .setAuthor(`Report | ${reportUser.user.tag}| Handled`, reportUser.user.displayAvatarURL)
    .setDescription(`**Target:** ${reportUser}\n \n**Issued By:** ${message.author}\n \n**Issued Reason:** ${reportReason}\n \n**Issued In:** ${message.channel}`)
    .setColor("#e74c3c")
    .setTimestamp()
    .setFooter(`ID: ${reportUser.id}`)


    let reportChannel = message.guild.channels.find(c => c.name === "reports");
    if(!reportChannel) return message.channel.send("Couldn't find reports channel.");

    message.channel.send("Your report has been sent!");
    reportChannel.send(reportLogEmbed).then(async msg =>{
        await msg.react("✅");

    });

};

module.exports.help = {
    name: "report"
}