import { CogIcon, ShuffleIcon, CloudIcon } from "lucide-react";

export const aboutModel = [
  {
    icon: <CogIcon className="h-8 w-8 text-primary" />,
    title: "Model Training",
    description:
      "Trained on a curated European folk song dataset using an RNN-LSTM architecture in TensorFlow/Keras, ensuring authentic musical motifs and innovative melody expansion.",
  },
  {
    icon: <ShuffleIcon className="h-8 w-8 text-secondary" />,
    title: "Dual-Mode Generation",
    description:
      "Enables users to either generate music from a text prompt or extend an existing musical piece, offering a flexible and interactive creative experience.",
  },
  {
    icon: <CloudIcon className="h-8 w-8 text-accent" />,
    title: "Seamless Web Integration",
    description:
      "Leverages Next.js API endpoints alongside Hugging Face’s MusicGen model, delivering real-time, uniquely styled music generation directly in the browser.",
  },
];
