/**
 * Formats a number representing an amount of currency, using the user's locale.
 *
 * @param amount - The number to format.
 * @returns A formatted string representing the amount of currency.
 */
export const formatAmount = (amount)  => {
  return new Intl.NumberFormat().format(amount);
}

/**
 * Formats a date string using the specified options and the user's locale.
 *
 * @param date - The date string to format.
 * @param options - An object containing formatting options. Defaults to a configuration that includes the year, month, day,
 * hour, minute, second, and 24-hour time.
 * @returns A formatted string representing the date.
 */
export const formatDate = (date, options = {
  year: "numeric" ,
  month: "long" ,
  day: "numeric" ,
  hour: "numeric" ,
  minute: "numeric" ,
  second: "numeric" ,
  hour12: false ,
}) => {
  if (date) {
    const dateObj = new Date(date);
    const formatter = new Intl.DateTimeFormat(undefined, options);
    const formattedDate = formatter.format(dateObj);
    return formattedDate;
  }
  return "";
};


