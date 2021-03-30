// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractCooking = selector => {
  const cookingUrl = selector
    .find("a[href^='/db/item/']")
    .attr("href")
    .trim();

  const cookingName = selector
    .find(".itemname")
    .text()
    .trim();

  return { cookingUrl, cookingName };

}

const scrapeCooking = async () => {
  const url = "https://genshin.honeyhunterworld.com/db/item/crafting-recipes-cooking/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find(".itemcont")
    //.find("a[href^='/db/item/']");
  
  const cooking = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractCooking(elementSelector);
  })
  .get();
      
  return cooking;  
}

module.exports = scrapeCooking;