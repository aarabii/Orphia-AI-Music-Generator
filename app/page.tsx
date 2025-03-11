"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Music2,
  Upload,
  Sparkles,
  Wand2,
  Headphones,
  Zap,
  PlayCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showAnimation ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #FFD700 0%, #FF1493 50%, #9370DB 100%)",
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-10 rounded-full opacity-30 blur-md bg-white"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
                {/* <Music2 className="relative mx-auto h-20 w-20 text-white" /> */}
                <Image
                  src="/icon.svg"
                  alt="icon"
                  width={200}
                  height={200}
                  className="relative mx-auto"
                />
              </div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-4 text-4xl font-bold text-white"
              >
                Orphia
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-2 text-xl text-white/80"
              >
                Music Born From Words
              </motion.p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div>
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 20, 147, 0.15) 50%, rgba(147, 112, 219, 0.15) 100%)",
            }}
          ></div>

          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary/20 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/20 blur-3xl"></div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                  >
                    Create Music with <br />
                    <span className="text-primary">AI-Powered</span> Magic
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="max-w-[600px] text-muted-foreground md:text-xl"
                  >
                    Inspired by Orpheus, the legendary musician of Greek
                    mythology. Create unique music with just a prompt or from a
                    sample.
                  </motion.p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                >
                  <Link href="/create/prompt">
                    <Button
                      size="lg"
                      className="gap-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Sparkles className="h-4 w-4" />
                      Create with Prompt
                    </Button>
                  </Link>
                  <Link href="/create/sample">
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-1 rounded-full border-secondary text-secondary hover:bg-secondary/10"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Sample
                    </Button>
                  </Link>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mx-auto flex items-center justify-center lg:order-last"
              >
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Music visualization"
                    width={400}
                    height={400}
                    className="rounded-2xl shadow-lg"
                  />
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary/20 rounded-full blur-xl"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/5),transparent_25%),radial-gradient(circle_at_70%_60%,hsl(var(--secondary)/5),transparent_25%),radial-gradient(circle_at_40%_80%,hsl(var(--accent)/5),transparent_25%)]"></div>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full px-3 py-1 text-sm bg-primary/10 text-primary mb-2">
                  <Wand2 className="h-4 w-4 inline-block mr-1" />
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Music Creation{" "}
                  <span className="text-secondary">Reimagined</span>
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Powered by state-of-the-art neural networks, Orphia transforms
                  your ideas into beautiful melodies.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  title: "Describe Your Vision",
                  description:
                    "Use natural language to describe the music you want to create.",
                  icon: <Sparkles className="h-10 w-10 text-primary" />,
                  color: "bg-primary/10",
                },
                {
                  title: "AI Generation",
                  description:
                    "Our neural network processes your input to create unique music.",
                  icon: <Zap className="h-10 w-10 text-secondary" />,
                  color: "bg-secondary/10",
                },
                {
                  title: "Download & Share",
                  description:
                    "Download your creation in various formats or share directly.",
                  icon: <Headphones className="h-10 w-10 text-accent" />,
                  color: "bg-accent/10",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-primary/10 overflow-hidden h-full">
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      <div className={`mb-4 rounded-full ${item.color} p-3`}>
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
