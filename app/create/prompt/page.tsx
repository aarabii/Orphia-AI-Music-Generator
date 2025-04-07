"use client";

import { useState } from "react";
import {
  Info,
  Loader2,
  Music2,
  PlayCircle,
  PlusCircle,
  Sparkles,
  Wand2,
  Zap,
} from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function PromptPage() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMusic, setGeneratedMusic] = useState(false);
  const [duration, setDuration] = useState(30);
  const [creativity, setCreativity] = useState(50);
  const [complexity, setComplexity] = useState(30);
  const [audioURL, setAudioURL] = useState("");
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

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

  const handleGenerate = async () => {
    if (prompt.trim().length === 0) {
      toast.error("Please enter a prompt for music generation");
      return;
    }

    if (audioPlayer) {
      audioPlayer.pause();
    }
    setGeneratedMusic(false);
    setAudioURL("");

    setIsGenerating(true);

    try {
      const generationParams = {
        prompt: prompt.trim(),
        duration: duration,
        creativity: creativity / 100,
        complexity: complexity / 100,
      };

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(generationParams),
      });

      if (!response.ok) {
        let errorBody;
        try {
          errorBody = await response.json();
          console.error("Detailed API Error:", {
            status: response.status,
            body: errorBody,
          });
        } catch (parseError) {
          console.error("Error parsing error response:", parseError);
          errorBody = await response.text();
        }

        const errorMessage = `Music generation failed: ${response.status} ${JSON.stringify(errorBody)}`;

        console.error(errorMessage);

        throw new Error(errorMessage);
      }

      const data = await response.arrayBuffer();

      if (!data || data.byteLength === 0) {
        throw new Error("Received empty audio data");
      }

      const blob = new Blob([data], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);

      setAudioURL(url);
      setGeneratedMusic(true);

      const player = new Audio(url);
      setAudioPlayer(player);

      toast.success("Your AI-generated music is ready!");
    } catch (error) {
      console.error("Full music generation error:", error);

      toast.error(
        error instanceof Error
          ? `Error: ${error.message}`
          : "An unexpected error occurred during music generation"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!audioURL) {
      toast.error("No audio to download");
      return;
    }

    try {
      const a = document.createElement("a");
      a.href = audioURL;
      a.download = `orphia-${new Date().toISOString().slice(0, 10)}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.info("Downloading audio...");
    } catch (error) {
      console.error("download error: ", error);
      toast.error("An error occurred while downloading audio");
    }
  };

  const handlePlayPause = () => {
    if (!audioPlayer) {
      toast.error("No audio to play");
      return;
    }

    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 gradient-text">
          Create with Prompt
        </h1>
        <p className="text-muted-foreground">
          Describe the music you want to create using natural language.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <Card className="border-primary/20 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-primary" />
                Your Prompt
              </CardTitle>
              <CardDescription>
                Describe the music you want to generate as specifically as
                possible
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Textarea
                placeholder="e.g. A calming piano melody with soft strings in the background, perfect for meditation. The tempo should be slow and relaxing."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="h-32 border-primary/20 focus-visible:ring-primary"
              />
            </CardContent>
            <CardFooter className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || prompt.trim() === ""}
                className="gap-1 rounded-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    Generate Music
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {generatedMusic && (
            <Card className="border-primary/20 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
                <CardTitle className="flex items-center">
                  <Music2 className="mr-2 h-5 w-5 text-primary" />
                  Generated Music
                </CardTitle>
                <CardDescription>
                  Your AI-generated music is ready to play
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="rounded-md border p-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-medium">Your Composition</h3>
                      <p className="text-sm text-muted-foreground">
                        Generated on {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full"
                      onClick={handlePlayPause}
                    >
                      <PlayCircle className="h-5 w-5 text-primary" />
                    </Button>
                  </div>
                  <div className="h-16 rounded-md bg-gradient-to-r from-primary/10 via-secondary/20 to-accent/10 mb-2 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1 mx-[1px] bg-primary/40 rounded-full"
                          style={{
                            height: `${Math.sin(i * 0.5) * 30 + 40}%`,
                            opacity: i % 3 === 0 ? 0.8 : 0.4,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    // Reset for regeneration
                    setGeneratedMusic(false);
                    if (audioPlayer) {
                      audioPlayer.pause();
                    }
                    setAudioURL("");
                  }}
                >
                  Regenerate
                </Button>
                <Button
                  size="sm"
                  className="rounded-full"
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="border-primary/20 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
              <CardTitle className="text-lg flex items-center">
                <Zap className="mr-2 h-5 w-5 text-secondary" />
                Generation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Duration</Label>
                  <span className="text-sm font-medium">{duration}</span>
                </div>
                <Slider
                  value={[duration]}
                  onValueChange={(value) => setDuration(value[0])}
                  max={120}
                  step={5}
                  className="[&>span]:bg-primary"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Creativity</Label>
                  <span className="text-sm font-medium">{creativity}%</span>
                </div>
                <Slider
                  value={[creativity]}
                  onValueChange={(value) => setCreativity(value[0])}
                  max={100}
                  className="[&>span]:bg-secondary"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>
                    <div className="flex items-center">
                      Complexity
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px] text-xs">
                              Controls how intricate the composition will be.
                              Higher values create more complex musical
                              structures.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </Label>
                  <span className="text-sm font-medium">{complexity}%</span>
                </div>
                <Slider
                  value={[complexity]}
                  onValueChange={(value) => setComplexity(value[0])}
                  max={100}
                  className="[&>span]:bg-accent"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
              <CardTitle className="text-lg flex items-center">
                <PlusCircle className="mr-2 h-5 w-5 text-accent" />
                Prompt Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-6">
              {[
                "An upbeat electronic dance track with a catchy melody and driving bass.",
                "A sad piano ballad with emotional strings that builds to a climax.",
                "A relaxing ambient soundscape with nature sounds and gentle synthesizers.",
              ].map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto text-left py-2 border-primary/10 hover:bg-primary/5 hover:text-primary"
                  onClick={() => setPrompt(example)}
                >
                  <PlusCircle className="mr-2 h-4 w-4 shrink-0 text-primary" />
                  <span className="line-clamp-2 text-sm">{example}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
