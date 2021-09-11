const commonFunctionality = require("./commonFunctionality/commonFunctionality");
const apiFunctionality = require("./apiFunctionality/apiFunctionality");

/**
 * Calculate confirmed cases details about given country in given date.
 * @param {*} country : Country to get details about.
 * @param {*} given_date : Date to when get details.
 * @returns 
 */
async function calculateCases(country, given_date) 
{
    // Case when country consists of two words, the spacebar represented by '20%',
    // we replace it to real spacebar.
    country = country.replace('%20', ' ');

    // Get details of the given country.
    let details_country = await apiFunctionality.getDatesConfirmedCasesOfCountryAndPopulation_usingAPI(country);

    // Check if the given country exists.
    if (details_country === "Error!") 
    {
      throw "Sorry we didn't find this country";
    }

    // Get confirmed data by dates of the given country (dictionary[date : confirmed]).
    let dates_confirmed_dictionary = details_country[0];

    // Get array of two date in format YYYY-MM-DD (given date, previous date).
    let formatted_current_and_previous_dates = await getTwoFormattedDates(given_date);

    // Check if all dates appears in the confirmed data.
    if ( ! (await commonFunctionality.checkDatesAppearanceInData(dates_confirmed_dictionary, formatted_current_and_previous_dates)))
    {
        throw "Sorry we didn't find one of the dates";
    }

    // String of previous date in format DD-MM-YYYY.
    let previous_date_ddmmyyyy = await commonFunctionality.formatDateTo_ddmmyyyy(formatted_current_and_previous_dates[1]);

    // Get the confirmed in the two dates.
    let confirmed_current_date = dates_confirmed_dictionary[formatted_current_and_previous_dates[0]];
    let confirmed_previos_date = dates_confirmed_dictionary[formatted_current_and_previous_dates[1]];

    // Calculate the subtraction between the two confirmed.
    let confirmed_subtraction = parseInt(confirmed_current_date) - parseInt(confirmed_previos_date);

    // The confirmed subtraction must be in range [0, infinity].
    if (confirmed_subtraction < 0)
    {
        confirmed_subtraction = "Less then 0";
    }

    // Create the return answer.
    let answer = `Querying about ` + country + `, ` + given_date + 
    `<br/>Data:` +
    `<br/>&emsp;` + country + ` confirmed case ` + given_date + `: ` + confirmed_current_date + `,` + previous_date_ddmmyyyy + `: ` + confirmed_previos_date +
    `<br/>Result: ` + confirmed_subtraction;

    return(answer);
}

/**
 * Calculate the previous date form the given_date,
 * returs an array of two formatted dates (format: YYYY-MM-DD),
 * (array: [formatted_given_date, formatted_previous_date])
 * @param {*} given_date : String, the given_date to calculate with.
 * @returns 
 */
async function getTwoFormattedDates(given_date) 
{
    let formatted_given_date = await commonFunctionality.formatDateTo_yyyymmdd(given_date);

    let temp_date = new Date(formatted_given_date);
    temp_date.setDate(temp_date.getDate() - 1);

    let formatted_previous_date = temp_date.toISOString().split('T')[0];

    return [formatted_given_date, formatted_previous_date];
}

exports.calculateCases = calculateCases;
