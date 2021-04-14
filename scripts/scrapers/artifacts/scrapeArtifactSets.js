// Call required packages
const cheerio = require("cheerio");
const fetchHtml = require("../../../utilities/fetchHtml");
const camelCase = require("../../../utilities/camelCase");
const capitalize = require("../../../utilities/capitalize");
const numWords = require("num-words");

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

  const setPiecesChildren = selector
  .find(".wrappercont .add_stat_table:eq(0) tbody")
  .children();

  let setPiecesNode = () => {
    let pieces = [];

    for (const node of setPiecesChildren) {
      // pieces.push($(node).text());
      pieces.push({ 
          url: $(node).find("td a").attr("href"), name: $(node).text()
        })
    }

    return pieces;

  }

  let setPieces = setPiecesNode();

  let dropAreaChildren = selector
  .find(".wrappercont .add_stat_table:eq(1) tbody")
  .children();

  let dropAreaNode = () => {
    let area = [];

    for (const node of dropAreaChildren) {
      area.push({
        url: $(node).find("td a").attr("href"),
        name: $(node).text()
      })
    }

    return area;
  }

  let dropArea = dropAreaNode();

  let getMainStatAvailability = (selector) => {
    let values = [];
    let statHeaders = selector
        .find(`.wrappercont .add_stat_table:eq(2) tr:eq(0) td`)
        .filter((_, node) => $(node).text().trim() !== 'Ascension'); // TODO: Can probably be added back in with special handling
    let props = []
    statHeaders.each((_, node) => {
      const text = $(node).text().trim();
      if (text === "") {
        props.push("setPiece");
      } else {
        props.push(camelCase(text.replace(/[^a-z\s]/i, '')));
      }
    })
    
    const rows = selector
      .find(`.wrappercont .add_stat_table:eq(2) tr`).length;
    
    for (let index = 1; index < rows; index++) {
      const row = {};
      
      // for table headers
      row[props[0]] = selector
      .find(`.wrappercont .add_stat_table:eq(2) tr:eq(${index}) td:eq(0)`)
      .text()
      .trim();
      
      for (let field = 1; field < props.length; field++) {
        
        row[props[field]] = /green/.test(selector
          .find(`.wrappercont .add_stat_table:eq(2) tr:eq(${index}) td:eq(${field})`)
          .attr("style"));
      }
      values.push(row)
    }
       
    return values;
  }

  const mainStatAvailability = getMainStatAvailability(selector);

  // <tr> have blank duplicates for wtf reason why
  let lqMainStat = (selector) => {
    const quality = selector
    .find(".wrappercont .item_secondary_title:eq(3) div")
    .length;

    let getStats = (selector) => {
      let stats = [];
      let headers = selector
          .find(`.wrappercont .add_stat_table:eq(3) tr:eq(0) td`)
          .filter((_, node) => $(node).text().trim() !== 'Ascension'); // TODO: Can probably be added back in with special handling
      let props = []
      headers.each((_, node) => {
        const text = $(node).text().trim();
        if (text === "") {
          props.push("level");
        } else {
          props.push(camelCase(text.replace(/%/, ' Percent')));
        }
      })
      
      const rows = selector
        .find(`.wrappercont .add_stat_table:eq(3) tr`).length;
      
      for (let index = 1; index < rows; index+=2) {
        const row = {};

        // for table headers
        row[props[0]] = selector
        .find(`.wrappercont .add_stat_table:eq(3) tr:eq(${index}) td:eq(0)`)
        .text()
        .trim();

        for (let field = 1; field < props.length; field++) {
          row[props[field]] = selector
            .find(`.wrappercont .add_stat_table:eq(3) tr:eq(${index}) td:eq(${field})`)
            .text()
            .trim();
        }
        stats.push(row)
      }
         
      return stats;
    }
  
    const statProgression = getStats(selector);

    return {quality, statProgression}
  }
   
  const lowQualityMainStatRoll = lqMainStat(selector); 

  // item_secondary_title:eq(3)

  let lqSubStat = (selector) => {
    const quality = selector
    .find(".wrappercont .item_secondary_title:eq(4) div")
    .length;

    const note = selector
    .find(".wrappercont .add_stat_table:eq(4) tbody tr:eq(0)")
    .text()
    .trim();

    let getStats = (selector) => {
      let stats = [];
      let headers = selector
          .find(`.wrappercont .add_stat_table:eq(4) tr:eq(1) td`)
          .filter((_, node) => $(node).text().trim() !== 'Ascension'); // TODO: Can probably be added back in with special handling
      let props = []
      headers.each((_, node) => {
        const text = $(node).text().trim();
        if (text === "") {
          props.push("stat");
        } else {
          let res = text.split(" ");
          res[1] = numWords(res[1])
          let newText = res.join(" ");
          props.push(camelCase(newText.replace(/[^a-z\s]/i, '')));
        }
      })
      
      const rows = selector
        .find(`.wrappercont .add_stat_table:eq(4) tr`).length;
      
      for (let index = 2; index < rows; index++) {
        const row = {};

        for (let field = 0; field < props.length; field++) {
          row[props[field]] = selector
            .find(`.wrappercont .add_stat_table:eq(4) tr:eq(${index}) td:eq(${field})`)
            .text()
            .trim();
        }
        stats.push(row)
      }
         
      return stats;
    }
  
    const statProgression = getStats(selector);

    return {quality, note, statProgression}
  }

  const lowQualitySubStatRoll = lqSubStat(selector);

  // <tr> have blank duplicates for wtf reason why
  let hqMainStat = (selector) => {
    const quality = selector
    .find(".wrappercont .item_secondary_title:eq(5) div")
    .length;

    let getStats = (selector) => {
      let stats = [];
      let headers = selector
          .find(`.wrappercont .add_stat_table:eq(5) tr:eq(0) td`)
          .filter((_, node) => $(node).text().trim() !== 'Ascension'); // TODO: Can probably be added back in with special handling
      let props = []
      headers.each((_, node) => {
        const text = $(node).text().trim();
        if (text === "") {
          props.push("level");
        } else {
          props.push(camelCase(text.replace(/%/, ' Percent')));
        }
      })
      
      const rows = selector
        .find(`.wrappercont .add_stat_table:eq(5) tr`).length;
      
      for (let index = 1; index < rows; index+=2) {
        const row = {};

        // for table headers
        row[props[0]] = selector
        .find(`.wrappercont .add_stat_table:eq(5) tr:eq(${index}) td:eq(0)`)
        .text()
        .trim();

        for (let field = 1; field < props.length; field++) {
          row[props[field]] = selector
            .find(`.wrappercont .add_stat_table:eq(5) tr:eq(${index}) td:eq(${field})`)
            .text()
            .trim();
        }
        stats.push(row)
      }
         
      return stats;
    }
  
    const statProgression = getStats(selector);

    return {quality, statProgression}
  }
   
  const highQualityMainStatRoll = hqMainStat(selector);

  let hqSubStat = (selector) => {
    const quality = selector
    .find(".wrappercont .item_secondary_title:eq(6) div")
    .length;

    const note = selector
    .find(".wrappercont .add_stat_table:eq(6) tbody tr:eq(0)")
    .text()
    .trim();

    let getStats = (selector) => {
      let stats = [];
      let headers = selector
          .find(`.wrappercont .add_stat_table:eq(6) tr:eq(1) td`)
          .filter((_, node) => $(node).text().trim() !== 'Ascension'); // TODO: Can probably be added back in with special handling
      let props = []
      headers.each((_, node) => {
        const text = $(node).text().trim();
        if (text === "") {
          props.push("stat");
        } else {
          let res = text.split(" ");
          res[1] = numWords(res[1])
          let newText = res.join(" ");
          props.push(camelCase(newText.replace(/[^a-z\s]/i, '')));
        }
      })
      
      const rows = selector
        .find(`.wrappercont .add_stat_table:eq(6) tr`).length;
      
      for (let index = 2; index < rows; index++) {
        const row = {};

        for (let field = 0; field < props.length; field++) {
          row[props[field]] = selector
            .find(`.wrappercont .add_stat_table:eq(6) tr:eq(${index}) td:eq(${field})`)
            .text()
            .trim();
        }
        stats.push(row)
      }
         
      return stats;
    }
  
    const statProgression = getStats(selector);

    return {quality, note, statProgression}
  }

  const highQualitySubStatRoll = hqSubStat(selector);

  return {artifactSetName, artifactSetAltName, artifactSetQuality, twoPieceBonus, fourPieceBonus, setPieces, dropArea, mainStatAvailability, lowQualityMainStatRoll, lowQualitySubStatRoll, highQualityMainStatRoll, highQualitySubStatRoll};
}

