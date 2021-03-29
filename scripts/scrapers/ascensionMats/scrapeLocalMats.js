// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractLocalMats = selector => {
  const localMatUrl = selector
    .find("a[href^='/db/item/']")
    .attr("href")
    .trim();

  const localMatName = selector
    .find(".itemname")
    .text()
    .trim();

  return { localMatUrl, localMatName };

}

const scrapeLocalMats = async () => {
  const url = "https://genshin.honeyhunterworld.com/db/item/character-ascension-material-local-material/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find(".itemcont")
    //.find("a[href^='/db/item/']");
  
  const localMats = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractLocalMats(elementSelector);
  })
  .get();
      
  return localMats;  
}

module.exports = scrapeLocalMats;