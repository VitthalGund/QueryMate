import vosk from "vosk";
import Tesseract from "tesseract.js";
import fs from "fs";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import stt from "stt";
import { exec } from "child_process";

export async function extractTextFromAudio(audioBuffer: Buffer) {
  try {
    // Initialize Vosk model
    const model = new vosk.Model("../../MLModels/vosk-model-small-en-in-0.4");

    // Perform speech-to-text using Vosk
    const recognizer = new vosk.Recognizer({ model: model });
    recognizer.acceptWaveform(audioBuffer);

    const text = recognizer.result();
    return { text, success: true };
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return { success: false };
  }
}
// Function to extract audio from a video and return it as a buffer
export async function extractAudioFromVideo(
  videoPath: string
): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const audioData: Uint8Array[] = [];

    // FFmpeg command to extract audio as a raw PCM stream
    const ffmpegCmd = `ffmpeg -i ${videoPath} -f s16le -acodec pcm_s16le -ar 44100 -ac 2 pipe:1`;

    const process = exec(ffmpegCmd);

    process.on("error", (error) => {
      reject(error);
    });

    process.on("exit", (code) => {
      if (code === 0) {
        const audioBuffer = Buffer.concat(audioData);
        resolve(audioBuffer);
      } else {
        reject(new Error("Failed to extract audio from video."));
      }
    });

    process.stdout.on("data", (chunk) => {
      audioData.push(new Uint8Array(chunk));
    });
  });
}

// Function to extract text from a video frame using Tesseract.js
export async function extractTextFromVideoFrame(
  frameImagePath: string
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    Tesseract.recognize(frameImagePath)
      .then(({ data: { text } }) => {
        resolve(text);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Function to extract text from a video using Tesseract.js
export async function extractTextFromVideo(videoPath) {
  return new Promise((resolve, reject) => {
    const framesDirectory = "../../uploads"; // Directory to store extracted frames

    // Extract frames from the video
    const frameCmd = `ffmpeg -i ${videoPath} -vf "fps=1" ${framesDirectory}/frame-%04d.png`;

    exec(frameCmd, (error) => {
      if (error) {
        reject(error);
      } else {
        const uniqueTextSet = new Set(); // Store unique text content

        // Process each frame using Tesseract.js
        fs.readdir(framesDirectory, async (err, files) => {
          if (err) {
            reject(err);
          }

          for (const file of files) {
            const frameImagePath = `${framesDirectory}/${file}`;
            const frameText = await extractTextFromVideoFrame(frameImagePath);
            uniqueTextSet.add(frameText); // Store unique text in the set
          }

          const uniqueTextArray = Array.from(uniqueTextSet); // Convert to an array
          const fullText = uniqueTextArray.join("\n");
          resolve(fullText);
        });
      }
    });
  });
}
