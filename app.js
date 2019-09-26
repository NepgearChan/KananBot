const Discord = require("discord.js");
const config = require("./config.json");
const Token = require("./token.json");
const fs = require("fs");
const PREFIX = '>';
const bot = new Discord.Client({disableEveryone: true});

require("./functions")(bot);

module.exports = {
  bot: bot
};

//console say
let y = process.openStdin()
y.addListener("data", res => {
  let x = res.toString().trim().split(/ +/g)
  bot.channels.get("375379540643545090").send(x.join(" "));
});

bot.login(Token.token);