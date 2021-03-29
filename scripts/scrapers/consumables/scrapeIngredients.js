// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractIngredients = selector => {
  const ingredientUrl = selector
    .find("a[href^='/db/item/']")
    .attr("href")
    .trim();

  const ingredientName = selector
    .find(".itemname")
    .text()
    .trim();

  return { ingredientUrl, ingredientName };

}

const scrapeIngredients = async () => {
  const url = "https://genshin.honeyhunterworld.com/db/item/ingredients/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find(".itemcont")
    //.find("a[href^='/db/item/']");
  
  const ingredients = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractIngredients(elementSelector);
  })
  .get();
      
  return ingredients;  
}

module.exports = scrapeIngredients;