import {
  loadModel,
  LLAMA_3_2_1B_INST_Q4_0,
  completion,
  unloadModel
} from "@qvac/sdk";

async function main() {
  console.log("=================================");
  console.log("      LocalAI Chat - QVAC Test");
  console.log("=================================\n");

  console.log("Loading QVAC model...");
  console.log("The model may need to download the first time.\n");

  const modelId = await loadModel({
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,
    onProgress: (p) => {
      console.log(
        `Downloading: ${p.percentage.toFixed(0)}%`
      );
    }
  });

  console.log("\nModel loaded successfully!");
  console.log("Running local AI inference...\n");

  const result = completion({
    modelId,
    history: [
      {
        role: "user",
        content: "Explain artificial intelligence in one simple sentence."
      }
    ],
    stream: true
  });

  for await (const token of result.tokenStream) {
    process.stdout.write(token);
  }

  console.log("\n\nAI response completed.");

  await unloadModel({ modelId });

  console.log("QVAC model unloaded.");
}

main().catch((error) => {
  console.error("\nQVAC Error:");
  console.error(error);
  process.exit(1);
});