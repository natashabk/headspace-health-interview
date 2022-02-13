const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");
const moment = require("moment");

let authors = {}; // all authors returned from API, indexed by author name
let start = 0; // used for keeping track of pagination in API calls

// function to get the data from the API
// returns authors who have written articles related to psychiatry, therapy, data science or machine learning in the last 6 months, sorted by newest
const getAuthors = async () => {
  const path = "http://export.arxiv.org/api/query?";
  const queries =
    "search_query=all:psychiatry+OR+all:therapy+OR+all:%22data+science%22+OR+all:%22machine+learning%22";
  const sort = "&sortBy=submittedDate&sortOrder=descending";
  const max = `&start=${start}&max_results=${start + 500}`;
  const response = await axios(path + queries + sort + max);
  return response;
};

// sort authors object ready to display in '/authors' view
// this is currently sorting just by number of articles
const sortAuthors = async () => {
  let orderedAuthorsList = [];
  let sortedKeys = Object.keys(authors).sort(
    (a, b) => authors[b].articles.length - authors[a].articles.length
  );
  sortedKeys.forEach((author) => {
    orderedAuthorsList.push({
      name: author,
      numberOfArticles: authors[author].articles.length,
      mostRecent: authors[author].articles[0].published,
    });
  });
  return orderedAuthorsList;
};

// with each new batch of articles, sort them by author name in the authors obj above
const buildAuthorsObj = (articles) => {
  articles.forEach((article) => {
    if (article.author.length) {
      article.author.forEach((author) => {
        if (!authors[author.name]) authors[author.name] = { articles: [] };
        authors[author.name].articles.push(article);
      });
    }
  });
};

const pingAuthors = async () => {
  // NOTE: Change line below to request data from (6, 'months') rather than (1, 'weeks')
  // 1 week of articles will load much faster for demo purposes
  let sixMonthsAgo = moment().subtract(1, "weeks");
  let dateOfEarliestArticleInBatch = moment();

  while (moment(dateOfEarliestArticleInBatch).isAfter(sixMonthsAgo)) {
    let newBatch = await getAuthors();
    start += 500;
    const parser = new XMLParser();
    let jsonObj = parser.parse(newBatch.data);
    if (jsonObj.feed) {
      const articles = jsonObj.feed.entry;
      if (articles && articles.length) {
        dateOfEarliestArticleInBatch = articles[articles.length - 1].published;
        buildAuthorsObj(articles);
      }
    }
  }
};

//controller function
module.exports = async (req, res) => {
  await pingAuthors();
  const data = await sortAuthors();
  res.render("authors", {
    title: "Authors",
    navigation: ["/", "/articles"],
    data: data,
  });
};
