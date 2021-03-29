// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractJewels = selector => {
  const jewelUrl = selector
    .find("a[href^='/db/item/']")
    .attr("href")
    .trim();

  const jewelName = selector
    .find(".itemname")
    .text()
    .trim();

  return { jewelUrl, jewelName };

}

const scrapeJewels = async () => {
  const url = "https://genshin.honeyhunterworld.com/db/item/character-ascension-material-jewel/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find(".itemcont:lt(28)")
    //.find("a[href^='/db/item/']");
  
  const jewels = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractJewels(elementSelector);
  })
  .get();
      
  return jewels;  
}

module.exports = scrapeJewels;