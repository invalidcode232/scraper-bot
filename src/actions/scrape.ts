import { CommandInteraction } from "discord.js";
import { isValidId } from "../utils/scraper";
import { getRandomStringList, getRandomWordList } from "../utils/wordgen";

async function scrape(type: string, num: number, wordListType: string, interaction: CommandInteraction) {
    let wordlist: string[] = []
    if (wordListType === 'random word') {
        wordlist = await getRandomWordList(num) as string[]
    }
    else if (wordListType === '3 letter') {
        wordlist = getRandomStringList(num, 3)
    }
    else if (wordListType === '4 letter') {
        wordlist = getRandomStringList(num, 4)
    }

    for (let i = 0; i < num; i++) {
        const word = wordlist[i]

        const isValid = await isValidId(type, word)

        if (isValid) 
            interaction.channel?.send(`${word} is valid!`)
    }
}

export { scrape };
