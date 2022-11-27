const ownerid = '421720300196069416';
const prompt = require('prompt-sync')({ sigint: true });
const fs = require('fs');
const discord = require('discord.js-selfbot-v13');
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
    checkUpdate: false,
});

console.log(`Starting...`);

let admincommands = new discord.Collection();
let clientcommands = new discord.Collection();
fs.readdirSync('./commands/client').forEach(file => {
    let command = require(`./commands/client/${file}`);
    clientcommands.set(file.split('.js')[0], command);
});
fs.readdirSync('./commands/admin').forEach(file => {
    let command = require(`./commands/admin/${file}`);
    admincommands.set(file.split('.js')[0], command);
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity('SelfLink Connected', { type: 'WATCHING', name: 'SelfLink', url: 'https://discord.gg/PCSpuTgadU' });
});

client.on('messageCreate', async (message) => {
    if(message.content.startsWith('.')) {
        let args = message.content.slice(1).split(' ');
        let command = args.shift().toLowerCase();
        if(clientcommands.has(command)) {
            clientcommands.get(command)(client, message, args);
        }
        if(message.author.id !== ownerid) return;
        if(admincommands.has(command)) {
            admincommands.get(command)(client, message, args);
        }
    }
});

let token = getToken();
client.login(token).catch((err) => {
    console.log(`Invalid token`);
    process.exit(0);
}).then(() => {
    console.log(`Token is valid !`);
    let save = prompt('Save token ? (y/n) ');
    if (save == 'y') {
        fs.writeFileSync('token.txt', token);
        console.log(`Token saved !`);
    }
});


function getToken(){
    if(fs.existsSync('./token.txt')) {
        console.log(`Token found in token.txt`);
        let token = fs.readFileSync('./token.txt', 'utf-8');
        return token;
    }
    let token = prompt('Token: ');
    console.log(`token`);
    console.log(`Checking token...`);
    return token;
}