import fs from "fs";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

// Init clients
const textToSpeechClient = new TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY, // ⚠️ Google API không dùng apiKey trực tiếp như thế này với client
});
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

export async function generateAudio(
  fileName: string,
  text: string,
  voiceGender?: "MALE" | "FEMALE"
) {
  
  const dir = path.join(process.cwd(), "audio");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const finalGender =
    voiceGender ??
    (Math.random() > 0.5 ? "MALE" : "FEMALE");
  const filePath = path.join(dir, fileName);
  console.log(`Starting TTS generation for:"${finalGender}": "${text}"`);
  // 1. Generate audio with Google TTS
  const request = {
    input: { text },
    voice: { languageCode: "en-US", ssmlGender: finalGender },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await textToSpeechClient.synthesizeSpeech(request);
  console.log("✅ Audio content generated");
  if (!response.audioContent) throw new Error("No audio content received");

  fs.writeFileSync(filePath, response.audioContent as Buffer, "binary");
  console.log(`✅ Audio saved at: ${filePath}`);

  // 2. Upload to Cloudinary
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "video",
    folder: "tts_audio", // optional
  });

  console.log(`✅ Uploaded to Cloudinary: ${result.secure_url}`);
  return result.secure_url;
}

// --- Example usage ---
// const mySentence = "Hello, world! This is a test of Google's Text-to-Speech API.";
// generateAudio("hello_world_tts.mp3", mySentence)
//   .then((url) => console.log(`Function finished. File URL: ${url}`))
//   .catch((err) => console.error("Function failed:", err));
