import tf from "@tensorflow/tfjs-node-gpu";
export type Mate = {
  similarityScore?: tf.Tensor<tf.Rank>;
  text: string;
  startIndex: number;
  endIndex: number;
  score: number;
};
