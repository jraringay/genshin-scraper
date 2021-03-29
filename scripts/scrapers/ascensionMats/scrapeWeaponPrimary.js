// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractWeaponPrimary = selector => {
  const weaponPrimaryUrl = selector
    .find("a[href^='/db/item/']")
    .attr("href")
    .trim();

  const weaponPrimaryName = selector
    .find(".itemname")
    .text()
    .trim();

  return {weaponPrimaryUrl,weaponPrimaryName };

}

const scrapeWeaponPrimary = async () => {
  const url = "https://genshin.honeyhunterworld.com/db/item/weapon-ascension-material-primary/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find(".itemcont")
    //.find("a[href^='/db/item/']");
  
  const weaponPrimary = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractWeaponPrimary(elementSelector);
  })
  .get();
      
  return weaponPrimary;  
}

module.exports = scrapeWeaponPrimary;