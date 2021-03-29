// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractPotions = selector => {
  const potionUrl = selector
    .find("a[href^='/db/item/']")
    .attr("href")
    .trim();

  const potionName = selector
    .find(".itemname")
    .text()
    .trim();

  return { potionUrl, potionName };

}

const scrapePotions = async () => {
  const url = "https://genshin.honeyhunterworld.com/db/item/potions/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find(".itemcont")
    //.find("a[href^='/db/item/']");
  
  const potions = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractPotions(elementSelector);
  })
  .get();
      
  return potions;  
}

module.exports = scrapePotions;