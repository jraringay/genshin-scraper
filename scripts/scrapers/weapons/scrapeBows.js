// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");
const camelCase = require("../../../utilities/camelCase");

let bowList = [];
let $;

const extractBows = selector => {
  const bowUrl = selector
    .attr("href")
    .trim();

  const bowName = selector
    .text()
    .trim();

  bowList.push(bowUrl);

  return { bowUrl, bowName };

}

const scrapeBows = async () => {
  try {
    const url = "https://genshin.honeyhunterworld.com/bow/"
    const html = await fetchHtml(url);
    const selector = $ = cheerio.load(html);
    // const searchResults = selector("body")
    //   .find(".wrappercont > .art_stat_table");
    const searchResults = selector("body")
    .find("a[href^='/db/weapon/']:lt(47):odd");
  
    const bows = searchResults.map((index, element) => {
      const elementSelector = selector(element);
      return extractBows(elementSelector);
    })
    .get();
      
    return bows;
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
  }
}

let extractBowInfo = selector => {
  const bowName = selector
  .find(".post-title.entry-title")
  .text()
  .trim();

  const bowRarity = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(1) td:eq(1) div.sea_char_stars_wrap")
  .length;

  const bowBaseAtk = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(2) td:eq(1)")
  .text()
  .trim();

  const bowSecondaryStat = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(3) td:eq(1)")
  .text()
  .trim();

  const bowSecondaryStatValue = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(4) td:eq(1)")
  .text()
  .trim();

  const bowSpecialPassive = selector
  .find("#live_data > .item_main_table:eq(0) tbody tr:eq(5) td:eq(1)")
  .text()
  .trim();

  const bowSpecialPassiveDescription = selector
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

  return {bowName, bowRarity, bowBaseAtk, bowSecondaryStat, bowSecondaryStatValue, bowSpecialPassive, bowSpecialPassiveDescription, inGameDescription, statProgression};
}

const scrapeBowsTwo = async () => {
  try {
    await scrapeBows();
  
    // const url = "https://genshin.honeyhunterworld.com/db/weapon/the_stringless/"
    // const html = await fetchHtml(url);
    // const selector = cheerio.load(html);
    // const searchResults = selector("body")
    // .find(".entry.clearfix");
  
    // const bowInfo = extractBowInfo(searchResults);
    // console.log(bowInfo);
    // return bowInfo;


    // Using Promise.all()

    let promiseArr = [];
    let resultArr = [];

    for (const element of bowList) {
      const url = "https://genshin.honeyhunterworld.com" + element;
      let html = fetchHtml(url);
      promiseArr.push(html);
    }

    const allBows = await Promise.all(promiseArr);

    for (const bow of allBows) {
      let selector = cheerio.load(bow);
      let searchResults = selector("body")
        .find(".entry.clearfix");
      // console.log(searchResults)
      let bowInfo = extractBowInfo(searchResults);
      console.log(bowInfo);
      resultArr.push(bowInfo);
    }
    
    return resultArr;
    
  } catch (error) {
    console.error(`ERROR: ${error.name} : ${error.message}`);
  }
  
}



module.exports = {
  scrapeBows,
  scrapeBowsTwo
}