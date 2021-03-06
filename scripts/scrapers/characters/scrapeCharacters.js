// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");
const capitalize = require("../../../utilities/capitalize");
const camelCase = require("../../../utilities/camelCase");

let characterList = [];
let $;

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
    const selector = $ = cheerio.load(html);
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

let extractCharacterInfo = selector => {
  const characterName = selector
  .find(".post-title.entry-title")
  .text()
  .trim();
  
  const characterTitle = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(1) td:eq(1)")
  .text()
  .trim();

  const characterAllegiance = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(2) td:eq(1)")
  .text()
  .trim();

  const characterRarity = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(3) td:eq(1) div.sea_char_stars_wrap")
  .length;

  const weaponType = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(4) td:eq(1)")
  .text()
  .trim();

  const elementSrc = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(5) td:eq(1) img")
  .attr("src")
  .trim();

  const characterElement = capitalize(elementSrc.slice(elementSrc.lastIndexOf("/")+1, elementSrc.indexOf("_")));

  const characterBirthday = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(6) td:eq(1)")
  .text()
  .trim();

  const astrolabeName = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(7) td:eq(1)")
  .text()
  .trim();

  const chineseVoice = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(8) td:eq(1)")
  .text()
  .trim();

  const japaneseVoice = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(9) td:eq(1)")
  .text()
  .trim();

  const englishVoice = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(10) td:eq(1)")
  .text()
  .trim();

  const koreanVoice = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(11) td:eq(1)")
  .text()
  .trim();

  const inGameDescription = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(12) td:eq(1)")
  .text()
  .trim();
  
  let getStats = (selector) => {
    let stats = [];
    let headers = selector
        .find(`#live_data .add_stat_table:eq(1) tr:eq(0) td`)
        .filter((_, node) => $(node).text().trim() !== 'Ascension'); // TODO: Can probably be added back in with special handling
    let props = []
    headers.each((_, node) => {
      const text = $(node).text().trim();
      props.push(camelCase(text.replace(/[^a-z\s]/i, '')));
    })
    
    const rows = selector
      .find(`#live_data .add_stat_table:eq(1) tr`).length;
    
    for (let index = 1; index < rows; index++) {
      const row = {};
      for (let field = 0; field < props.length; field++) {
        row[props[field]] = selector
          .find(`#live_data .add_stat_table:eq(1) tr:eq(${index}) td:eq(${field})`)
          .text()
          .trim();
      }
      stats.push(row)
    }
       
    return stats;
  }

  const statProgression = getStats(selector);

  // const atkTalents = selector
  // // .find("#live_data .item_main_table:eq(1) a[href^='/db/skill/']")
  // .find("#live_data .item_main_table:eq(1) .skill_desc_layout")
  // .text();

  // item_main_table:eq(1) 

  return { characterName, characterTitle, characterAllegiance, characterRarity, weaponType, characterElement, characterBirthday, astrolabeName, chineseVoice, japaneseVoice, englishVoice, koreanVoice, inGameDescription, statProgression };
}

const scrapeCharactersTwo = async () => {
  try {
    await scrapeCharacters();
  
    const url = "https://genshin.honeyhunterworld.com/db/char/barbara/"
    const html = await fetchHtml(url);
    const selector = cheerio.load(html);
    const searchResults = selector("body")
    .find(".entry.clearfix");
    const characterInfo = extractCharacterInfo(searchResults);
    console.log(characterInfo);
    return characterInfo;


    // Using Promise.all()

    // let promiseArr = [];
    // let resultArr = [];

    // for (const element of characterList) {
    //   const url = "https://genshin.honeyhunterworld.com" + element;
    //   let html = fetchHtml(url);
    //   promiseArr.push(html);
    // }

    // const allCharacters = await Promise.all(promiseArr);

    // for (const character of allCharacters) {
    //   let selector = cheerio.load(character);
    //   let searchResults = selector("body")
    //     .find(".entry.clearfix");
    //   // console.log(searchResults)
    //   let characterInfo = extractCharacterInfo(searchResults);
    //   console.log(characterInfo);
    //   resultArr.push(characterInfo);
    // }
    
    // return resultArr;
    

    // Without using Promise.all()

    // resultArr = [];

    // for (const element of characterList) {
    //   const url = "https://genshin.honeyhunterworld.com" + element;
    //   let html = await fetchHtml(url);
    //   console.log(url);
    //   let selector = cheerio.load(html);
    //   let searchResults = selector("body")
    //     .find(".entry.clearfix");
    //   // console.log(searchResults)
    //   let characterInfo = searchResults.map((index, element) => {
    //     let elementSelector = selector(element);
    //     return extractCharacterInfo(elementSelector);
    //   })
    //   .get();
    //   console.log(characterInfo)
    //   resultArr.push(characterInfo)
    // }
    // return resultArr;
  } catch (error) {
    console.error(`ERROR: ${error.name} : ${error.message}`);
  }
  
}




// (\w+)(?:_35\.png) . match(thing)[1]
// /img/icons/element/hydro_35.png - Hydro
// /img/icons/element/pyro_35.png - Pyro
// /img/icons/element/cryo_35.png - Cryo
// /img/icons/element/electro_35.png - Electro
// /img/icons/element/anemo_35.png - Anemo

// .entry.clearfix
// .post-title.entry-title
// #live_data
// .item_main_table()
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




module.exports = {
  scrapeCharacters,
  scrapeCharactersTwo
};