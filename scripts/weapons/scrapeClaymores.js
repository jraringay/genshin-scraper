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

const extractClaymores = selector => {
  const claymoreUrl = selector
    .attr("href")
    .trim();

  const claymoreName = selector
    .text()
    .trim();

  return { claymoreUrl, claymoreName };

}

const scrapeClaymores = async () => {
  const url = "https://genshin.honeyhunterworld.com/claymore/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find("a[href^='/db/weapon/']:lt(42):odd");
  
  const claymores = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractClaymores(elementSelector);
  })
  .get();
      
  return claymores;  
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



module.exports = scrapeClaymores;