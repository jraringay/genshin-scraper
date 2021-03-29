// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractTalentMats = selector => {
  const talentMatUrl = selector
    .find("a[href^='/db/item/']")
    .attr("href")
    .trim();

  const talentMatName = selector
    .find(".itemname")
    .text()
    .trim();

  return { talentMatUrl, talentMatName };

}

const scrapeTalentMats = async () => {
  const url = "https://genshin.honeyhunterworld.com/db/item/talent-level-up-material/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find(".itemcont")
    //.find("a[href^='/db/item/']");
  
  const talentMats = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractTalentMats(elementSelector);
  })
  .get();
      
  return talentMats;  
}

module.exports = scrapeTalentMats;