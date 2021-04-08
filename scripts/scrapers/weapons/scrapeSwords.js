// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");
const camelCase = require("../../../utilities/camelCase");

let swordList = [];
let $;

const extractSwords = selector => {
  const swordUrl = selector
    .attr("href")
    .trim();

  const swordName = selector
    .text()
    .trim();

  swordList.push(swordUrl);

  return { swordUrl, swordName };

}

const scrapeSwords = async () => {
  try {
    const url = "https://genshin.honeyhunterworld.com/sword/"
    const html = await fetchHtml(url);
    const selector = $ = cheerio.load(html);
    // const searchResults = selector("body")
    //   .find(".wrappercont > .art_stat_table");
    const searchResults = selector("body")
    .find("a[href^='/db/weapon/']:lt(48):odd");
  
    const swords = searchResults.map((index, element) => {
      const elementSelector = selector(element);
      return extractSwords(elementSelector);
    })
    .get();
      
    return swords;
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
  }
  
    
}

let extractSwordInfo = selector => {
  const swordName = selector
  .find(".post-title.entry-title")
  .text()
  .trim();

  const swordRarity = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(1) td:eq(1) div.sea_char_stars_wrap")
  .length;

  const swordBaseAtk = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(2) td:eq(1)")
  .text()
  .trim();

  const swordSecondaryStat = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(3) td:eq(1)")
  .text()
  .trim();

  const swordSecondaryStatValue = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(4) td:eq(1)")
  .text()
  .trim();

  const swordSpecialPassive = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(5) td:eq(1)")
  .text()
  .trim();

  const swordSpecialPassiveDescription = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(6) td:eq(1)")
  .text()
  .trim();

  const inGameDescription = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(7) td:eq(1)")
  .text()
  .trim();

  let getStats = (selector) => {
    let stats = [];
    let headers = selector
        .find(`#live_data .add_stat_table:eq(0) tr:eq(0) td`)
        .filter((_, node) => $(node).text().trim() !== 'Ascension Materials'); // TODO: Can probably be added back in with special handling
    let props = []
    headers.each((_, node) => {
      const text = $(node).text().trim();
      props.push(camelCase(text.replace(/[^[a-z\s]/i, '')));
    })
    
    const rows = selector
      .find(`#live_data .add_stat_table:eq(0) tr`).length;
    
    for (let index = 1; index < rows; index++) {
      const row = {};
      for (let field = 0; field < props.length; field++) {
        row[props[field]] = selector
          .find(`#live_data .add_stat_table:eq(0) tr:eq(${index}) td:eq(${field})`)
          .text()
          .trim();
      }
      stats.push(row)
    }
       
    return stats;
  }

  const statProgression = getStats(selector);

  return {swordName, swordRarity, swordBaseAtk, swordSecondaryStat, swordSecondaryStatValue, swordSpecialPassive, swordSpecialPassiveDescription, inGameDescription, statProgression};
}

const scrapeSwordsTwo = async () => {
  try {
    await scrapeSwords();
  
    // const url = "https://genshin.honeyhunterworld.com/db/weapon/blackcliff_longsword/"
    // const html = await fetchHtml(url);
    // const selector = cheerio.load(html);
    // const searchResults = selector("body")
    // .find(".entry.clearfix");
  
    // const swordInfo = extractSwordInfo(searchResults);
    // console.log(swordInfo);
    // return swordInfo;


    // Using Promise.all()

    let promiseArr = [];
    let resultArr = [];

    for (const element of swordList) {
      const url = "https://genshin.honeyhunterworld.com" + element;
      let html = fetchHtml(url);
      promiseArr.push(html);
    }

    const allSwords = await Promise.all(promiseArr);

    for (const sword of allSwords) {
      let selector = cheerio.load(sword);
      let searchResults = selector("body")
        .find(".entry.clearfix");
      // console.log(searchResults)
      let swordInfo = extractSwordInfo(searchResults);
      console.log(swordInfo);
      resultArr.push(swordInfo);
    }
    
    return resultArr;
    
  } catch (error) {
    console.error(`ERROR: ${error.name} : ${error.message}`);
  }
  
}

module.exports = {
  scrapeSwords,
  scrapeSwordsTwo
};