const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});

const prefix = process.env.PREFIX;

const fs = require('fs');

client.commands = new Discord.Collection();

const command_files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of command_files){
    const command = require(`./commands/${file}`);
    
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Rhippo is online!');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'pls'){
        client.commands.get('pls').execute(client, message, args);
    } 
});

client.login(process.env.DISCORD_TOKEN);