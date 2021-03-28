// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractPolearms = selector => {
  const polearmUrl = selector
    .attr("href")
    .trim();

  const polearmName = selector
    .text()
    .trim();

  return { polearmUrl, polearmName };

}

const scrapePolearms = async () => {
  const swordUrl = "https://genshin.honeyhunterworld.com/polearm/"
  const html = await fetchHtml(swordUrl);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find("a[href^='/db/weapon/']:lt(36):odd");
  
  const polearms = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractPolearms(elementSelector);
  })
  .get();
      
  return polearms;  
}

module.exports = scrapePolearms;