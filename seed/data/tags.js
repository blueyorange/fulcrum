import fs from "fs";

// Read the JSON file
fs.readFile("./questions.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data).questions;

    // Extract unique tags
    const uniqueTags = [...new Set(jsonData.map((item) => item.tags).flat())];

    // Print the unique tags
    console.log("Unique tags:");
    uniqueTags.forEach((tag) => {
      console.log(tag);
    });
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
});
