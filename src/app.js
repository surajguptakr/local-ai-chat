import express from "express";
import {
  loadModel,
  LLAMA_3_2_1B_INST_Q4_0,
  completion,
  unloadModel
} from "@qvac/sdk";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let modelId = null;

async function initializeModel() {
  console.log("Loading QVAC local AI model...");

  modelId = await loadModel({
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,
    onProgress: (p) => {
      console.log(`Model download: ${p.percentage.toFixed(0)}%`);
    }
  });

  console.log("QVAC model loaded successfully.");
}

app.post("/api/chat", async (req, res) => {
  try {
    const { history } = req.body;

    if (!Array.isArray(history) || history.length === 0) {
      return res.status(400).json({
        error: "Chat history is required."
      });
    }

    if (!modelId) {
      return res.status(503).json({
        error: "AI model is still loading."
      });
    }

    const cleanHistory = history
      .filter(
        (message) =>
          message &&
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string" &&
          message.content.trim()
      )
      .slice(-10);

    const result = completion({
      modelId,
      history: cleanHistory,
      stream: true
    });

    let responseText = "";

    for await (const token of result.tokenStream) {
      responseText += token;
    }

    res.json({
      response: responseText.trim()
    });

  } catch (error) {
    console.error("Inference error:", error);

    res.status(500).json({
      error: error.message || "Local AI inference failed."
    });
  }
});

async function shutdown() {
  if (modelId) {
    console.log("\nUnloading QVAC model...");

    try {
      await unloadModel({ modelId });
    } catch (error) {
      console.error("Error unloading model:", error);
    }
  }

  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

async function startServer() {
  try {
    await initializeModel();

    app.listen(PORT, () => {
      console.log("\n=================================");
      console.log("          LocalAI Chat");
      console.log("=================================");
      console.log(`Server: http://localhost:${PORT}`);
      console.log("AI: Running locally with QVAC");
      console.log("=================================\n");
    });

  } catch (error) {
    console.error("Failed to start LocalAI Chat:");
    console.error(error);
    process.exit(1);
  }
}

startServer();