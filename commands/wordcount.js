const Discord = require("discord.js");
const request = require(`request`);
const http = require('https');
const path = require("path");
const fs = require("fs");

const readGdoc = require("../events/wordcount/readDoc.js");
const wordcount = require("../events/wordcount/wordcount/wordcount.js");

module.exports = {
    name: "wordcount",
    description: "Count words in document",
    execute(message, args) {
        const collector = new Discord.MessageCollector(
            message.channel,
            (m) => m.author.id === message.author.id, { time: 1000000 }
        );

        var counter = 0;

        if (!args[0]) {
            message.reply("Please provide a attachment or link to google document.");
            var isarg = false;
        }
        if (args[0]) {
            message.reply("Any custom words? (Seperated by spaces)");
            var isarg = true;
            var doclink = args[0];
            counter++;
        }
        collector.on("collect", (message) => {
            if (message.content || message.attachments.first() && counter == 0) {
                if (message.content.includes("https:")) {
                    message.reply("WIP!");
                }
                else {
                    var EventEmitter = require("events").EventEmitter;
                    var body = new EventEmitter();

                    request.get(message.attachments.first().url, function(error, response, data) {
                        if (!error && response.statusCode == 200) {
                            body.data = data;
                            body.emit('update');
                        }
                    });

                    body.on('update', function() {
                        essay = body.data
                    });
                }
                message.reply("Any custom words? (Seperated by spaces)");
                counter++;
            }
            else if (message.content && counter == 2) {
                cwords = message.content;
                counter++;
            }
            else if (counter == 3) {
                if (isarg == true) wordcount(essay, cwords);
                else if (isarg == false) wordcount(essay, cwords)
            }
        });
    }
}
