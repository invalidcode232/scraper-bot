import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { scrape } from "../actions/scrape";

module.exports = {
	data: new SlashCommandBuilder()
        .setName('scrape')
        .setDescription('Scrapes steam profile/group')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Type of profile/group to scrape')
                .setRequired(true)
                .addChoices({
                    name: 'profile', 
                    value: 'profile',
                })
                .addChoices({
                    name: 'group',
                    value: 'group',
                })
        )
        .addNumberOption(option =>
            option.setName('number')
                .setDescription('Number of profiles/groups to scrape')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('wordlist')
                .setDescription('Word list to scrape from')
                .setRequired(true)
                .addChoices({
                    name: 'random word',
                    value: 'random word',
                })
                .addChoices({
                    name: '3 letter',
                    value: '3 letter',
                })
                .addChoices({
                    name: '4 letter',
                    value: '4 letter',
                })
        ),

	async execute(interaction: CommandInteraction) {
        const type = interaction.options.get('type')?.value
        const number = interaction.options.get('number')?.value
        const wordlist = interaction.options.get('wordlist')?.value

        scrape(type as string, number as number, wordlist as string, interaction);

		return interaction.reply(`Scraping ${number} IDs for ${type}..`);
	},
};