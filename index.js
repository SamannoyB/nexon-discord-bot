const Discord =require('discord.js');
const { Client, Intents, MessageEmbed, MessageActionRow, MessageReaction, CommandInteractionOptionResolver, GuildMember, DiscordAPIError } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],restRequestTimeout: 60000 });
const fs = require('fs');
require('dotenv').config();
const fetch = require('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');

// const { echo } = require('./SlashCommands/echo');

const prefix = process.env.PREFIX;

client.on('ready', () => {
    console.log(`Logged In As ${client.user.tag}!!!!`);
    client.guilds.cache.get("971381251581820948").commands.create({
       name: 'ping',
       description: "Check The Bot's Status",
       required: true,
       type: 'STRING'
    });
    client.guilds.cache.get("971381251581820948").commands.create({
            name: 'echo',
            description: 'Echoes your second parameter',
            options: [{
                name: 'message',
                description: 'message to be echoed!',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.STRING
            }]
    });
    client.guilds.cache.get("971381251581820948").commands.create({
        name: '8ball',
        description: 'Ask the magic 8ball question!',
        options: [
            {
            name: 'question',
            description: 'Question',
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING
            }
    ]
    });

});
client.on('interactionCreate', async (interaction) => {
        if (interaction.commandName === "ping") {
            interaction.reply('pong!');
        }
 });

 client.on('interactionCreate', async (interaction, message) => {
    if (!interaction.isCommand());

    if (interaction.commandName === "echo") {
        const echoMessage = interaction.options.getString("message");
        interaction.reply({
            content: `${echoMessage}`,
            ephemeral: false
        });
    }
 });

client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand());

    if (interaction.commandName === "8ball") {
        const options = ['Luck doesnt favour you', 'Wait for the future', 'Try harder','Stop asking 8balls rubbish','Yes you may get success if you try'];
        const result = options[Math.floor(Math.random() * options.length)];

        interaction.reply({
            content: `${result}`,
            ephemeral: false
        })
    }
})

client.login(process.env.TOKEN);