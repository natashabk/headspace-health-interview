  # Hello! This is Natasha Kaczmarczyk\'s take-home assignment for Ginger/Headspace Health. 
  
  First off, to run this app, navigate to the main directory and run `npm i` and then `npm run start:development`. The server should start running at http://localhost:3000. You can use the navigation at the top of each page to click around or just enter the page URLs into the browser directly. 
  
  I chose to write this using the Node framework [ExpressJs](https://expressjs.com/), because I\'ve used it in the past when I\'ve needed a really quick, simple server to support a more complex frontend. I chose not to use Django/Python because I have very little experience with it and I thought it would take too much time to figure it out along the way. This is also my first time using the [Pug](https://pugjs.org/) template engine, which I chose simply because it was suggested in the ExpressJs docs. I added basically no styling to this app as I didn\'t have time, but I am confident that my css and design skills are well-represented in my [portfolio](https://www.nkacz.com).

  As you know, the arXiv API is not the most user-friendly, and can also be extremely slow when you start getting into the older data. For ease of demo, the API call for 'authors' is currently only requesting a week's worth of articles, but the note in the file will demonstrate how to change that to get 6 months of data as outlined on the assignment. I tested out the speed and reliability of different "batch" sizes of articles to request, and I arrived at 500 as a good size that's large enough to not have to ping too many times, but small enough so as to not overwhelm the arXiv server. 

  Since I've never built a full app like quite this in Express, I did my best to separate the concerns - the config, routes (which kind of include the controllers), and the views are separated clearly from each other. With more time I would move the 'controller' functions out of the route files and into the src/ directory. There are a couple of npm packages I added to simplify the processes that the assignment called for - axios, moment, and fast-xml-parser are all tried-and-true libraries with good documentation. In a production situation I would not be so quick to add external libraries, but in this situation it seemed fine.
  
  With the time limit, I also didn't have a chance to implement any testing. If I had, I would probably have chosen to implement the Jest unit testing framework as I've had the most experience with that. With Jest, I would want to create the following tests: 
  - Server: can run on given port
  - Index: renders home page content
  - Articles: arXiv API call returns response, response XML is parsed successfully into json
  - Authors: same tests as Articles but for relevant API call, + use mock data to test buildAuthorsObj(), sortAuthors() functions

  Thanks for taking the time to review my project, and I would love to discuss it further when you have a chance! 

  