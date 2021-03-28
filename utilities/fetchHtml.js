const axios = require("axios").default;

const fetchHtml = async url => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(`ERROR: An error occurred while trying to fetch the URL: ${url}`);
  }
};

module.exports = fetchHtml;