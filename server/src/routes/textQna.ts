import express, { Request, Response } from "express";
export const router = express.Router();
import qna from "@tensorflow-models/qna";
import tf, { Rank, Tensor } from "@tensorflow/tfjs-node-gpu";
import { arrayIsEmpty, processChunks } from "../utils/passage.js";
import use, {
  UniversalSentenceEncoder,
} from "@tensorflow-models/universal-sentence-encoder";
import { UserChat } from "../models/Chat.js";
import mongoose from "mongoose";
import { ChatMessage } from "../models/message.js";
import { Mate } from "../types/mate.js";
import NodeCache from "node-cache";
const modelsCache = new NodeCache();

// Load the BERT-based question-answering model only once when the server starts
let modelPromise: qna.QuestionAndAnswer;
export let useModel: UniversalSentenceEncoder;

// const userFeedback = new Map();
async function loadQnaModel() {
  if (!modelPromise && !modelsCache.get("qna")) {
    // Explicitly register the backend for TensorFlow.js in Node.js1
    console.log("Loading Model");
    console.time("Qna Load time");
    tf.setBackend("tensorflow");
    // Load the BERT-based question-answering model
    modelPromise = await qna.load();
    console.timeEnd("Qna Load time");
    modelsCache.set("Qna", modelPromise);
  }
  return modelPromise || modelsCache.get("Qna");
}

// Load the Universal Sentence Encoder model during server startup
async function loadUseModel() {
  try {
    if (!useModel && !modelsCache.get("qna")) {
      console.time("USE model load time:");
      useModel = await use.load();
      console.timeEnd("USE model load time:");
      console.log("Universal Sentence Encoder model loaded successfully.");
      modelsCache.set("Use", useModel);
    }
    return useModel || modelsCache.get("Use");
  } catch (error) {
    console.error("Error loading Universal Sentence Encoder model:", error);
    process.exit(1);
  }
}

/**
 * Loads the BERT-based question-answering model and the Universal Sentence Encoder model asynchronously.
 *
 * @returns {Promise<void>} A promise that resolves when both models are loaded.
 */
async function loadModels(): Promise<void> {
  try {
    await Promise.all([loadQnaModel(), loadUseModel()]);
  } catch (error) {
    console.error("Error loading models:", error);
    throw error;
  }
}

loadModels();

// Endpoint to handle the questions: Passage size is around 500 to 1000 which around 5pages
router.post("/qa", async (req: Request, res: Response) => {
  const { chatId, question } = req.body;

  if (!chatId) {
    return res.status(400).json({
      error: "Missing ChatId in the request body.",
    });
  }

  const result = await UserChat.findOne({ chatId });
  const passage: string = result.passage.toString();
  if (!passage || !question) {
    return res.status(400).json({
      error: "Both passage and questions are required in the request body.",
    });
  }

  if (!modelPromise || !useModel) {
    return res
      .status(500)
      .json({ error: "Models are not loaded yet. Please try again later." });
  }
  try {
    // Load the BERT-based question-answering model
    // const model = await qna.load();
    console.log("Models");
    const model = await loadQnaModel();

    // Find answers for each question
    const answers = await model.findAnswers(question, passage);
    if (arrayIsEmpty(answers)) {
      // Send the most accurate 4 to 5 answers in the response
      const topAnswers = answers.slice(0, 5);
      console.log("response sent");
      return res.json({ answers: topAnswers });
    } else {
      return res.json({
        "ambiguous-questions":
          "question is ambiguous or answers doesn't exits in dataset",
        answers,
      });
    }
  } catch (error) {
    console.error("Error during question-answering:", error);
    return res
      .status(500)
      .json({ error: "An error occurred during question-answering." });
  }
});

