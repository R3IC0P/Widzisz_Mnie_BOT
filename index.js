// Require the necessary discord.js classes
const { channelMention } = require('@discordjs/builders');
const { Client, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const channel = client.channels.cache.get('id');

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
	} else if (commandName === 'image') {
        await interaction.reply('Losowe zdjęcia są w trakcie budowy ;)');
    } else if (commandName === 'widzisz_mnie') {
		await interaction.reply('Widzisz mnie?');
		const widziszMnie = new MessageEmbed()
			.setColor('#00fff0')
			.setTitle('Srebrny Brek')
			.setDescription('Legendarna postać polskiego internetu\n- Ma ponad 70 lat\n- Nazywany "BREK" lub "Srebrny Brek"\n- Pochodzi z Żyrardowa')
			.setThumbnail('https://steamuserimages-a.akamaihd.net/ugc/1701780966243068769/953B5469D8306D6D7D064F01320D903DA319CE40/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false')
			.addField('Nagranie', 'https://youtu.be/K8hiXbyO8PU?t=4', true)
			.setTimestamp();
		await interaction.channel.send({ embeds: [widziszMnie] });
	}
});

// Login to Discord with your client's token
client.login(token);
