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
 * Upload a cabin image and return its public URL.
 * @param {File|null|undefined} file - Image file to upload.
 * @returns {Promise<string|null>} Public URL or null when no file is provided.
 */
async function uploadCabinImage(file) {
  if (!file) return null;

  const fileName = `cabin-${Date.now()}-${file.name}`.replace(/[ /]/g, "-");
  const { error: uploadError } = await supabase.storage
    .from("cabin-images")
    .upload(fileName, file);

  if (uploadError)
    throw new Error(uploadError.message || "Image upload failed");

  // getPublicUrl is synchronous; it just builds the URL string client-side.
  const { data } = supabase.storage.from("cabin-images").getPublicUrl(fileName);

  return data.publicUrl;
}

/**
 * Create a new cabin in the database
 * @param {Object} cabin - Cabin object with name, capacity, price, etc.
 * @returns {Promise<Array>} Array with the created cabin object
 * @throws {Error} If creation fails
 */
export async function createCabin(cabin) {
  const { image, ...cabinData } = cabin;
  const file = image?.[0];

  const imageUrl = await uploadCabinImage(file);

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabinData, image: imageUrl }])
    .select()
    .single();

  if (error) throw new Error(error.message || "Cannot create cabin");
  return data;
}

/**
 * Update a cabin in the database.
 * If a new image is provided, upload it and replace the URL.
 * @param {Object} updatedCabin - Cabin object with an id and updated fields.
 * @returns {Promise<Array>} Array with the updated cabin object.
 * @throws {Error} If update fails.
 */
export async function updateCabin(updatedCabin) {
  const { id, image, ...cabinData } = updatedCabin;
  const updateData = { ...cabinData };

  if (image instanceof FileList && image.length) {
    updateData.image = await uploadCabinImage(image[0]);
  } else if (typeof image === "string" && image.length) {
    updateData.image = image;
  }
  // If no valid image is provided, omit it (exclude it) so the existing DB value is preserved.

  const { data, error } = await supabase
    .from("cabins")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message || "Cannot update cabin");
  return data;
}

/*
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
