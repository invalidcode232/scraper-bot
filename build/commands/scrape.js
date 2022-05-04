"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const scrape_1 = require("../actions/scrape");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('scrape')
        .setDescription('Scrapes steam profile/group')
        .addStringOption(option => option.setName('type')
        .setDescription('Type of profile/group to scrape')
        .setRequired(true)
        .addChoices({
        name: 'profile',
        value: 'profile',
    })
        .addChoices({
        name: 'group',
        value: 'group',
    }))
        .addNumberOption(option => option.setName('number')
        .setDescription('Number of profiles/groups to scrape')
        .setRequired(true))
        .addStringOption(option => option.setName('wordlist')
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
    }))
        .addChannelOption(option => option.setName('channel')
        .setDescription('Channel to send results to')
        .setRequired(false)),
    execute(interaction, client) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const scrapeType = (_a = interaction.options.get('type')) === null || _a === void 0 ? void 0 : _a.value;
            const number = (_b = interaction.options.get('number')) === null || _b === void 0 ? void 0 : _b.value;
            const wordlist = (_c = interaction.options.get('wordlist')) === null || _c === void 0 ? void 0 : _c.value;
            const channel = (_d = interaction.options.get('channel')) === null || _d === void 0 ? void 0 : _d.value;
            const embed = new discord_js_1.MessageEmbed()
                .setColor('#42f551')
                .setTitle('Scraping started')
                .addFields({ name: 'IDs to scrape', value: number ? number.toString() : '', inline: true }, { name: 'Type', value: scrapeType ? scrapeType : '', inline: true });
            (0, scrape_1.scrape)(scrapeType, number, wordlist, interaction, channel, client);
            return interaction.reply({ embeds: [embed] });
        });
    },
};
