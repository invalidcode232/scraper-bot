import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

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
        ),

	async execute(interaction: CommandInteraction) {
		return interaction.reply('Pongyy!');
	},
};