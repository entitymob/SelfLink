const { getToken } = require('./utils/GetToken.js');
const discord = require('discord.js-selfbot-v13');
const GetToken = require('./utils/GetToken.js');
const client = new discord.Client({
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
        discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        discord.Intents.FLAGS.GUILD_MEMBERS,
        discord.Intents.FLAGS.GUILD_PRESENCES,
        discord.Intents.FLAGS.GUILD_VOICE_STATES,
        discord.Intents.FLAGS.GUILD_INVITES,
        discord.Intents.FLAGS.GUILD_BANS,
        discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        discord.Intents.FLAGS.GUILD_WEBHOOKS,
    ],
});

console.log(`Starting...`);


getToken().then((tokens) => {
    if(tokens == undefined) {
        console.log(`No tokens found!`);
        process.exit(2);
    }
    tokens.forEach((token) => {
        client.login(token);
    });
});