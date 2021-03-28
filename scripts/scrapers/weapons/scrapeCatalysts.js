// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractCatalysts = selector => {
  const catalystUrl = selector
    .attr("href")
    .trim();

  const catalystName = selector
    .text()
    .trim();

  return { catalystUrl, catalystName };

}

const scrapeCatalysts = async () => {
  const url = "https://genshin.honeyhunterworld.com/catalyst/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find("a[href^='/db/weapon/']:lt(42):odd");
  
  const catalysts = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractCatalysts(elementSelector);
  })
  .get();
      
  return catalysts;  
}

module.exports = scrapeCatalysts;