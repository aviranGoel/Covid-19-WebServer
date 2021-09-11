# Covid-19-WebServer

## Welcome to daily COVID-19 confirmed cases information!

### The Web-Server built in JavaScript and node.js, and using the external API: "https://covid-api.mmediagroup.fr/v1"
### The Web-Server runs locally and allows the user to view data in one of two options:

1. Daily new confirmed cases in a given country.
   
   By replacing the country and date in the path:
   "http://localhost:3000/cases/country/date"

2. Compare between two countries (source - target), return the daily difference between the percentages of the population confirmed cases.
   
   By replacing the source_country, target_country, from_date and the to_date in the path:
"http://localhost:3000/history/source_country/target_country/from_date/to_date"