// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");
const camelCase = require("../../../utilities/camelCase");

let polearmList = [];
let $;

const extractPolearms = selector => {
  const polearmUrl = selector
    .attr("href")
    .trim();

  const polearmName = selector
    .text()
    .trim();

  polearmList.push(polearmUrl);

  return { polearmUrl, polearmName };

}

const scrapePolearms = async () => {
  try {
    const url = "https://genshin.honeyhunterworld.com/polearm/"
    const html = await fetchHtml(url);
    const selector = $ = cheerio.load(html);
    // const searchResults = selector("body")
    //   .find(".wrappercont > .art_stat_table");
    const searchResults = selector("body")
    .find("a[href^='/db/weapon/']:lt(36):odd");
  
    const polearms = searchResults.map((index, element) => {
      const elementSelector = selector(element);
      return extractPolearms(elementSelector);
    })
    .get();
      
    return polearms; 
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
  }
  
   
}

let extractPolearmInfo = selector => {
  const polearmName = selector
  .find(".post-title.entry-title")
  .text()
  .trim();

  const polearmRarity = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(1) td:eq(1) div.sea_char_stars_wrap")
  .length;

  const polearmBaseAtk = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(2) td:eq(1)")
  .text()
  .trim();

  const polearmSecondaryStat = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(3) td:eq(1)")
  .text()
  .trim();

  const polearmSecondaryStatValue = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(4) td:eq(1)")
  .text()
  .trim();

  const polearmSpecialPassive = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(5) td:eq(1)")
  .text()
  .trim();

  const polearmSpecialPassiveDescription = selector
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

  return {polearmName, polearmRarity, polearmBaseAtk, polearmSecondaryStat, polearmSecondaryStatValue, polearmSpecialPassive, polearmSpecialPassiveDescription, inGameDescription, statProgression};
}

const scrapePolearmsTwo = async () => {
  try {
    await scrapePolearms();
  
    const url = "https://genshin.honeyhunterworld.com/db/weapon/blackcliff_pole/"
    const html = await fetchHtml(url);
    const selector = cheerio.load(html);
    const searchResults = selector("body")
    .find(".entry.clearfix");
  
    const polearmInfo = searchResults.map((index, element) => {
      const elementSelector = selector(element);
      return extractPolearmInfo(elementSelector);
    })
    .get();
    console.log(polearmInfo);
    return polearmInfo;


    // Using Promise.all()

    // let promiseArr = [];
    // let resultArr = [];

    // for (const element of polearmList) {
    //   const url = "https://genshin.honeyhunterworld.com" + element;
    //   let html = fetchHtml(url);
    //   promiseArr.push(html);
    // }

    // const allPolearms = await Promise.all(promiseArr);

    // for (const polearm of allPolearms) {
    //   let selector = cheerio.load(polearm);
    //   let searchResults = selector("body")
    //     .find(".entry.clearfix");
    //   // console.log(searchResults)
    //   let polearmInfo = searchResults.map((index, element) => {
    //     let elementSelector = selector(element);
    //     return extractPolearmInfo(elementSelector);
    //   })
    //   .get();
    //   console.log(polearmInfo)
    //   resultArr.push(polearmInfo)
    // }
    
    // return resultArr;
    
  } catch (error) {
    console.error(`ERROR: ${error.name} : ${error.message}`);
  }
  
}

module.exports = {
  scrapePolearms,
  scrapePolearmsTwo
};