import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction, MessageEmbed } from "discord.js";
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
        )
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Channel to send results to')
                .setRequired(false)
            ),

    async execute(interaction: CommandInteraction, client: Client) {
        const scrapeType = interaction.options.get('type')?.value
        const number = interaction.options.get('number')?.value
        const wordlist = interaction.options.get('wordlist')?.value
        const channel = interaction.options.get('channel')?.value

        const embed = new MessageEmbed()
            .setColor('#42f551')
            .setTitle('Scraping started')
            .addFields(
                { name: 'IDs to scrape', value: number ? number.toString() : '', inline: true },
                { name: 'Type', value: scrapeType ? scrapeType as string : '', inline: true },
            )

        scrape(scrapeType as string, number as number, wordlist as string, interaction, channel as string | undefined, client);

        return interaction.reply({ embeds: [embed] });
    },
};