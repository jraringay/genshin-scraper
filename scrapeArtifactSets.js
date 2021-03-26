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

const extractArtifactSets = selector => {
  const artifactSetUrl = selector
    .attr("href")
    .trim();

  const artifactSetName = selector
    .text()
    .trim();

  return { artifactSetUrl, artifactSetName };

}

const scrapeArtifactSets = async () => {
  const url = "https://genshin.honeyhunterworld.com/db/artifact/"
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  // const searchResults = selector("body")
  //   .find(".wrappercont > .art_stat_table");
  const searchResults = selector("body")
    .find("a[href^='/db/art/family/']:odd");
  
  const artifactSets = searchResults.map((index, element) => {
    const elementSelector = selector(element);
    return extractArtifactSets(elementSelector);
  })
  .get();
      
  return artifactSets;  
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



module.exports = scrapeArtifactSets;