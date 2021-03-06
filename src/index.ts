// Initialize .env
require('dotenv').config();

// Imports
import { Client, Intents, Collection } from 'discord.js'
import * as fs from 'fs'

// Initialize our bot client
const client = new Client({
	intents: [Intents.FLAGS.GUILDS]
});

// Get commands
client.commands = new Collection()
const commandFiles = fs.readdirSync('./build/commands').filter((file: string) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.data.name, command)
}

// Callbacks
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})

client.login(process.env.TOKEN);

