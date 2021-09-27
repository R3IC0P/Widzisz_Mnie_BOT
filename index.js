// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Nazwa serwera: ${interaction.guild.name}\nIlość członków: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Nazwa użytkownika: ${interaction.user.tag}\nTwoje id: ${interaction.user.id}`);
	} else if (commandName === 'cycunie') {
        await interaction.reply('Cycuchy zostaną dodane w najbliższym czasie ;)');
    }
});

// Login to Discord with your client's token
client.login(token);
