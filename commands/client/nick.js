const discord = require('discord.js-selfbot-v13');

function randomcharacter(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$^ù*ç%µ£¤!§:;.,?/\\|@#~&é"\'(-è_çà)=+';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = (/** @type {discord.Client} */ client, /** @type {discord.Message} */ message, /** @type {Array<String>} */ args) => {
    if(!args[0]) return;
    client.guilds.fetch(args[0]).then(guild => {
        guild.me.setNickname(randomcharacter(8)).catch((err) => {
            message.channel.send('Failed to set nickname : ' + err);
        });
    }).catch((err) => {});
}