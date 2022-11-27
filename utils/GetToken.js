const fs = require('fs');
const request = require('request');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let tkns = [];
module.exports = {
    getToken: () => {
        readline.question('Token: ', (token) => {
            console.log(`Checking token...`);
            request.post({
                url: 'https://discord.com/api/v9/users/@me/',
                headers: {
                    'Authorization': token
                }
            }, (err, res, body) => {
                if (res.statusCode == 200) {
                    console.log(`Token is valid !`);
                    return match;
                } else return undefined;
            });
        });
    }
}