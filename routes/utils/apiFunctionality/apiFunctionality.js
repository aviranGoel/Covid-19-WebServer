const axios = require("axios");

// The using API
const api_url = "https://covid-api.mmediagroup.fr/v1";

/**
 * Get confirmed data by dates of the given country (dictionary[date : confirmed]),
 * using API get request.
 * @param {*} country 
 * @returns 
 */
async function getDatesConfirmedCasesOfCountry_usingAPI(country) 
{
    // country = "Germany";
    let status = "confirmed";

    // Send requst to the API with given country and status of confirmed.
    let response_data = await axios.get(`${api_url}/history?country=${country}&status=${status}`);

    if (response_data.status !== 200)
    {
        return "Error!";
    }

    let dates_confirmed_dictionary = response_data.data.All.dates;

    return dates_confirmed_dictionary;
}

/**
 * Get confirmed data by dates of the given country (dictionary[date : confirmed]),
 * and the population of the given country,
 * using API get request.
 * @param {*} country 
 * @returns 
 */
async function getDatesConfirmedCasesOfCountryAndPopulation_usingAPI(country) 
{
    // country = "Germany";
    let status = "confirmed";

    // Send requst to the API with given country and status of confirmed.
    let response_data = await axios.get(`${api_url}/history?country=${country}&status=${status}`);

    if (response_data.status !== 200)
    {
        return "Error!";
    }

    let dates_confirmed_dictionary = response_data.data.All.dates;
    let population_country = response_data.data.All.population;

    return [dates_confirmed_dictionary, population_country];
}

exports.getDatesConfirmedCasesOfCountry_usingAPI = getDatesConfirmedCasesOfCountry_usingAPI;
exports.getDatesConfirmedCasesOfCountryAndPopulation_usingAPI = getDatesConfirmedCasesOfCountryAndPopulation_usingAPI;
