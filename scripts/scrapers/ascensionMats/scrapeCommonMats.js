// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractCommonMats = selector => {
  const commonMatUrl = selector
    .find("a[href^='/db/item/']")
    .attr("href")
    .trim();

  const commonMatName = selector
    .find(".itemname")
    .text()
    .trim();

  return { commonMatUrl, commonMatName };

}

const scrapeCommonMats = async () => {
  const url = "https://genshin.honeyhunterworld.com/db/item/character-ascension-material-secondary-material/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find(".itemcont:lt(21)")
    //.find("a[href^='/db/item/']");
  
  const commonMats = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractCommonMats(elementSelector);
  })
  .get();
      
  return commonMats;  
}

module.exports = scrapeCommonMats;