var Scraper = require('images-scraper');

const google = new Scraper({
    puppeteer: {
      headless: true
    }
})

module.exports = {
    name: 'pls',
    description: 'this sends an image to a Discord text channel',
    async execute(client, message, args){
        const image_query = args.join(' ');
        if(!image_query) return message.channel.send('Please tell me what image you want');

        const image_results = await google.scrape(image_query, 1);
        message.channel.send(image_results[0].url);
    }
}