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

const extractCharacters = selector => {
  const characterUrl = selector
    .attr("href")
    .trim();

  const characterName = selector
    .find(".sea_charname")
    .text()
    .trim();

  return { characterUrl, characterName };

}

const scrapeCharacters = async () => {
  const url = "https://genshin.honeyhunterworld.com/db/char/characters/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find(".char_sea_cont > a[href^='/db/char/']:odd");
  
  const characters = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractCharacters(elementSelector);
  })
  .get();
      
  return characters;  
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



module.exports = scrapeCharacters;