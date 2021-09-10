const axios = require("axios");

// The using API
const api_url = "https://covid-api.mmediagroup.fr/v1";

const commonFunctionality = require("./commonFunctionality/commonFunctionality");
const apiFunctionality = require("./apiFunctionality/apiFunctionality");

/**
 * Calculate confirmed history details about given two country in given dates range.
 * @param {*} source_country : Source country to get details about.
 * @param {*} target_country : Target country to get details about.
 * @param {*} from_date : Date to start the details.
 * @param {*} to_date : Date to end the details.
 * @returns 
 */
async function calculateHistory(source_country, target_country, from_date, to_date) 
{
    // Case when country consists of two words, the spacebar represented by '20%',
    // we replace it to real spacebar.
    source_country = source_country.replace('%20', ' ');
    target_country = target_country.replace('%20', ' ');

    // Get confirmed data by dates of each countries (dictionary[date : confirmed]).
    // Get the population of each country.
    details_source_country = await apiFunctionality.getDatesConfirmedCasesOfCountryAndPopulation_usingAPI(source_country);
    details_target_country = await apiFunctionality.getDatesConfirmedCasesOfCountryAndPopulation_usingAPI(target_country);

    let dates_confirmed_dictionary_source_country = details_source_country[0];
    let population_source_country = details_source_country[1];
    let dates_confirmed_dictionary_target_country = details_target_country[0];
    let population_target_country = details_target_country[1];

    if (dates_confirmed_dictionary_source_country === "Error!" || dates_confirmed_dictionary_target_country === "Error!")
    {
        return "Error!";
    }

    // Get array of dates in range [to_date, from_date] in format YYYY-MM-DD (given date, previous date).
    let formatted_range_dates = await getRangeFormattedDates(from_date, to_date);
    
    let confirmed_case_source_country = "confirmed case";
    let confirmed_case_target_country = "confirmed case";
    let current_confirmed_date_yyyymmdd;
    let current_date_ddmmyyyy;

    let result_array = [];
    let probability_confirmed_population_source_country;
    let probability_confirmed_population_target_country;

    // Handle loop to create the answer.
    for (i = 0; i < formatted_range_dates.length; i++)
    {
        current_confirmed_date_yyyymmdd = formatted_range_dates[i];
        current_date_ddmmyyyy = await commonFunctionality.formatDateTo_ddmmyyyy(current_confirmed_date_yyyymmdd);
        
        // Create the confirmed case to the answer.
        confirmed_case_source_country = confirmed_case_source_country + ` ` + current_date_ddmmyyyy + `: ` + dates_confirmed_dictionary_source_country[current_confirmed_date_yyyymmdd];
        confirmed_case_target_country = confirmed_case_target_country + ` ` + current_date_ddmmyyyy + `: ` + dates_confirmed_dictionary_target_country[current_confirmed_date_yyyymmdd];

        // Calculate the Result probability array to the answer.
        probability_confirmed_population_source_country = parseInt(dates_confirmed_dictionary_source_country[current_confirmed_date_yyyymmdd]) / parseInt(population_source_country);
        probability_confirmed_population_target_country = parseInt(dates_confirmed_dictionary_target_country[current_confirmed_date_yyyymmdd]) / parseInt(population_target_country);

        result_array.push(probability_confirmed_population_source_country - probability_confirmed_population_target_country);
    }

    // Create the return answer.
    let answer = `Querying about ` + source_country + `, ` + target_country + ` from ` + from_date + ` to ` + to_date +
    `\nData:` +
    `\n   ` + source_country + ` population: ` + population_source_country + ` confirmed case ` + confirmed_case_source_country +
    `\n   ` + target_country + ` population: ` + population_target_country + ` confirmed case ` + confirmed_case_target_country +
    `\nResult: ` + result_array;

    return(answer);
}

/**
 * Calculate all the dates in the range [from_date, to_date],
 * returs an array of the formatted dates range (format: YYYY-MM-DD),
 * (array: [formatted_from_date, ..., formatted_to_date])
 * @param {*} from_date : String, the from_date to calculate with (the start date).
 * @param {*} to_date : String, the to_date to calculate with (the end date).
 * @returns 
 */
async function getRangeFormattedDates(from_date, to_date) 
{
    let formatted_from_date = await commonFunctionality.formatDateTo_yyyymmdd(from_date);
    let formatted_to_date = await commonFunctionality.formatDateTo_yyyymmdd(to_date);

    let formatted_range_dates = [];
    let temp_date = formatted_to_date;
    let formatted_previous_date;

    formatted_range_dates.push(formatted_to_date);

    // Push al dates in the range.
    while (formatted_previous_date !== formatted_from_date)
    {
        temp_date = new Date(temp_date);
        temp_date.setDate(temp_date.getDate() - 1);

        formatted_previous_date = temp_date.toISOString().split('T')[0];
        formatted_range_dates.push(formatted_previous_date);
    }

    return formatted_range_dates;
}

exports.calculateHistory = calculateHistory;
