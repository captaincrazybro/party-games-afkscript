const mineflayer = require('mineflayer');
const getJSON = require('get-json');
require('dotenv').config();

var checking = false;

const bot = mineflayer.createBot({
    host: "mc.hypixel.net",
    port: 25565,
    username: process.env.EMAIL,
    password: process.env.PASSWORD
})

console.log("Connected!");

bot.on("message", (messageJson) => {
    let message;
    if(messageJson.json.text) message = messageJson.json.text;
    else message = "";
    if(messageJson.json.extra != undefined){
      messageJson.json.extra.forEach(val => {
        message += val.text;
      })
    }
    if(checking){
        if(message != "You are currently playing on Party Games"){
            setTimeout(() => {
                bot._client.write("chat", {message:"/play arcade_party_games_1"})
            }, 1000);
            console.log("Subject was not in the correct game! They were sent back to it.")
        } else {
            console.log("Subject is in correct game");
        }
        checking = false;
    }
    console.log(message);
})

setTimeout(() => {
    bot._client.write("chat", {message:"/wtfmap"});
    checking = true;
}, 3000)

setInterval(() => {
    bot._client.write("chat", {message:"/wtfmap"});
    checking = true;
}, 300000);