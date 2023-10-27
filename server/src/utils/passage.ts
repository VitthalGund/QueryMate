import { QuestionAndAnswer } from "@tensorflow-models/qna";
import { Answer } from "@tensorflow-models/qna/dist/question_and_answer.js";
import { UniversalSentenceEncoder } from "@tensorflow-models/universal-sentence-encoder";
import tfcore from "@tensorflow/tfjs-core";
import tf from "@tensorflow/tfjs-node-gpu";
import * as natural from "natural";

// function splitPassage(passage: string, chunkSize: number): Array<string> {
//   const tokenizer: natural.WordTokenizer = new natural.WordTokenizer();
//   const tokens: Array<string> = tokenizer.tokenize(passage);
//   const chunks: Array<string> = [];
//   let chunk = "";
//   for (const token of tokens) {
//     if (chunk.length + token.length + 1 <= chunkSize) {
//       chunk += token + " ";
//     } else {
//       chunks.push(chunk.trim());
//       chunk = token + " ";
//     }
//   }
//   if (chunk) {
//     chunks.push(chunk.trim());
//   }
//   return chunks;
// }

/**
 * Split a given passage into meaningful chunks based on similarity between sentences.
 * @param {string} passage - The passage to be chunked.
 * @param {number} chunkSize - The maximum length of each chunk.
 * @param {number} threshold - The minimum similarity score between sentences for them to be merged into the same chunk.
 * @param {object} useModel - The pre-trained Universal Sentence Encoder model.
 * @param {object} natural - The natural language processing library for tokenizing the passage into sentences.
 * @returns {Array} - The list of chunks.
 */
export async function chunkPassage(
  passage: string,
  chunkSize: number,
  threshold: number,
  useModel: UniversalSentenceEncoder,
  natural: natural.SentenceTokenizer
): Promise<string[]> {
  // Tokenize the passage into sentences
  const tokenizer: natural.SentenceTokenizer = natural;
  const sentences: string[] = tokenizer.tokenize(passage);

  // Create sentence embeddings using Universal Sentence Encoder
  const sentenceEmbeddings = await useModel.embed(sentences);

  /**
   * Calculate cosine similarity between two sentence embeddings.
   * @param {Array} a - The first sentence embedding.
   * @param {Array} b - The second sentence embedding.
   * @returns {number} - The cosine similarity score.
   */
  function cosineSimilarity(
    a: tfcore.Tensor<tfcore.Rank> | tfcore.TensorLike,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    b: any
  ): number {
    const dotProduct = tf.matMul(a, b.transpose());
    const normA = tf.norm(a);
    const normB = tf.norm(b);
    return dotProduct.div(tf.mul(normA, normB)).dataSync()[0];
  }

  const chunks: Array<string> = [];
  let currentChunk: string = sentences[0];

  for (let i = 1; i < sentences.length; i++) {
    const sentence: string = sentences[i];
    const currentChunkEmbedding: tfcore.Tensor2D = sentenceEmbeddings.slice(
      [i - 1, 0],
      [1, sentenceEmbeddings.shape[1]]
    );
    const nextSentenceEmbedding = sentenceEmbeddings.slice(
      [i, 0],
      [1, sentenceEmbeddings.shape[1]]
    );
    const similarityScore = cosineSimilarity(
      currentChunkEmbedding,
      nextSentenceEmbedding
    );

    if (
      currentChunk.length + sentence.length + 1 <= chunkSize &&
      similarityScore >= threshold
    ) {
      currentChunk += " " + sentence;
    } else {
      chunks.push(currentChunk);
      currentChunk = sentence;
    }
  }

  chunks.push(currentChunk);

  return chunks;
}

/**
 * Processes Q&A on logical chunks
 * @param {string} question - The question to be answered
 * @param {string[]} chunks - The logical chunks of the question
 * @param {QnAModel} qnaModel - The Q&A model used to find answers
 * @returns {Promise<Answer[]>} - A promise that resolves to an array of answers to the given question
 */
export async function processChunks(
  question: string,
  chunks: Array<string>,
  qnaModel: QuestionAndAnswer
): Promise<Answer[]> {
  const answers: Answer[] = [];
  for (const chunk of chunks) {
    const chunkAnswers: Answer[] = await qnaModel.findAnswers(question, chunk);
    answers.push(...chunkAnswers);
  }
  console.log(answers);
  return answers;
}

//To check if an array is contain elements or not
export function arrayIsEmpty<T>(array: Array<T>) {
  console.log("checking response");
  //If it's not an array, return FALSE.
  if (!Array.isArray(array)) {
    return false;
  }
  //If it is an array, check its length property
  if (array.length > 0) {
    //Return TRUE if the array is  (contain elements at least one)
    return true;
  }
  //Otherwise, return FALSE.
  return false;
}

// module.exports = { chunkPassage, arrayIsEmpty, processChunks };
