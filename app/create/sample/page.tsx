"use client"

import type React from "react"

import { useState } from "react"
import { FileAudio, Info, Loader2, Music2, PlayCircle, Upload, Wand2, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function SamplePage() {
  const [fileName, setFileName] = useState("")
  const [isUploaded, setIsUploaded] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedMusic, setGeneratedMusic] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
      setIsUploaded(true)
    }
  }

  const handleGenerate = () => {
    if (!isUploaded) return

    setIsGenerating(true)

    // Simulate music generation
    setTimeout(() => {
      setIsGenerating(false)
      setGeneratedMusic(true)
    }, 3000)
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 gradient-text">Upload Sample</h1>
        <p className="text-muted-foreground">Upload an audio sample and let AI extend it or transform it.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <Card className="border-primary/20 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
              <CardTitle className="flex items-center">
                <FileAudio className="mr-2 h-5 w-5 text-primary" />
                Audio Sample
              </CardTitle>
              <CardDescription>Upload an audio file to use as a basis for your generation</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {!isUploaded ? (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-primary/20 rounded-lg p-12 text-center bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
                    <Upload className="h-8 w-8 text-primary absolute inset-0 m-auto" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Upload your audio</h3>
                  <p className="text-sm text-muted-foreground mb-4">Drag and drop or click to browse</p>
                  <Input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    id="audio-upload"
                    onChange={handleFileChange}
                  />
                  <Button asChild variant="secondary" className="rounded-full">
                    <label htmlFor="audio-upload">Choose file</label>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">MP3, WAV, or AIFF, max 10MB</p>
                </div>
              ) : (
                <div className="rounded-md border p-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-medium">{fileName}</h3>
                      <p className="text-sm text-muted-foreground">Uploaded just now</p>
                    </div>
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
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
                  <Textarea
                    placeholder="Optional: Add specific instructions for how to transform your sample"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="mt-4 border-primary/20 focus-visible:ring-primary"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
              <Button onClick={handleGenerate} disabled={isGenerating || !isUploaded} className="gap-1 rounded-full">
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
                <CardDescription>Your AI-transformed audio is ready to play</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="rounded-md border p-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-medium">Transformed {fileName}</h3>
                      <p className="text-sm text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
                    </div>
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
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
                <Button variant="outline" size="sm" className="rounded-full">
                  Regenerate
                </Button>
                <Button size="sm" className="rounded-full">
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
                  <span className="text-sm font-medium">+30s</span>
                </div>
                <Slider defaultValue={[30]} max={120} step={5} className="[&>span]:bg-primary" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Sample Influence</Label>
                  <span className="text-sm font-medium">High</span>
                </div>
                <Slider defaultValue={[70]} max={100} className="[&>span]:bg-secondary" />
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
                              Controls how much the AI will transform your original sample. Lower values stay closer to
                              the original.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </Label>
                  <span className="text-sm font-medium">Medium</span>
                </div>
                <Slider defaultValue={[50]} max={100} className="[&>span]:bg-accent" />
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
  )
}

