const axios = require("axios");

// The using API
const api_url = "https://covid-api.mmediagroup.fr/v1";

/**
 * Calculate confirmed cases details about given country in given date.
 * @param {*} country : Country to get details about.
 * @param {*} given_date : Date to when get details.
 * @returns 
 */
async function calculateCases(country, given_date) {
    let dates_confirmed_array = await getDatesConfirmedCasesOfCountry_usingAPI(country);

    if (dates_confirmed_array === "Error!")
    {
        return "Error!";
    }

    // given_date = "01-09-2021";

    // Get array of two date in format YYYY-MM-DD (given date, previous date).
    let formatted_current_and_previous_dates = await getTwoFormattedDates(given_date)

    // String of previous date in format DD-MM-YYYY.
    let previous_date_ddmmyyyy = await formatDateTo_ddmmyyyy(formatted_current_and_previous_dates[1]) ;

    // Get the confirmed in the two dates.
    let confirmed_current_date = dates_confirmed_array[formatted_current_and_previous_dates[0]];
    let confirmed_previos_date = dates_confirmed_array[formatted_current_and_previous_dates[1]];

    // Calculate the subtraction between the two confirmed.
    let confirmed_subtraction = parseInt(confirmed_current_date) - parseInt(confirmed_previos_date);

    // The confirmed subtraction must be in range [0, infinity].
    if (confirmed_subtraction < 0)
    {
        confirmed_subtraction = "Less then 0";
    }

    // Create the return answer.
    let answer = `Querying about ` + country + `, ` + given_date + 
    `\nData:` +
    `\n   ` + country + ` confirmed case ` + given_date + `: ` + confirmed_current_date + `,` + previous_date_ddmmyyyy + `: ` + confirmed_previos_date +
    `\nResult: ` + confirmed_subtraction;

    return(answer);
}


/**
 * Get confirmed data by dates, of given country,
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

    let dates_confirmed_array = response_data.data.All.dates;

    return dates_confirmed_array;
}

/**
 * Calculate the previous date form the given_date,
 * returs an array of two formatted dates (format: YYYY-MM-DD),
 * (array: [formatted_given_date, formatted_previous_date])
 * @param {*} given_date : String, the given_date to cclaulate with.
 * @returns 
 */
async function getTwoFormattedDates(given_date) 
{
    let formatted_given_date = await formatDateTo_yyyymmdd(given_date);

    let temp_date = new Date(formatted_given_date);
    temp_date.setDate(temp_date.getDate() - 1);

    let formatted_previous_date = temp_date.toISOString().split('T')[0];

    return [formatted_given_date, formatted_previous_date];
}

/**
 * Change date from String format: DD-MM-YYYY,
 * to String format: YYYY-MM-DD.
 * @param {*} date_ddmmyyyy : String, the date to change.
 * @returns 
 */
async function formatDateTo_yyyymmdd(date_ddmmyyyy) 
{
    let date_array = date_ddmmyyyy.split("-");
    let formatted_date_yyyymmdd = date_array[2] + "-" + date_array[1] + "-" + date_array[0];
    return formatted_date_yyyymmdd;
}

/**
 * Change date from String format: YYYY-MM-DD,
 * to String format: DD-MM-YYYY.
 * @param {*} date_yyyymmdd : String, the date to change.
 * @returns 
 */

async function formatDateTo_ddmmyyyy(date_yyyymmdd) 
{
    let date_array = date_yyyymmdd.split("-");
    let formatted_date_ddmmyyyy = date_array[0] + "-" + date_array[1] + "-" + date_array[1];
    return formatted_date_ddmmyyyy;
}

exports.calculateCases = calculateCases;
