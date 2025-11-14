import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

let model: mobilenet.MobileNet | null = null;

export async function loadModel(): Promise<mobilenet.MobileNet> {
  if (model) {
    return model;
  }

  model = await mobilenet.load({
    version: 2,
    alpha: 1.0,
  });

  return model;
}

export async function extractImageFeatures(
  imageElement: HTMLImageElement
): Promise<tf.Tensor1D> {
  const model = await loadModel();
  const logits = tf.tidy(() => {
    return model.infer(imageElement, true) as tf.Tensor1D;
  });

  return logits;
}

export async function extractFeaturesFromUrl(
  imageUrl: string
): Promise<tf.Tensor1D> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = async () => {
      try {
        const features = await extractImageFeatures(img);
        resolve(features);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image from ${imageUrl}`));
    };

    img.src = imageUrl;
  });
}

export async function extractFeaturesFromFile(
  file: File
): Promise<tf.Tensor1D> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const img = new Image();
        img.onload = async () => {
          try {
            const features = await extractImageFeatures(img);
            resolve(features);
          } catch (error) {
            reject(error);
          }
        };
        img.onerror = () => {
          reject(new Error("Failed to load image from file"));
        };
        img.src = event.target?.result as string;
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
}
