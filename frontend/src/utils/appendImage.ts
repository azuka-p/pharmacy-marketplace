export async function appendImageFromURL(imageUrl: string, formData: FormData) {
  try {
    // Fetch the image from the URL
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch the image");
    }

    // Convert the response into a Blob
    const imageBlob = await response.blob();

    // Append the Blob to FormData
    formData.append("logo", imageBlob);
  } catch (error) {
    console.error("Error appending the image:", error);
  }
}
