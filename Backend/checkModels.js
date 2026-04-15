import dotenv from "dotenv";
dotenv.config();

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("Missing GEMINI_API_KEY in environment.");
    process.exit(1);
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} while listing models`);
    }

    const payload = await response.json();
    const models = Array.isArray(payload?.models) ? payload.models : [];

    console.log("Raw response:");
    console.dir(payload, { depth: null }); // show everything

    // Try to access the model list safely
    if (models.length > 0) {
      console.log("\nAvailable models:");
      models.forEach((model) => {
        console.log("–", model.name);
      });
    } else {
      console.log("\nNo models found or unexpected structure.");
    }

  } catch (err) {
    console.error("Error listing models:", err);
  }
}

main();
