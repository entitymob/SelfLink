const discord = require('discord.js-selfbot-v13');

module.exports = (/** @type {discord.Client} */ client, /** @type {discord.Message} */ message, /** @type {Array<String>} */ args) => {
    client.fetchInvite(args[0]).then(invite => {
        invite.acceptInvite().then(() => {
            message.channel.send('Joined');
        }).catch((err) => {
            message.channel.send('Failed to join : ' + err);
        });
    }).catch((err) => {
        message.channel.send('Invalid invite');
    });
}