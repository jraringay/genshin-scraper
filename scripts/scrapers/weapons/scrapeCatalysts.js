// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");
const camelCase = require("../../../utilities/camelCase");

let catalystList = [];
let $;

const extractCatalysts = selector => {
  const catalystUrl = selector
    .attr("href")
    .trim();

  const catalystName = selector
    .text()
    .trim();

  catalystList.push(catalystUrl);

  return { catalystUrl, catalystName };

}

const scrapeCatalysts = async () => {
  try {
    const url = "https://genshin.honeyhunterworld.com/catalyst/"
    const html = await fetchHtml(url);
    const selector = $ = cheerio.load(html);
    // const searchResults = selector("body")
    //   .find(".wrappercont > .art_stat_table");
    const searchResults = selector("body")
    .find("a[href^='/db/weapon/']:lt(42):odd");
  
    const catalysts = searchResults.map((index, element) => {
      const elementSelector = selector(element);
      return extractCatalysts(elementSelector);
    })
    .get();
      
    return catalysts;
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
  }
  
    
}

let extractCatalystInfo = selector => {
  const catalystName = selector
  .find(".post-title.entry-title")
  .text()
  .trim();

  const catalystRarity = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(1) td:eq(1) div.sea_char_stars_wrap")
  .length;

  const catalystBaseAtk = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(2) td:eq(1)")
  .text()
  .trim();

  const catalystSecondaryStat = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(3) td:eq(1)")
  .text()
  .trim();

  const catalystSecondaryStatValue = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(4) td:eq(1)")
  .text()
  .trim();

  const catalystSpecialPassive = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(5) td:eq(1)")
  .text()
  .trim();

  const catalystSpecialPassiveDescription = selector
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

  return {catalystName, catalystRarity, catalystBaseAtk, catalystSecondaryStat, catalystSecondaryStatValue, catalystSpecialPassive, catalystSpecialPassiveDescription, inGameDescription, statProgression};
}

const scrapeCatalystsTwo = async () => {
  try {
    await scrapeCatalysts();
  
    // const url = "https://genshin.honeyhunterworld.com/db/weapon/blackcliff_agate/"
    // const html = await fetchHtml(url);
    // const selector = cheerio.load(html);
    // const searchResults = selector("body")
    // .find(".entry.clearfix");
  
    // const catalystInfo = extractCatalystInfo(searchResults);
    // console.log(catalystInfo);
    // return catalystInfo;


    // Using Promise.all()

    let promiseArr = [];
    let resultArr = [];

    for (const element of catalystList) {
      const url = "https://genshin.honeyhunterworld.com" + element;
      let html = fetchHtml(url);
      promiseArr.push(html);
    }

    const allCatalysts = await Promise.all(promiseArr);

    for (const catalyst of allCatalysts) {
      let selector = cheerio.load(catalyst);
      let searchResults = selector("body")
        .find(".entry.clearfix");
      // console.log(searchResults)
      let catalystInfo = extractCatalystInfo(searchResults)
      console.log(catalystInfo)
      resultArr.push(catalystInfo)
    }
    
    return resultArr;
    
  } catch (error) {
    console.error(`ERROR: ${error.name} : ${error.message}`);
  }
  
}


module.exports = {
  scrapeCatalysts,
  scrapeCatalystsTwo
};