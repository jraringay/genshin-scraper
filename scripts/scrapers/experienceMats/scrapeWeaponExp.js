// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

const extractWeaponExp = selector => {
  const weaponExpUrl = selector
    .find("a[href^='/db/item/']")
    .attr("href")
    .trim();

  const weaponExpName = selector
    .find(".itemname")
    .text()
    .trim();

  return { weaponExpUrl, weaponExpName };

}

const scrapeWeaponExp = async () => {
  const url = "https://genshin.honeyhunterworld.com/db/item/weapon-exp-material/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find(".itemcont")
    //.find("a[href^='/db/item/']");
  
  const weaponExp = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractWeaponExp(elementSelector);
  })
  .get();
      
  return weaponExp;  
}

module.exports = scrapeWeaponExp;