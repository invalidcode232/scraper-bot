import { Client, CommandInteraction, MessageEmbed, TextChannel } from "discord.js";
import { isValidId } from "../utils/scraper";
import { getRandomStringList, getRandomWordList } from "../utils/wordgen";

async function scrape(type: string, num: number, wordListType: string, interaction: CommandInteraction, channel: string | undefined, client: Client) {
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

    // Scraper data
    const startTime = performance.now()
    const customChannel = channel !== undefined
    let scrapedIds = 1

    for (let i = 0; i < num; i++) {
        const word = wordlist[i]

        const isValid = await isValidId(type, word)

        if (isValid) {
            if (customChannel)
                (client.channels.cache.get(channel) as TextChannel).send(`[${scrapedIds}] ${word} is a valid ${type}`)
            else
                interaction.channel?.send(`[${scrapedIds}] ${word} is valid!`)

            scrapedIds++

            await new Promise(resolve => setTimeout(resolve, 3000))
        }
    }
    const endTime = performance.now();

    const embed = new MessageEmbed()
        .setColor('#42f551')
        .setTitle('Scraping complete')
        .addFields(
            { name: 'Scraped IDs', value: (scrapedIds - 1).toString(), inline: true },
            { name: 'Time elapsed', value: `${Math.round((endTime - startTime) / 1000)} seconds`, inline: true },
        )

    interaction.channel?.send({
        embeds: [embed]
    })
}

export { scrape };
