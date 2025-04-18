"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FileAudio,
  Info,
  Loader2,
  Music2,
  PlayCircle,
  PauseCircle,
  Upload,
  Wand2,
  Zap,
  Download,
  RefreshCw,
  X,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function MusicGenPage() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  const [fileName, setFileName] = useState("");
  const [fileObj, setFileObj] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMusic, setGeneratedMusic] = useState(false);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState("");
  const [error, setError] = useState("");
  const [fileObjectUrl, setFileObjectUrl] = useState("");

  const [isPlayingOriginal, setIsPlayingOriginal] = useState(false);
  const [isPlayingGenerated, setIsPlayingGenerated] = useState(false);

  const [duration, setDuration] = useState(30);
  const [sampleInfluence, setSampleInfluence] = useState(70);
  const [transformationStyle, setTransformationStyle] = useState(50);

  const uploadedAudioRef = useRef<HTMLAudioElement | null>(null);
  const generatedAudioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Clean up object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (generatedAudioUrl) {
        URL.revokeObjectURL(generatedAudioUrl);
      }
      if (fileObjectUrl) {
        URL.revokeObjectURL(fileObjectUrl);
      }
    };
  }, [generatedAudioUrl, fileObjectUrl]);

  // Set up audio event listeners
  useEffect(() => {
    const uploadedAudio = uploadedAudioRef.current;
    const generatedAudio = generatedAudioRef.current;

    const handleUploadedAudioEnd = () => setIsPlayingOriginal(false);
    const handleGeneratedAudioEnd = () => setIsPlayingGenerated(false);

    uploadedAudio?.addEventListener("ended", handleUploadedAudioEnd);
    generatedAudio?.addEventListener("ended", handleGeneratedAudioEnd);

    return () => {
      uploadedAudio?.removeEventListener("ended", handleUploadedAudioEnd);
      generatedAudio?.removeEventListener("ended", handleGeneratedAudioEnd);
    };
  }, [isUploaded, generatedMusic]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size exceeds 10MB limit");
        return;
      }

      // Clean up previous file URL if it exists
      if (fileObjectUrl) {
        URL.revokeObjectURL(fileObjectUrl);
      }

      // Stop playing if audio was playing
      if (isPlayingOriginal && uploadedAudioRef.current) {
        uploadedAudioRef.current.pause();
        setIsPlayingOriginal(false);
      }

      const newFileUrl = URL.createObjectURL(file);
      setFileObjectUrl(newFileUrl);
      setFileName(file.name);
      setFileObj(file);
      setIsUploaded(true);

      // Reset generated music when uploading a new file
      setGeneratedMusic(false);
      setGeneratedAudioUrl("");

      // Reset the error state
      setError("");

      // Reset file input value to allow re-upload of the same file
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveFile = () => {
    // Clean up file URL
    if (fileObjectUrl) {
      URL.revokeObjectURL(fileObjectUrl);
    }

    // Reset all file-related states
    setFileName("");
    setFileObj(null);
    setFileObjectUrl("");
    setIsUploaded(false);
    setGeneratedMusic(false);
    setGeneratedAudioUrl("");
    setError("");
    setIsPlayingOriginal(false);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const togglePlayOriginalAudio = () => {
    if (!uploadedAudioRef.current) return;

    if (isPlayingOriginal) {
      uploadedAudioRef.current.pause();
    } else {
      // Stop generated audio if playing
      if (isPlayingGenerated && generatedAudioRef.current) {
        generatedAudioRef.current.pause();
        setIsPlayingGenerated(false);
      }
      uploadedAudioRef.current.play().catch((err) => {
        console.error("Error playing audio:", err);
        toast.error("Failed to play audio");
      });
    }
    setIsPlayingOriginal(!isPlayingOriginal);
  };

  const togglePlayGeneratedAudio = () => {
    if (!generatedAudioRef.current) return;

    if (isPlayingGenerated) {
      generatedAudioRef.current.pause();
    } else {
      // Stop original audio if playing
      if (isPlayingOriginal && uploadedAudioRef.current) {
        uploadedAudioRef.current.pause();
        setIsPlayingOriginal(false);
      }
      generatedAudioRef.current.play().catch((err) => {
        console.error("Error playing generated audio:", err);
        toast.error("Failed to play generated audio");
      });
    }
    setIsPlayingGenerated(!isPlayingGenerated);
  };

  const handleGenerate = async () => {
    if (!isUploaded || !fileObj) {
      toast.error("Please upload an audio file first");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("audio", fileObj);
      formData.append("prompt", prompt);
      formData.append("duration", duration.toString());
      formData.append("sampleInfluence", sampleInfluence.toString());
      formData.append("transformationStyle", transformationStyle.toString());

      const response = await fetch("/api/sample", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate music");
      }

      const audioBlob = await response.blob();

      // Revoke previous URL to prevent memory leaks
      if (generatedAudioUrl) {
        URL.revokeObjectURL(generatedAudioUrl);
      }

      const audioUrl = URL.createObjectURL(audioBlob);

      setGeneratedAudioUrl(audioUrl);
      setGeneratedMusic(true);
      toast.success("Music generation complete!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate music");
      console.error("Error generating music:", err);
      toast.error("Failed to generate music");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    // Stop playing if audio was playing
    if (isPlayingGenerated && generatedAudioRef.current) {
      generatedAudioRef.current.pause();
      setIsPlayingGenerated(false);
    }

    setGeneratedMusic(false);
    if (generatedAudioUrl) {
      URL.revokeObjectURL(generatedAudioUrl);
      setGeneratedAudioUrl("");
    }
    handleGenerate();
  };

  const handleDownload = () => {
    if (!generatedAudioUrl) {
      toast.error("No audio to download");
      return;
    }

    try {
      const a = document.createElement("a");
      a.href = generatedAudioUrl;
      a.download = `orphia-${new Date().toISOString().slice(0, 10)}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success("Downloading audio...");
    } catch (error) {
      console.error("download error: ", error);
      toast.error("An error occurred while downloading audio");
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 gradient-text">
          Upload Sample
        </h1>
        <p className="text-muted-foreground">
          Upload an audio sample and let AI extend it or transform it using
          Meta's MusicGen.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <Card className="border-primary/20 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
              <CardTitle className="flex items-center">
                <FileAudio className="mr-2 h-5 w-5 text-primary" />
                Audio Sample
              </CardTitle>
              <CardDescription>
                Upload an audio file to use as a basis for your generation
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {!isUploaded ? (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-primary/20 rounded-lg p-12 text-center bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
                    <Upload className="h-8 w-8 text-primary absolute inset-0 m-auto" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Upload your audio
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop or click to browse
                  </p>
                  <Input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    id="audio-upload"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <Button asChild variant="secondary" className="rounded-full">
                    <label htmlFor="audio-upload">Choose file</label>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    MP3, WAV, or AIFF, max 10MB
                  </p>
                </div>
              ) : (
                <div className="rounded-md border p-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex-1 mr-2">
                      <h3 className="font-medium truncate">{fileName}</h3>
                      <p className="text-sm text-muted-foreground">
                        Uploaded just now
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 rounded-full"
                              onClick={() => {
                                if (fileInputRef.current) {
                                  fileInputRef.current.click();
                                }
                              }}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Replace file</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 rounded-full"
                              onClick={handleRemoveFile}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Remove file</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full"
                        onClick={togglePlayOriginalAudio}
                      >
                        {isPlayingOriginal ? (
                          <PauseCircle className="h-5 w-5 text-primary" />
                        ) : (
                          <PlayCircle className="h-5 w-5 text-primary" />
                        )}
                      </Button>
                    </div>
                    {fileObjectUrl && (
                      <audio
                        ref={uploadedAudioRef}
                        src={fileObjectUrl}
                        className="hidden"
                        onError={(e) => {
                          console.error("Audio error:", e);
                          toast.error("Error loading audio file");
                        }}
                      />
                    )}
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
                  <Textarea
                    placeholder="Optional: Add specific instructions for how to transform your sample (e.g., 'Turn this into jazz' or 'Add a drum beat')"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="mt-4 border-primary/20 focus-visible:ring-primary"
                  />

                  <Input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
              )}

              {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !isUploaded}
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
                  Your AI-transformed audio is ready to play
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="rounded-md border p-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-medium">Transformed {fileName}</h3>
                      <p className="text-sm text-muted-foreground">
                        Generated on {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full"
                      onClick={togglePlayGeneratedAudio}
                    >
                      {isPlayingGenerated ? (
                        <PauseCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <PlayCircle className="h-5 w-5 text-primary" />
                      )}
                    </Button>
                    {generatedAudioUrl && (
                      <audio
                        ref={generatedAudioRef}
                        src={generatedAudioUrl}
                        className="hidden"
                        onError={(e) => {
                          console.error("Generated audio error:", e);
                          toast.error("Error loading generated audio");
                        }}
                      />
                    )}
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
                            animation: `pulse ${Math.random() * 1 + 0.5}s ease-in-out infinite`,
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
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-1" />
                      Regenerating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Regenerate
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  className="rounded-full"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-1" />
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
                Transformation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Duration Extension</Label>
                  <span className="text-sm font-medium">{duration} sec.</span>
                </div>
                <Slider
                  value={[duration]}
                  onValueChange={(value) => setDuration(value[0])}
                  max={60}
                  step={5}
                  className="[&>span]:bg-primary"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Sample Influence</Label>
                  <span className="text-sm font-medium">
                    {sampleInfluence <= 30
                      ? "Low"
                      : sampleInfluence <= 70
                        ? "Medium"
                        : "High"}
                  </span>
                </div>
                <Slider
                  value={[sampleInfluence]}
                  onValueChange={(value) => setSampleInfluence(value[0])}
                  max={100}
                  className="[&>span]:bg-secondary"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>
                    <div className="flex items-center">
                      Transformation Style
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px] text-xs">
                              Controls how much the AI will transform your
                              original sample. Lower values stay closer to the
                              original.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </Label>
                  <span className="text-sm font-medium">
                    {transformationStyle <= 30
                      ? "Subtle"
                      : transformationStyle <= 70
                        ? "Medium"
                        : "Dramatic"}
                  </span>
                </div>
                <Slider
                  value={[transformationStyle]}
                  onValueChange={(value) => setTransformationStyle(value[0])}
                  max={100}
                  className="[&>span]:bg-accent"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
              <CardTitle className="text-lg flex items-center">
                <FileAudio className="mr-2 h-5 w-5 text-accent" />
                Sample Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-6">
              <p>For best results:</p>
              <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                <li>Use high-quality audio files</li>
                <li>Samples should be 5-30 seconds long</li>
                <li>Avoid samples with lots of background noise</li>
                <li>Solo instruments or clear melodies work best</li>
                <li>Make sure you have permission to use the sample</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
