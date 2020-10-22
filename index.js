const mineflayer = require('mineflayer');
const getJSON = require('get-json');
require('dotenv').config();

const bot = mineflayer.createBot({
    host: "mc.hypixel.net",
    port: 25565,
    username: process.env.EMAIL,
    password: process.env.PASSWORD
})

console.log("Connected!");

setTimeout(() => {
    getJSON(`https://api.hypixel.net/status?key=${process.env.APIKEY}&uuid=a0db5658-c120-43ed-a7f6-3487b9b82b21`, (error, response) => {
        if(error) console.log(error);
        else {
            if(response.session == undefined || response.session == null) return console.log("There was a problem fetching your current game");
            if(response.session.gameType != "ARCADE" || response.session.mode != "PARTY"){
                bot._client.write("chat", {message:"/play arcade_party_games_1"})
                console.log("Subject was not in the correct game! They were sent back to it.")
            } else {
                console.log("Subject is in correct game");
            }
        }
    })
}, 3000);

setInterval(() => {
    getJSON(`https://api.hypixel.net/status?key=${process.env.APIKEY}&uuid=a0db5658-c120-43ed-a7f6-3487b9b82b21`, (error, response) => {
        if(error) console.log(error);
        else {
            if(response.session == undefined || response.session == null) return console.log("There was a problem fetching your current game");
            if(response.session.gameType != "ARCADE" || response.session.mode != "PARTY"){
                bot._client.write("chat", {message:"/play arcade_party_games_1"})
                console.log("Subject was not in the correct game! They were sent back to it.")
            } else {
                console.log("Subject is in correct game");
            }
        }
    })
}, 300000)