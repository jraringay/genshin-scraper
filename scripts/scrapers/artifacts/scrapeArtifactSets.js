// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");

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
  try {
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
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
  }
}

module.exports = scrapeArtifactSets;