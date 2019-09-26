const Discord = require("discord.js");
const config = require("../config.json");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Insufficient permission.");
    if(!args[0]) return message.channel.send("Specify a number. | **Usage:** `>purge <number of messages>`");

    let PurgeLogEmbed = new Discord.RichEmbed()
    .setAuthor(`Moderation | ${message.author.tag} | Purge`, message.author.displayAvatarURL)
    .setDescription(`**Issued By:** ${message.author}\n \n**Issued Channel:** ${message.channel}\n \n**Deleted Messages**: ${args[0]} messages`)
    .setColor("#e74c3c")
    .setTimestamp()
    .setFooter(`ID: ${message.author.id}`)

    let PurgeChannel = message.guild.channels.find(c => c.name === "kananlogs")
    if(!PurgeChannel) return message.channel.send("Couldn't find log channel.");

    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Purged ${args[0]} messages.`).then(msg => msg.delete(5000)).then(() => {
            PurgeChannel.send(PurgeLogEmbed)
        })
    });

}

module.exports.help = {
    name: "purge"
}