const mineflayer = require('mineflayer');
const fs = require('fs');
require('dotenv').config();

process.on('uncaughtException', (error) => {
    console.log(error);
})

run();

function run() {

    var checking = false;

    const bot = mineflayer.createBot({
        host: "mc.hypixel.net",
        port: 25565,
        username: process.env.EMAIL,
        password: process.env.PASSWORD
    })

    console.log("Connected!");

    bot.on("error", (error) => {
        console.log(error);
    })

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
            if(message == "This command is not available on this server!"){
                setTimeout(() => {
                    bot._client.write("chat", {message:"/play arcade_party_games_1"})
                }, 1000);
                console.log("Subject was not in the correct game! They were sent back to it.")
                checking = false;
            } else if(message.startsWith("You are currently playing")) {
                if(message == "You are currently playing on Party Games"){
                    console.log("Subject is in correct game");
                    checking = false;
                } else {
                    setTimeout(() => {
                        bot._client.write("chat", {message:"/play arcade_party_games_1"})
                    }, 1000);
                    console.log("Subject was not in the correct game! They were sent back to it.")
                    checking = false;
                }
            }
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
    }, 150000);

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    // auto reconnect feature
    bot.on('end', (packet) => {
        console.log(packet);
        bot.destroy;
        run()
    })

    bot.on('disconnect', (packet) => {
        console.log(packet);
        bot.destroy;
        run()
    })

    bot.on('kick_disconnect', (packet) => {
        console.log(packet);
        bot.destroy;
        run()
    })

}