let scrapeArtifactSetsTwo = async () => {
  try {
    await scrapeArtifactSets();
  
    // const url = "https://genshin.honeyhunterworld.com/db/art/family/bloodstained_chivalry/"
    // const html = await fetchHtml(url);
    // const selector = cheerio.load(html);
    // const searchResults = selector("body")
    // .find(".entry.clearfix");
  
    // const artifactSetInfo = extractArtifactSetInfo(searchResults);
    // console.log(artifactSetInfo);
    // return artifactSetInfo;

    // Using Promise.all()

    let promiseArr = [];
    let resultArr = [];

    for (const element of artifactSetList) {
      const url = "https://genshin.honeyhunterworld.com" + element;
      let html = fetchHtml(url);
      promiseArr.push(html);
    }

    const allArtifactSets = await Promise.all(promiseArr);

    for (const artifactSet of allArtifactSets) {
      let selector = cheerio.load(artifactSet);
      let searchResults = selector("body")
        .find(".entry.clearfix");
      // console.log(searchResults)
      let artifactSetInfo = extractArtifactSetInfo(searchResults);
      console.log(artifactSetInfo);
      resultArr.push(artifactSetInfo);
    }
    
    return resultArr;
    
  } catch (error) {
    console.error(`ERROR: ${error.name} : ${error.message}`);
  }
  
}

module.exports = {
  scrapeArtifactSets,
  scrapeArtifactSetsTwo
};