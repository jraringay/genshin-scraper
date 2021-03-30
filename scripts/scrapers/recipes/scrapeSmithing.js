// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractSmithing = selector => {
  const smithingUrl = selector
    .find("a[href^='/db/item/']")
    .attr("href")
    .trim();

  const smithingName = selector
    .find(".itemname")
    .text()
    .trim();

  return { smithingUrl, smithingName };

}

const scrapeSmithing = async () => {
  const url = "https://genshin.honeyhunterworld.com/db/item/crafting-recipes-smithing/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find(".itemcont")
    //.find("a[href^='/db/item/']");
  
  const smithing = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractSmithing(elementSelector);
  })
  .get();
      
  return smithing;  
}

module.exports = scrapeSmithing;