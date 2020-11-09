const fs = require("fs");
const Discord = require("discord.js");
const { prefix, dctoken } = require("./config.json");

const currentTime = require("./events/utils/time.js");
const log = require("./events/utils/log.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", () => {
    log(currentTime() + " " + `${client.user.tag} online!`)
});

client.on("message", async(message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;


    try {
        if (commandName == "test") {
            message.reply("yeah")
        }
        else {
            command.execute(message, args)
        }
    }
    catch (error) {
        console.error(error);
        message.reply('Something Went Wrong!');
    }
});

client.login(dctoken);
