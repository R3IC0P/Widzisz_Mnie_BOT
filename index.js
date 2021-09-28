// Require the necessary discord.js classes
const { channelMention } = require('@discordjs/builders');
const { Client, Intents, MessageEmbed } = require('discord.js');
const { promisify } = require('util');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Variables
//const channel = client.channels.cache.get('id');
const wait = require('util').promisify(setTimeout);

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Interactions with commands using "/"
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'image') {
		const search = interaction.options.getString('kategoria');
        await interaction.reply({
			content: `https://imgur.com/search/score/all?q_type=png&q_all=${search}`
		});
    }
	else if (commandName === 'widzisz_mnie') {
		const widziszMnieEmbed = new MessageEmbed()
			.setColor('#00fff0')
			.setTitle('Srebrny Brek')
			.setDescription('**Legendarna postać polskiego internetu**\n- Ma ponad 70 lat\n- Nazywany "BREK" lub "Srebrny Brek"\n- Pochodzi z Żyrardowa\n\n**Piękne słowa**\nWidzisz mnie?')
			.setThumbnail('https://steamuserimages-a.akamaihd.net/ugc/1701780966243068769/953B5469D8306D6D7D064F01320D903DA319CE40/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false')
			.addField('Nagranie', 'https://youtu.be/K8hiXbyO8PU?t=4', true);
		await interaction.reply({
			embeds: [widziszMnieEmbed]
		});
	}
	else if (commandName === 'info') {
		if (interaction.options.getSubcommand() == 'user') {
			const user = interaction.options.getUser('nick');
			if (user) {
				const userTargetEmbed = new MessageEmbed()
					.setColor('#00fff0')
					.setTitle('Informacje o użytkowniku')
					.setDescription(`**Nazwa użytkownika**\n${user.username}\n\n**ID**\n${user.id}`)
					.setThumbnail(user.avatarURL());
				await interaction.reply({
					embeds: [userTargetEmbed]
				});
			}
			else {
				const userYouEmbed = new MessageEmbed()
					.setColor('#00fff0')
					.setTitle('Informacje o użytkowniku')
					.setDescription(`**Twoja nazwa użytkownika**\n${interaction.user.username}\n\n**Twoje ID**\n${interaction.user.id}`)
					.setThumbnail(interaction.user.avatarURL());
				await interaction.reply({
					embeds: [userYouEmbed],
					ephemeral: true
				});
			}
		}
		else if (interaction.options.getSubcommand() === 'server') {
			const serverEmbed = new MessageEmbed()
				.setColor('#00fff0')
				.setTitle('Informacje o serwerze')
				.setDescription(`**Nazwa serwera**\n${interaction.guild.name}\n\n**Ilość użytkowników**\n${interaction.guild.memberCount}`)
				.setThumbnail(interaction.guild.iconURL());
			await interaction.reply({
				embeds: [serverEmbed]
			});
		}
	}
});

// Login to Discord with your client's token
client.login(token);
