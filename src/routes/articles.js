const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");

// function to get the data from the API
// returns articles  relevant to psychiatry, therapy, data science or machine learning
let getArticles = async () => {
  let path = "http://export.arxiv.org/api/query?";
  let queries =
    "search_query=all:psychiatry+OR+all:therapy+OR+all:%22data+science%22+OR+all:%22machine+learning%22";
  let sort = "&sortBy=lastUpdatedDate&sortOrder=descending";
  let max = "&max_results=25";
  let response = await axios(path + queries + sort + max);
  return response;
};

//controller function
module.exports = async (req, res) => {
  let response = await getArticles();
  if (response.data) {
    const parser = new XMLParser();
    let jsonObj = parser.parse(response.data);
    if (jsonObj.feed) {
      const articles = jsonObj.feed.entry;
      res.render("articles", {
        title: "New Articles",
        navigation: ["/", "/authors"],
        data: articles,
      });
    }
  }
};
