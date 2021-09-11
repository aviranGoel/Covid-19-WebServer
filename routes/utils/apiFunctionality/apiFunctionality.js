const axios = require("axios");

// The API we are using.
const api_url = "https://covid-api.mmediagroup.fr/v1";

/**
 * Get confirmed data by dates of the given country (dictionary[date : confirmed]),
 * and the population of the given country,
 * using API get request.
 * @param {*} country
 * @returns
 */
async function getDatesConfirmedCasesOfCountryAndPopulation_usingAPI(country) {
  let status = "confirmed";

  // Send requst to the API with given country and status of confirmed.
  let response_data = await axios.get(
    `${api_url}/history?country=${country}&status=${status}`
  );

  if (response_data.data.All === undefined) {
    return "Error!";
  }

  let dates_confirmed_dictionary = response_data.data.All.dates;
  let population_country = response_data.data.All.population;

  return [dates_confirmed_dictionary, population_country];
}

exports.getDatesConfirmedCasesOfCountryAndPopulation_usingAPI = getDatesConfirmedCasesOfCountryAndPopulation_usingAPI;
