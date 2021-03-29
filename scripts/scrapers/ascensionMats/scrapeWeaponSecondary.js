// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractWeaponSecondary = selector => {
  const weaponSecondaryUrl = selector
    .find("a[href^='/db/item/']")
    .attr("href")
    .trim();

  const weaponSecondaryName = selector
    .find(".itemname")
    .text()
    .trim();

  return {weaponSecondaryUrl,weaponSecondaryName };

}

const scrapeWeaponSecondary = async () => {
  const url = "https://genshin.honeyhunterworld.com/db/item/weapon-ascension-material-secondary/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find(".itemcont")
    //.find("a[href^='/db/item/']");
  
  const weaponSecondary = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractWeaponSecondary(elementSelector);
  })
  .get();
      
  return weaponSecondary;  
}

module.exports = scrapeWeaponSecondary;