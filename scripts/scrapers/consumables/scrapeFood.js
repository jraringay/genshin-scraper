// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractFood = selector => {
  const foodUrl = selector
    .find("a[href^='/db/item/']")
    .attr("href")
    .trim();

  const foodBuff = selector
    .find(".itempic_cont > img[src^='/img/icons/buffs/']")
    .attr("src");

  let foodBuffType;

  if (foodBuff == null) {
    foodBuffType = "N/A";
  } else {
    foodBuffType = foodBuff.trim();
  }

  const foodName = selector
    .find(".itemname")
    .text()
    .trim();

  return { foodUrl, foodBuffType, foodName };

}

const scrapeFood = async () => {
  const url = "https://genshin.honeyhunterworld.com/db/item/food/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find(".itemcont")
    //.find("a[href^='/db/item/']");
  
  const food = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractFood(elementSelector);
  })
  .get();
      
  return food;  
}

module.exports = scrapeFood;