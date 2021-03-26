// Call required packages
const cheerio = require("cheerio");
const axios = require("axios").default;

const fetchHtml = async url => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(`ERROR: An error occurred while trying to fetch the URL: ${url}`);
  }
};

const extractSwords = selector => {
  const linkToSword = selector
    .attr("href")
    .trim();

  const swordName = selector
    .text()
    .trim();

  return { linkToSword, swordName };

}

const scrapeSwords = async () => {
  const swordUrl = "https://genshin.honeyhunterworld.com/sword/"
  const html = await fetchHtml(swordUrl);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find("a[href^='/db/weapon/']");
  
  const swords = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractSwords(elementSelector);
  })
  .get();
      
  return swords;  
}

/* Backup code */
// Weapon / Type / Rarity / ATK / Secondary / Passive / Bonus
// const scrapeWeapons = async () => {
//   const weaponUrl = "https://genshin.gg/weapons";

//   const html = await fetchHtml(weaponUrl);

//   const selector = cheerio.load(html);

//   const searchResults = selector("body")
//     .find(".rt-thead -header > .rt-tbody > .rt-tr-group");

//   const weapons = searchResults.map((index, element) => {
//     const elementSelector = selector(el);
//     return extractWeapons(elementSelector);
//   })
//   .get();

//   return weapons;

// };



module.exports = scrapeSwords;