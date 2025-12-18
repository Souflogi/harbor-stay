import { differenceInDays, formatDistance, parseISO } from "date-fns";

/**
 * Calculate the difference in days between two dates
 * Works with both Date objects and ISO string dates from Supabase
 * @param {string|Date} dateStr1 - First date
 * @param {string|Date} dateStr2 - Second date
 * @returns {number} Difference in days
 */
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

/**
 * Format a date as a readable distance from now (e.g., "2 days ago")
 * @param {string} dateStr - ISO date string
 * @returns {string} Formatted distance string
 */
export const formatDistanceFromNow = dateStr =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

/**
 * Get today's date as an ISO string for Supabase queries
 * Prevents cache issues by resetting milliseconds/seconds
 * @param {Object} options - Configuration object
 * @param {boolean} options.end - If true, set to end of day; otherwise start of day
 * @returns {string} ISO formatted date string
 */
export const getToday = function (options = {}) {
  const today = new Date();

  // Set to start or end of day for consistent Supabase date comparisons
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

/**
 * Format a number as USD currency
 * @param {number} value - The value to format
 * @returns {string} Formatted currency string (e.g., "$1,234.56")
 */
export const formatCurrency = value =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );
