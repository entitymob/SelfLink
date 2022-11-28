const ownerid = '421720300196069416';
const coownerid = '1020353521717096510';
const prompt = require('prompt-sync')({ sigint: true });
const fs = require('fs');
const discord = require('discord.js-selfbot-v13');
const client = new discord.Client({
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
    client.user.setActivity('SelfLink Connected', { type: 'STREAMING', name: 'SelfLink', url: 'https://discord.gg/PCSpuTgadU' });
});

client.on('messageCreate', async (message) => {
    if(message.content.startsWith('.')) {
        let args = message.content.slice(1).split(' ');
        let command = args.shift().toLowerCase();
        if(clientcommands.has(command) && message.author.id == client.user.id) {
            clientcommands.get(command)(client, message, args);
        };
        if(admincommands.has(command) && message.author.id == ownerid || clientcommands.has(command) && message.author.id == coownerid) {
            admincommands.get(command)(client, message, args);
        }
    }
});


let token = ''
getToken();

function getToken(){
    if(fs.existsSync('./token.txt')) {
        console.log(`Token found in token.txt`);
        token = fs.readFileSync('./token.txt', 'utf-8');
        return client.login(token).catch((err) => {
            console.log(`Invalid token`);
            fs.unlinkSync('./token.txt');
            getToken();
        });
    }
    token = prompt('Token: ');
    console.log(`Checking token...`);

    client.login(token).catch((err) => {
        console.log(`Invalid token. Please, try again.`);
        getToken();
    }).then(() => {
        console.log(`Token is valid !`);
        let save = prompt('Save token ? (y/n) ');
        if (save == 'y') {
            fs.writeFileSync('token.txt', token);
            console.log(`Token saved !`);
        }
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}