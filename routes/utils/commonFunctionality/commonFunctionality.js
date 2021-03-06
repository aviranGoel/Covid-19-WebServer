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
    let formatted_date_ddmmyyyy = date_array[2] + "-" + date_array[1] + "-" + date_array[0];
    return formatted_date_ddmmyyyy;
}

/**
 * Check all dates in the dates_array, are appears in the dates_dictionary.
 * Return False if at least one of them didn't apperas.
 * Otherwisae Return True.
 * @param {*} dates_dictionary : Dictionary[date : confirmed].
 * @param {*} dates_array : Array of dates.
 * @returns 
 */
async function checkDatesAppearanceInData(dates_dictionary, dates_array) {
  for (i = 0; i < dates_array.length; i++) {
    if (!(dates_array[i] in dates_dictionary)) {
      return false;
    }
  }

  return true;
}

exports.formatDateTo_yyyymmdd = formatDateTo_yyyymmdd;
exports.formatDateTo_ddmmyyyy = formatDateTo_ddmmyyyy;
exports.checkDatesAppearanceInData = checkDatesAppearanceInData;
