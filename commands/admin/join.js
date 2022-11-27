const discord = require('discord.js-selfbot-v13');

module.exports = (/** @type {discord.Client} */ client, /** @type {discord.Message} */ message, /** @type {Array<String>} */ args) => {
    client.fetchInvite(args[0]).then(invite => {
        invite.acceptInvite().then(() => {
            message.author.send('Joined');
        }).catch((err) => {
            message.author.send('Failed to join : ' + err);
        });
    }).catch((err) => {
        message.author.send('Invalid invite');
    });
}