const { Client, Intents, MessageEmbed, MessageActionRow, MessageReaction } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],restRequestTimeout: 60000 });
var mysql = require('mysql');
const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config();



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', () => {
      if (message.content.startsWith(`nx!ping`){
             message.react('👍');
             message.reply('Pong!');
       }
});

client.on('messageCreate', message => {
    if(message.content.startsWith('nx!help')){
        message.react('👍');
       const embed = new MessageEmbed()
           .setColor('#0099ff')
           .setTitle('Help Commands: ')
           .setDescription('These Are All The Help Commands for nexom giveaway bot listed below: ')
           .addFields(
               { name: 'nx!help', value: 'Shows Help Commands!'},
               { name: 'nx!create [giveaway-name] [giveaway-time] [giveaway-prize]', value: 'This creates a giveaway :tada: :tada:' }
           )


         message.channel.send({ embeds: [embed] })
    }
})

client.on('messageCreate', message => {
  if(message.content.startsWith('nx!gain')) {
    const money = ['500', '1000', '3000', '5000'];
    const moneyGiven = money[Math.floor(Math.random() * money.length)];

    message.reply(`Here You Are LOL You Get ** $${moneyGiven} **!`);

    
  }
});

client.on('messageCreate', message => {
    if(message.content.startsWith(`nx!gif`)) {
        const msgContent = message.content.split(" ");

        if(msgContent[1] == "") {
            message.react('👎');
            message.reply('You seem to be dumb, mention the gif name! ``` nx!gif [gif-name] ```')
        }

         fetch(`https://api.tenor.com/v1/search?q=${msgContent[1]}&key=LIVDSRZULELA&limit=5`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            const numberOfGifs = ['1','2','3','4','5'];
            const chosenGif = numberOfGifs[Math.floor(Math.random() * numberOfGifs.length)]

            const gif = data.results[`${chosenGif}`].media[0].gif.url;

            message.reply(gif);
        })
    }
})

client.on('messageCreate', message => {
    if(message.content.startsWith(`nx!quote`)) {
        message.react('<:pepe:983657987996545034>');
        fetch('https://api.quotable.io/random').then(res => res.json()).then(data => {
            message.reply(data.content);
        })
    }
})

client.on('messageCreate', message => {
    if(message.content.startsWith(`nx!pic`) || message.content.startsWith('nx!img') || message.content.startsWith('nx!image')) {
        message.react('<:pepe:983657987996545034>');
        const splitted = message.content.split(" ");
       fetch('https://pixabay.com/api/?key=25434117-2ee302a9f280db04fe54efa99&q='+splitted[1]+'&image_type=photo').then(res => res.json()).then(result => {
               console.log(result);

            const numberOfImages = ['1','2','3','4','5'];
            const chosenImg = numberOfImages[Math.floor(Math.random() * numberOfImages.length)]

            const img = result.hits[`${chosenImg}`].userImageURL;

            message.reply(gif);
           })
    }
})

client.login(process.env.TOKEN)
