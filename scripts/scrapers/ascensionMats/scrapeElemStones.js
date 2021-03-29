// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractElemStones = selector => {
  const elemStoneUrl = selector
    .find("a[href^='/db/item/']")
    .attr("href")
    .trim();

  const elemStoneName = selector
    .find(".itemname")
    .text()
    .trim();

  return { elemStoneUrl, elemStoneName };

}

const scrapeElemStones = async () => {
  const url = "https://genshin.honeyhunterworld.com/db/item/character-ascension-material-elemental-stone/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find(".itemcont:lt(7)")
    //.find("a[href^='/db/item/']");
  
  const elemStones = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractElemStones(elementSelector);
  })
  .get();
      
  return elemStones;  
}

module.exports = scrapeElemStones;