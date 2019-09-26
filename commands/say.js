const Discord = require("discord.js");
const config = require("../config.json");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Insufficient permission.")
    let wChannel = message.mentions.channels.first();
    if(!wChannel) return message.channel.send("Specify a channel. | **Usage:** `>say #channel <message>`");
    const sayMessage = args.slice(1).join(" ");
    message.delete().catch(O_o=>{}); 
    wChannel.send(`${sayMessage}`);
}

module.exports.help = {
    name: "say"
}