import * as tf from "@tensorflow/tfjs";

export interface SimilarityResult {
  productId: string;
  score: number;
}

export function calculateCosineSimilarity(
  vector1: tf.Tensor1D,
  vector2: tf.Tensor1D
): number {
  return tf.tidy(() => {
    const magnitude1 = tf.norm(vector1);
    const magnitude2 = tf.norm(vector2);

    const normalized1 = vector1.div(magnitude1);
    const normalized2 = vector2.div(magnitude2);

    const dotProduct = tf.sum(tf.mul(normalized1, normalized2));
    return dotProduct.dataSync()[0];
  });
}

export function rankSimilarProducts(
  userFeatures: tf.Tensor1D,
  productFeatures: Map<string, tf.Tensor1D>,
  threshold: number = 0
): SimilarityResult[] {
  const results: SimilarityResult[] = [];

  productFeatures.forEach((features, productId) => {
    const similarity = calculateCosineSimilarity(userFeatures, features);

    if (similarity >= threshold) {
      results.push({
        productId,
        score: similarity,
      });
    }
  });

  results.sort((a, b) => b.score - a.score);

  return results;
}

export function normalizeSimilarityScore(score: number): number {
  const normalized = (score + 1) / 2;
  return Math.min(Math.max(normalized, 0), 1);
}
