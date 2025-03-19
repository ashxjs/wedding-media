const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const args = process.argv.slice(2);
const inputFilePath = args[0] || "input.mp4";
const outputFilePath = args[1] || "output_dash";

// Vérifier et créer le dossier de sortie si nécessaire
if (!fs.existsSync(outputFilePath)) {
  fs.mkdirSync(outputFilePath, { recursive: true });
}

const outputMPD = path.join(outputFilePath, "stream.mpd");

const ffmpegCommand = [
  "-i",
  inputFilePath,
  "-map",
  "0",
  "-c:v",
  "libx264", // Use H.264 video codec for compatibility
  "-b:v",
  "3000k", // Video bitrate
  "-maxrate",
  "3000k", // Max bitrate
  "-bufsize",
  "6000k", // Buffer size
  "-s:v:0",
  "1920x1080", // Video resolution (1080p)
  "-preset",
  "fast", // Encoding preset (fast)
  "-crf",
  "23", // Constant rate factor (default value for H.264)
  "-keyint_min",
  "50", // Keyframe interval
  "-g",
  "50", // GOP size
  "-sc_threshold",
  "0", // Scene change threshold
  "-c:a",
  "aac", // Audio codec (AAC)
  "-b:a",
  "128k", // Audio bitrate
  "-f",
  "dash", // Output format (DASH)
  "-seg_duration",
  "10", // Segment duration in seconds
  "-use_timeline",
  "1", // Enable timeline in MPD
  "-use_template",
  "1", // Enable template for segment names
  "-y", // Overwrite output file if it exists
  outputMPD, // Output MPD file
];

const ffmpegProcess = spawn("ffmpeg", ffmpegCommand);

ffmpegProcess.stderr.on("data", (data) => {
  const message = data.toString();
  process.stderr.write(message);

  // Extraire la progression si disponible
  const match = message.match(/frame=\s*(\d+)/);
  if (match) {
    const frame = parseInt(match[1], 10);
    process.stdout.write(`\rProgression: ${frame} frames traités...`);
  }
});

ffmpegProcess.on("close", (code) => {
  if (code === 0) {
    console.log("\nSegmentation terminée, fichier MPD généré !");
  } else {
    console.error("\nErreur lors de l'exécution de FFmpeg.");
  }
});
