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
exports.scrape = void 0;
const discord_js_1 = require("discord.js");
const scraper_1 = require("../utils/scraper");
const wordgen_1 = require("../utils/wordgen");
function scrape(type, num, wordListType, interaction, channel, client) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let wordlist = [];
        if (wordListType === 'random word') {
            wordlist = (yield (0, wordgen_1.getRandomWordList)(num));
        }
        else if (wordListType === '3 letter') {
            wordlist = (0, wordgen_1.getRandomStringList)(num, 3);
        }
        else if (wordListType === '4 letter') {
            wordlist = (0, wordgen_1.getRandomStringList)(num, 4);
        }
        // Scraper data
        const startTime = performance.now();
        const customChannel = channel !== undefined;
        let scrapedIds = 1;
        for (let i = 0; i < num; i++) {
            const word = wordlist[i];
            const isValid = yield (0, scraper_1.isValidId)(type, word);
            if (isValid) {
                if (customChannel)
                    client.channels.cache.get(channel).send(`[${scrapedIds}] ${word} is a valid ${type}`);
                else
                    (_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.send(`[${scrapedIds}] ${word} is valid!`);
                scrapedIds++;
                yield new Promise(resolve => setTimeout(resolve, 3000));
            }
        }
        const endTime = performance.now();
        const embed = new discord_js_1.MessageEmbed()
            .setColor('#42f551')
            .setTitle('Scraping complete')
            .addFields({ name: 'Scraped IDs', value: (scrapedIds - 1).toString(), inline: true }, { name: 'Time elapsed', value: `${Math.round((endTime - startTime) / 1000)} seconds`, inline: true });
        (_b = interaction.channel) === null || _b === void 0 ? void 0 : _b.send({
            embeds: [embed]
        });
    });
}
exports.scrape = scrape;
