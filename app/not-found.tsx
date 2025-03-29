"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Music2, AudioWaveformIcon as Waveform } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  // Animation for the music notes
  const notes = [
    { delay: 0, x: -20, y: -30 },
    { delay: 0.2, x: 20, y: -60 },
    { delay: 0.4, x: -30, y: -90 },
    { delay: 0.6, x: 40, y: -120 },
    { delay: 0.8, x: -10, y: -150 },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/10),transparent_25%),radial-gradient(circle_at_70%_60%,hsl(var(--secondary)/10),transparent_25%),radial-gradient(circle_at_40%_80%,hsl(var(--accent)/10),transparent_25%)]"></div>

      {/* Animated music notes */}
      {notes.map((note, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: -150,
            x: note.x,
          }}
          transition={{
            duration: 3,
            delay: note.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1,
          }}
          className="absolute left-1/2 bottom-1/4"
        >
          <Music2 className="h-6 w-6 text-primary" />
        </motion.div>
      ))}

      <div className="space-y-8 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-primary/10">
              <Waveform className="h-12 w-12 text-primary" />
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold gradient-text mb-2">
            404 - Track Not Found
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Looks like this melody doesn't exist in our composition.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-4"
        >
          <p className="text-muted-foreground">
            The page you're looking for might have been moved, deleted, or never
            existed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="rounded-full gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Return Home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full gap-2"
            >
              <Link href="/create/prompt">
                <Music2 className="h-4 w-4" />
                Create Music
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
