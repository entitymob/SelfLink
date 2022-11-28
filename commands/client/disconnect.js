const discord = require('discord.js-selfbot-v13');

module.exports = (/** @type {discord.Client} */ client, /** @type {discord.Message} */ message, /** @type {Array<String>} */ args) => {
    message.channel.send(`Disconnecting...`).then(msg => {
        msg.delete({ setTimeout: 1000 });
    });
    message.delete();
    client.destroy();
    console.log(`Successfully disconnected from Discord.`);
    process.exit(0);
}