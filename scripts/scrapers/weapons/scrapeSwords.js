// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractSwords = selector => {
  const swordUrl = selector
    .attr("href")
    .trim();

  const swordName = selector
    .text()
    .trim();

  return { swordUrl, swordName };

}

const scrapeSwords = async () => {
  try {
    const url = "https://genshin.honeyhunterworld.com/sword/"
    const html = await fetchHtml(url);
    const selector = cheerio.load(html);
    // const searchResults = selector("body")
    //   .find(".wrappercont > .art_stat_table");
    const searchResults = selector("body")
    .find("a[href^='/db/weapon/']:lt(48):odd");
  
    const swords = searchResults.map((index, element) => {
      const elementSelector = selector(element);
      return extractSwords(elementSelector);
    })
    .get();
      
    return swords;
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
  }
  
    
}

module.exports = scrapeSwords;