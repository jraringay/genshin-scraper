// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractCharExp = selector => {
  const charExpUrl = selector
    .find("a[href^='/db/item/']")
    .attr("href")
    .trim();

  const charExpName = selector
    .find(".itemname")
    .text()
    .trim();

  return { charExpUrl, charExpName };

}

const scrapeCharExp = async () => {
  const url = "https://genshin.honeyhunterworld.com/db/item/character-exp-material/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find(".itemcont")
    //.find("a[href^='/db/item/']");
  
  const charExp = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractCharExp(elementSelector);
  })
  .get();
      
  return charExp;  
}

module.exports = scrapeCharExp;