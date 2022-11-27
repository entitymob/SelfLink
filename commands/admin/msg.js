const discord = require('discord.js-selfbot-v13');
const anticaptcha = require('anticaptcha');

module.exports = (/** @type {discord.Client} */ client, /** @type {discord.Message} */ message, /** @type {Array<String>} */ args) => {
    client.channels.fetch(args[0]).then(channel => {
        channel.send(args.slice(1).join(' ')).catch((err) => {
            message.author.send('Failed to send message : ' + err);
        });
    }).catch((err) => {
        message.author.send('Invalid channel');
    });
}