// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractBows = selector => {
  const bowUrl = selector
    .attr("href")
    .trim();

  const bowName = selector
    .text()
    .trim();

  return { bowUrl, bowName };

}

const scrapeBows = async () => {
  const url = "https://genshin.honeyhunterworld.com/bow/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find("a[href^='/db/weapon/']:lt(43):odd");
  
  const bows = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractBows(elementSelector);
  })
  .get();
      
  return bows;  
}

module.exports = scrapeBows;