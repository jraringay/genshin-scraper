// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

let artifactSetList = []
let $;

const extractArtifactSets = selector => {
  const artifactSetUrl = selector
    .attr("href")
    .trim();

  const artifactSetName = selector
    .text()
    .trim();

  artifactSetList.push(artifactSetUrl);

  return { artifactSetUrl, artifactSetName };

}

const scrapeArtifactSets = async () => {
  try {
    const url = "https://genshin.honeyhunterworld.com/db/artifact/"
    const html = await fetchHtml(url);
    const selector = $ = cheerio.load(html);
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
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
  }
}

let extractArtifactSetInfo = selector => {
  const artifactSetName = selector
  .find(".post-title.entry-title")
  .text()
  .trim();

  const artifactSetAltName = selector
  .find(".wrappercont .item_main_table tr:eq(1) td:eq(1)")
  .text()
  .trim();

  const artifactSetQualityCount = selector
  .find(".wrappercont .item_main_table tr:eq(2) td:eq(1)")
  .children();

  let artifactQualityLevels = () => {
    let count = 0, stars = [];

    for (const node of artifactSetQualityCount) {
      if(node.name == "div") {
        count++;
      } else {
        stars.push(count);
        count = 0;
      }
    }
    stars.push(count);
    return stars;
  }

  let artifactSetQuality = artifactQualityLevels();

  const twoPieceBonus = selector
  .find(".wrappercont .item_main_table tr:eq(3) td:eq(1)")
  .text()
  .trim();

  const fourPieceBonus = selector
  .find(".wrappercont .item_main_table tr:eq(4) td:eq(1)")
  .text()
  .trim();

  return {artifactSetName, artifactSetAltName, artifactSetQuality, twoPieceBonus, fourPieceBonus};
}

let scrapeArtifactSetsTwo = async () => {
  try {
    await scrapeArtifactSets();
  
    const url = "https://genshin.honeyhunterworld.com/db/art/family/adventurer/"
    const html = await fetchHtml(url);
    const selector = cheerio.load(html);
    const searchResults = selector("body")
    .find(".entry.clearfix");
  
    const artifactSetInfo = extractArtifactSetInfo(searchResults);
    console.log(artifactSetInfo);
    return artifactSetInfo;

    // Using Promise.all()

    // let promiseArr = [];
    // let resultArr = [];

    // for (const element of artifactSetList) {
    //   const url = "https://genshin.honeyhunterworld.com" + element;
    //   let html = fetchHtml(url);
    //   promiseArr.push(html);
    // }

    // const allArtifactSets = await Promise.all(promiseArr);

    // for (const artifactSet of allArtifactSets) {
    //   let selector = cheerio.load(artifactSet);
    //   let searchResults = selector("body")
    //     .find(".entry.clearfix");
    //   // console.log(searchResults)
    //   let artifactSetInfo = extractArtifactSetInfo(searchResults);
    //   console.log(artifactSetInfo);
    //   resultArr.push(artifactSetInfo);
    // }
    
    // return resultArr;
    
  } catch (error) {
    console.error(`ERROR: ${error.name} : ${error.message}`);
  }
  
}

module.exports = {
  scrapeArtifactSets,
  scrapeArtifactSetsTwo
};