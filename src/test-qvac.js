import {
  loadModel,
  LLAMA_3_2_1B_INST_Q4_0,
  completion,
  unloadModel
} from "@qvac/sdk";

async function runLocalDemo() {
  let localModelId = null;

  console.log("=================================");
  console.log("        LocalAI Chat Demo");
  console.log("=================================\n");

  try {
    console.log("Starting local QVAC model...\n");

    localModelId = await loadModel({
      modelSrc: LLAMA_3_2_1B_INST_Q4_0,
      onProgress: ({ percentage }) => {
        console.log(`Model preparation: ${percentage.toFixed(0)}%`);
      }
    });

    const conversation = [
      {
        role: "user",
        content:
          "Give me three practical examples of how on-device AI can protect user privacy."
      }
    ];

    console.log("\nQVAC model is ready.");
    console.log("Generating response locally:\n");

    const generation = completion({
      modelId: localModelId,
      history: conversation,
      stream: true
    });

    let completeAnswer = "";

    for await (const piece of generation.tokenStream) {
      completeAnswer += piece;
      process.stdout.write(piece);
    }

    console.log("\n\n---------------------------------");
    console.log("Local inference completed.");
    console.log(`Response length: ${completeAnswer.length} characters`);
    console.log("---------------------------------");

  } catch (error) {
    console.error("\nLocalAI demo failed:");
    console.error(error);
    process.exitCode = 1;
  } finally {
    if (localModelId) {
      console.log("\nReleasing local QVAC model...");

      try {
        await unloadModel({ modelId: localModelId });
        console.log("QVAC model released successfully.");
      } catch (cleanupError) {
        console.error("Model cleanup failed:", cleanupError);
      }
    }
  }
}

runLocalDemo();
