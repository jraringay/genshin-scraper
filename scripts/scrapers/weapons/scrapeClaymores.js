// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractClaymores = selector => {
  const claymoreUrl = selector
    .attr("href")
    .trim();

  const claymoreName = selector
    .text()
    .trim();

  return { claymoreUrl, claymoreName };

}

const scrapeClaymores = async () => {
  const url = "https://genshin.honeyhunterworld.com/claymore/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find("a[href^='/db/weapon/']:lt(42):odd");
  
  const claymores = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractClaymores(elementSelector);
  })
  .get();
      
  return claymores;  
}

module.exports = scrapeClaymores;