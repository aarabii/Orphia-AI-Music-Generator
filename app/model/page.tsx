"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import {
  BookOpen,
  BrainCircuit,
  Code2,
  FileCode2,
  Github,
  Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import { redirect } from "next/navigation";
import { NotebookCode } from "./NotebookCode";
import { PythonCode } from "./PythonCode";
import { aboutModel } from "@/constants/model-data";

import modelImage from "@/assets/extraImage/modelImg.png";

export default function ModelPage() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const controls = useAnimation();
  const [useIframe, setUseIframe] = useState(false);

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }));
  }, [controls]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="container py-8">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text">
            Our AI Model
          </h1>
          <p className="text-xl text-muted-foreground">
            An overview of the neural network architecture powering Orphia.
          </p>
        </div>

        <div className="space-y-10 py-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-lg blob bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
              <Image
                src={modelImage.src}
                alt="Neural Network Architecture"
                loading="lazy"
                width={600}
                height={400}
                className="rounded-lg border border-primary/20 relative z-10"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold gradient-text">
                RNN-LSTM-Based Architecture
              </h2>
              <p className="text-muted-foreground">
                Orphia leverages a custom RNN-LSTM neural network built with
                TensorFlow/Keras and trained on a curated European folk song
                dataset. The model processes both text prompts and audio inputs,
                transforming them into a latent representation that captures the
                underlying musical patterns, including rhythm, melody, and
                harmony.
              </p>
              <p className="text-muted-foreground">
                This powerful representation enables the generation of extended
                musical sequences that remain faithful to the original style
                while introducing creative variations.
              </p>
              <div className="flex gap-4 pt-4">
                <Button
                  variant="outline"
                  className="gap-2 rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary"
                  asChild
                >
                  <Link href="https://colab.research.google.com/drive/10Kv_A2nF1qXvHqbRziLsjovHq03Og34g?usp=sharing">
                    <FileCode2 className="h-4 w-4" />
                    View Notebook
                  </Link>
                </Button>
                <Button className="gap-2 rounded-full" asChild>
                  <Link
                    href="https://github.com/aarabii/orphia-ai-music-generator/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                    GitHub Repo
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {aboutModel.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
              >
                <Card className="border-primary/20 h-full overflow-hidden">
                  <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
                    <div className="p-2 w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center mb-2">
                      {item.icon}
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div id="notebook" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold gradient-text">
                Jupyter Notebook
              </h2>
              <div className="flex gap-2">
                <Button
                  variant={useIframe ? "outline" : "default"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setUseIframe(false)}
                >
                  Python Code
                </Button>
                <Button
                  variant={useIframe ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setUseIframe(true)}
                >
                  Notebook View
                </Button>
              </div>
            </div>

            {useIframe ? <NotebookCode /> : <PythonCode />}
          </div>
        </div>
      </div>
    </div>
  );
}
