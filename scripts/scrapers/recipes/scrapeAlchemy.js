// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractAlchemy = selector => {
  const alchemyUrl = selector
    .find("a[href^='/db/item/']")
    .attr("href")
    .trim();

  const alchemyName = selector
    .find(".itemname")
    .text()
    .trim();

  return { alchemyUrl, alchemyName };

}

const scrapeAlchemy = async () => {
  const url = "https://genshin.honeyhunterworld.com/db/item/crafting-recipes-alchemy/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find(".itemcont:lt(106)")
    //.find("a[href^='/db/item/']");
  
  const alchemy = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractAlchemy(elementSelector);
  })
  .get();
      
  return alchemy;  
}

module.exports = scrapeAlchemy;