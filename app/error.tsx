"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, Home, RefreshCcw, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  // Animation for broken music notes
  const brokenNotes = [
    { rotate: -15, x: -80, y: 20, delay: 0 },
    { rotate: 20, x: 80, y: -30, delay: 0.2 },
    { rotate: -10, x: -120, y: -60, delay: 0.4 },
    { rotate: 15, x: 100, y: 50, delay: 0.6 },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center relative overflow-hidden">
      {/* Background with distorted gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--destructive)/10),transparent_25%),radial-gradient(circle_at_70%_60%,hsl(var(--primary)/10),transparent_25%),radial-gradient(circle_at_40%_80%,hsl(var(--secondary)/10),transparent_25%)]"></div>

      {/* Animated broken music notes */}
      {brokenNotes.map((note, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
          animate={{
            opacity: 1,
            x: note.x,
            y: note.y,
            rotate: note.rotate,
          }}
          transition={{
            duration: 0.8,
            delay: note.delay,
            ease: "easeOut",
          }}
          className="absolute left-1/2 top-1/2 text-destructive/50"
        >
          <Music2 className="h-8 w-8" style={{ opacity: 0.6 }} />
        </motion.div>
      ))}

      <div className="space-y-8 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-12 w-12 text-destructive" />
              <motion.div
                className="absolute inset-0 rounded-full border border-destructive/30"
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

          <h1 className="text-4xl font-bold mb-2">Dissonance Detected</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Something went wrong with our composition.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-4"
        >
          <p className="text-muted-foreground">
            Our AI hit a wrong note. We've recorded this error and will work to
            fix it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              onClick={reset}
              size="lg"
              className="rounded-full gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full gap-2"
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                Return Home
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
