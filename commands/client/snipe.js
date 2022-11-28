const discord = require('discord.js-selfbot-v13');

module.exports = (/** @type {discord.Client} */ client, /** @type {discord.Message} */ message, /** @type {Array<String>} */ args) => {
    if(args[0] == 'guild' && args[1]) {
        let guild = client.guilds.cache.get(args[1]);
        if(guild) {
            let channels = guild.channels.cache.filter(channel => channel.type == 'GUILD_TEXT');
            channels.forEach(channel => {
                if(channel.permissionOverwrites)
                channel.createInvite({ maxAge: 0, maxUses: 0, unique: true }).then(invite => {
                    message.channel.send(`https://discord.gg/${invite.code}`);
                }).catch((err) => {});
            });
        }
    }
}