// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

let characterList = []

const extractCharacters = selector => {
  const characterUrl = selector
    .find("a[href^='/db/char/']")
    .attr("href")
    .trim();

  const characterName = selector
    .find(".sea_charname")
    .text()
    .trim();

  characterList.push(characterUrl);
  
  return { characterUrl, characterName };

}

const scrapeCharacters = async () => {
  try {
    const url = "https://genshin.honeyhunterworld.com/db/char/characters/"
    const html = await fetchHtml(url);
    const selector = cheerio.load(html);
    // const searchResults = selector("body")
    //   .find(".wrappercont > .art_stat_table");
    const searchResults = selector("body")
    .find(".char_sea_cont");
  
    const characters = searchResults.map((index, element) => {
      const elementSelector = selector(element);
      return extractCharacters(elementSelector);
    })
    .get();
    console.log(characterList);
    return characters;
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
  }
  
}

// .item_main_table
// .itempic src
// tr(1) td(1)
// tr(2) td(1)
// tr(3) td(1)
// tr(4) td(1)
// tr(5) td(1)
// tr(6) td(1)
// tr(7) td(1)
// tr(8) td(1)
// tr(9) td(1)
// tr(10) td(1)
// tr(11) td(1)
// tr(12) td(1)




module.exports = scrapeCharacters;