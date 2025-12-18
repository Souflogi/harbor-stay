import supabase from "./supabase";

/**
 * Fetch all cabins from the database
 * @returns {Promise<Array>} Array of cabin objects
 * @throws {Error} If fetch fails
 */
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("We couldn't fetch Cabins");
  }
  return data;
}

/**
 * Create a new cabin in the database
 * @param {Object} cabin - Cabin object with name, capacity, price, etc.
 * @returns {Promise<Array>} Array with the created cabin object
 * @throws {Error} If creation fails
 */
export async function createCabine(cabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabin])
    .select();
  if (error) {
    throw new Error(error.message || "Cannot create cabin ");
  }
  return data;
}

/**
 * Delete a cabin from the database
 * Includes validation for foreign key constraints
 * @param {number} id - Cabin ID to delete
 * @returns {Promise<void>}
 * @throws {Error} With specific message based on error type (foreign key, not found, etc.)
 */
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    // Return specific error messages based on error code
    if (error.code === "23503") {
      throw new Error("Cannot delete cabin - it has active bookings");
    }
    if (error.code === "PGRST116") {
      throw new Error("Cabin not found");
    }
    throw new Error(error.message || "Failed to delete cabin");
  }
}