// Endpoint to handle long passage questions: Passage size is around 4000 to 5000 which around 11 to 20 pages
router.post("/qalong", async (req: Request, res: Response) => {
  const { chatId, question } = req.body;
  if (!chatId) {
    return res.status(400).json({
      error: "Missing ChatId in the request body.",
    });
  }

  const result = await UserChat.find({ chatId });
  const passageChunks: string[] = result.map((data) => data.passage.toString());
  console.log("checking inputs");

  if (!processChunks || !question) {
    return res.status(400).json({
      error: "Both passage and questions are required in the request body.",
    });
  }

  if (!modelPromise || !useModel) {
    return res
      .status(500)
      .json({ error: "Models are not loaded yet. Please try again later." });
  }

  try {
    // Load the BERT-based question-answering model
    // const model = await qna.load();
    const model = await loadQnaModel();
    // const useModel = await loadUseModel();

    // Encode the input question and passage using the Universal Sentence Encoder
    const questionEmbedding: tf.Tensor2D = await useModel.embed(question);
    const passageEmbedding: tf.Tensor2D = await useModel.embed(
      processChunks.toString()
    );

    // Set the chunk size (adjust this based on your model's token limit and memory constraints)
    // const chunkSize = 300; // Example: 300 tokens per chunk
    // console.log("dividing passage");
    // Chunk the passage into smaller segments
    /*
    const passageChunks = await chunkPassage(
      passage,
      chunkSize,
      0.3,
      useModel,
      new natural.SentenceTokenizer()
    );
    */
    console.log(passageChunks);
    console.log("finding Answers");
    // Find answers for each question in each chunk
    // This functionality will be implemented in front end
    // let corrected = reduceAmbiguity(questions);/
    // console.table("correct: " + corrected);
    // Process Q&A on logical chunks using batch processing
    const chunkAnswers = await processChunks(question, passageChunks, model);

    // Re-rank the answers based on semantic similarity
    console.log("Done");

    // Get the top-ranked answer
    console.log("sorting answers");
    if (arrayIsEmpty(chunkAnswers)) {
      const rankedAnswersPromises = chunkAnswers.map(async (answer) => {
        const answerEmbeddingPromise: Promise<tf.Tensor2D> = useModel.embed(
          answer.text
        );
        const answerEmbedding: Tensor<Rank.R2> = await answerEmbeddingPromise;
        const questionSimilarityScore = tf.losses
          .cosineDistance(questionEmbedding, answerEmbedding, 0)
          .toFloat();
        const passageSimilarityScore: tf.Tensor<tf.Rank> = tf.losses
          .cosineDistance(passageEmbedding, answerEmbedding, 0)
          .toFloat();

        const similarityScore: Tensor<Rank> = questionSimilarityScore
          .add(passageSimilarityScore.toFloat())
          .div(2);

        return { ...answer, similarityScore: similarityScore };
      });

      const rankedAnswers = await Promise.all(rankedAnswersPromises);
      // Sort answers by confidence score and send the most accurate 4 to 5 answers in the response
      // const topAnswers = rankedAnswers.sort((a, b) => a.score - b.score).slice(0, 5);
      console.log("response sent");
      await saveToMongoDB(question, rankedAnswers, chatId);
      return res.json({ answers: rankedAnswers });
    } else {
      return res.json({
        "ambiguous-questions":
          "question is ambiguous or answers doesn't exits in dataset",
        answer: chunkAnswers,
      });
    }
  } catch (error) {
    console.error("Error during question-answering:", error);
    return res
      .status(500)
      .json({ error: "An error occurred during question-answering." });
  }
});

async function saveToMongoDB(
  question: string,
  response: Mate | Mate[],
  chatId: mongoose.Types.ObjectId
) {
  const chat = new ChatMessage({
    chatId: chatId,
    question,
    response,
  });
  await chat.save();
}
// Endpoint to handle user feedback {have bugs}
/*
router.post("/feedback", (req, res) => {
  const { answer, upvote, downvote } = req.body;

  if (!answer || (upvote && downvote)) {
    return res.status(400).json({ error: "Invalid feedback data." });
  }

  if (!userFeedback.has(answer)) {
    userFeedback.set(answer, { upvotes: 0, downvotes: 0 });
  }
  const feedback = userFeedback.get(answer);

  if (upvote) {
    feedback.upvotes++;
  } else if (downvote) {
    feedback.downvotes++;
  }

  userFeedback.set(answer, feedback);
  console.log("running python");
  // Execute Python script for fine-tuning based on feedback
  const pythonProcess = new PythonShell("./python/fine_tune_models.py", {
    mode: "json",
  });
  pythonProcess.send({
    answer,
    upvotes: feedback.upvotes,
    downvotes: feedback.downvotes,
  });

  pythonProcess.on("message", (message) => {
    // Update the Q&A model based on the feedback if needed (e.g., fine-tuning)
    console.log(message);
  });

  pythonProcess.end((err) => {
    if (err) {
      console.error("Error during Python script execution:", err);
    }
  });

  return res.json({ message: "Feedback received successfully." });
});
*/
// module.exports = router;
