const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Interaction } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [
    new SlashCommandBuilder()
		.setName('image')
		.setDescription('Losowe zdjęcie z wpisanego tematu!')
		.addStringOption(option =>
			option
				.setName('kategoria')
				.setDescription('wpisz słowo kluczowe')
		),
    new SlashCommandBuilder().setName('widzisz_mnie').setDescription('Srebrny Brek - widzisz mnie?'),
	new SlashCommandBuilder()
		.setName('info')
		.setDescription('Informacje na temat użytkownika lub serwera.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Inforamcje na temat użytkownika')
				.addUserOption(option => 
					option
						.setName('nick')
						.setDescription('Użytkownik')
				)
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('server')
				.setDescription('Informacje o serwerze')
		),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
