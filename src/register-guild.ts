// Initialize .env
require('dotenv').config();

// Imports
import * as fs from 'fs'
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

// Read and register commands
const commands = [];
const commandFiles = fs.readdirSync('./build/commands').filter((file: string) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
} 

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN as string);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID as string, '971356028505575424'), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);