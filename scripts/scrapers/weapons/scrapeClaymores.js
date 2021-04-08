// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");
const camelCase = require("../../../utilities/camelCase");

let claymoreList = [];
let $;

const extractClaymores = selector => {
  const claymoreUrl = selector
    .attr("href")
    .trim();

  const claymoreName = selector
    .text()
    .trim();

  claymoreList.push(claymoreUrl);

  return { claymoreUrl, claymoreName };

}

const scrapeClaymores = async () => {
  try {
    const url = "https://genshin.honeyhunterworld.com/claymore/"
    const html = await fetchHtml(url);
    const selector = $ = cheerio.load(html);
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
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
  }
  
    
}

let extractClaymoreInfo = selector => {
  const claymoreName = selector
  .find(".post-title.entry-title")
  .text()
  .trim();

  const claymoreRarity = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(1) td:eq(1) div.sea_char_stars_wrap")
  .length;

  const claymoreBaseAtk = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(2) td:eq(1)")
  .text()
  .trim();

  const claymoreSecondaryStat = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(3) td:eq(1)")
  .text()
  .trim();

  const claymoreSecondaryStatValue = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(4) td:eq(1)")
  .text()
  .trim();

  const claymoreSpecialPassive = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(5) td:eq(1)")
  .text()
  .trim();

  const claymoreSpecialPassiveDescription = selector
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

  return {claymoreName, claymoreRarity, claymoreBaseAtk, claymoreSecondaryStat, claymoreSecondaryStatValue, claymoreSpecialPassive, claymoreSpecialPassiveDescription, inGameDescription, statProgression};
}

const scrapeClaymoresTwo = async () => {
  try {
    await scrapeClaymores();
  
    // const url = "https://genshin.honeyhunterworld.com/db/weapon/blackcliff_slasher/"
    // const html = await fetchHtml(url);
    // const selector = cheerio.load(html);
    // const searchResults = selector("body")
    // .find(".entry.clearfix");
  
    // const claymoreInfo = extractClaymoreInfo(searchResults);
    // console.log(claymoreInfo);
    // return claymoreInfo;


    // Using Promise.all()

    let promiseArr = [];
    let resultArr = [];

    for (const element of claymoreList) {
      const url = "https://genshin.honeyhunterworld.com" + element;
      let html = fetchHtml(url);
      promiseArr.push(html);
    }

    const allClaymores = await Promise.all(promiseArr);

    for (const claymore of allClaymores) {
      let selector = cheerio.load(claymore);
      let searchResults = selector("body")
        .find(".entry.clearfix");
      // console.log(searchResults)
      let claymoreInfo = extractClaymoreInfo(searchResults);
      console.log(claymoreInfo);
      resultArr.push(claymoreInfo);
    }
    
    return resultArr;
    
  } catch (error) {
    console.error(`ERROR: ${error.name} : ${error.message}`);
  }
  
}

module.exports = {
  scrapeClaymores,
  scrapeClaymoresTwo
};