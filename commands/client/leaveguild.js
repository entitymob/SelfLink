const discord = require('discord.js-selfbot-v13');

module.exports = (/** @type {discord.Client} */ client, /** @type {discord.Message} */ message, /** @type {Array<String>} */ args) => {
    client.guilds.fetch(args[0]).then(guild => {
        guild.leave().catch((err) => {
            message.channel.send('Failed to leave guild : ' + err);
        });
    }).catch((err) => {
        message.channel.send('Failed to fetch guild : ' + err);
    });
}