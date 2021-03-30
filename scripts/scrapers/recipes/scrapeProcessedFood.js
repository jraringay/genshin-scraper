// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractProcessedFood = selector => {
  const processedFoodUrl = selector
    .find("a[href^='/db/item/']")
    .attr("href")
    .trim();

  const processedFoodName = selector
    .find(".itemname")
    .text()
    .trim();

  return { processedFoodUrl, processedFoodName };

}

const scrapeProcessedFood = async () => {
  const url = "https://genshin.honeyhunterworld.com/db/item/crafting-recipes-processing/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find(".itemcont")
    //.find("a[href^='/db/item/']");
  
  const processedFood = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractProcessedFood(elementSelector);
  })
  .get();
      
  return processedFood;  
}

module.exports = scrapeProcessedFood;