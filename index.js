const express = require('express')
const app = express()
const port = 3000

// Routes importing
const cases = require("./routes/cases");
const history = require("./routes/history");

// Routing: Depending on the beginning of the path, we will make the routing.
app.use("/cases",cases);
app.use("/history",history);

app.get('/', (req, res) => {
  res.send("<h1>Welcome to daily COVID-19 confirmed cases information!</h1>" + "<br/>" + 
  "<h2>The Web-Server built in JavaScript and node.js, and using the external API: \"https://covid-api.mmediagroup.fr/v1\"" + "<br/>" +
  "The Web-Server runs locally and allows the user to view data in one of two options:</h2>" + "<br/>" + 
  "&emsp;" + "<h3>1. Daily new confirmed cases in a given country." + "<br/>" +
  "&emsp;&emsp;" + "By replacing the country and date in the path:" + "<br/>" +
  "&emsp;&emsp;" + "\"http://localhost:3000/cases/country/date\"</h3>" + "<br/>" +
  "&emsp;" + "<h3>2. Compare between two countries (source - target), return the daily difference between the percentages of the population confirmed cases." + "<br/>" +
  "&emsp;&emsp;" + "By replacing the source_country, target_country, from_date and the to_date in the path:" + "<br/>" +
  "&emsp;&emsp;" + "\"http://localhost:3000/history/source_country/target_country/from_date/to_date\"</h3>" + "<br/>");
})

app.listen(port, () => {
  console.log(`COVID-19 Web-Server app listening at http://localhost:${port}`);
})