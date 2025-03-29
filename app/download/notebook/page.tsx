"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Download, FileDown, FileText } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const NOTEBOOK_FILENAME = "Orphia.ipynb";
const NOTEBOOK_PATH = `/assets/${NOTEBOOK_FILENAME}`;
const DOWNLOAD_AS_FILENAME = NOTEBOOK_FILENAME;

export default function DownloadNotebookPage() {
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [downloadError, setDownloadError] = useState(false);

  useEffect(() => {
    if (downloadLinkRef.current) {
      console.log(`Attempting to trigger download for: ${NOTEBOOK_PATH}`);

      try {
        downloadLinkRef.current.click();
        setDownloadStarted(true);
      } catch (error) {
        console.error("Error triggering download:", error);
        setDownloadError(true);
      }
    } else {
      console.error("Download link ref was not available on mount.");
      setDownloadError(true);
    }
  }, []);

  const handleManualDownload = () => {
    setDownloadStarted(true);
  };

  return (
    <div className="container py-12 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/model"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Model Page
        </Link>

        <Card className="border-primary/20 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
            <div className="flex items-center gap-2">
              <div className="p-2 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Downloading Notebook</CardTitle>
                <CardDescription>
                  Orphia Music Generation Model Notebook
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {downloadError ? (
              <Alert variant="destructive">
                <AlertTitle>Download Error</AlertTitle>
                <AlertDescription>
                  There was a problem initiating the automatic download. Please
                  use the manual download button below.
                </AlertDescription>
              </Alert>
            ) : downloadStarted ? (
              <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <FileDown className="h-5 w-5 text-primary animate-bounce" />
                </div>
                <div>
                  <h3 className="font-medium">Download Started</h3>
                  <p className="text-sm text-muted-foreground">
                    Your file <strong>{DOWNLOAD_AS_FILENAME}</strong> is being
                    downloaded
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Download className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Preparing Download</h3>
                  <p className="text-sm text-muted-foreground">
                    Your download should start automatically in a few seconds
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h3 className="text-lg font-medium">About This Notebook</h3>
              <p className="text-muted-foreground text-sm">
                This Jupyter notebook contains the complete code for the Orphia
                music generation model, including the neural network
                architecture, training process, and evaluation methods. You can
                run this notebook in environments like Google Colab, Jupyter
                Lab, or any other platform that supports .ipynb files.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Requirements</h3>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Python 3.8 or higher</li>
                <li>NumPy</li>
                <li>Music21</li>
                <li>Tensorflow</li>
                <li>Matplotlib</li>
                <li>Seaborn</li>
                <li>Librosa</li>
              </ul>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 p-6">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="rounded-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>

            <Button
              onClick={handleManualDownload}
              className="rounded-full"
              asChild
            >
              <a href={NOTEBOOK_PATH} download={DOWNLOAD_AS_FILENAME}>
                <Download className="mr-2 h-4 w-4" />
                Download Manually
              </a>
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Having trouble? Contact our support at{" "}
            <a
              href="mailto:aarab.nishchal@gmail.com"
              className="text-primary hover:underline"
            >
              aarab.nishchal@gmail.com
            </a>
          </p>
        </div>
      </motion.div>

      {/* Hidden download trigger link */}
      <a
        ref={downloadLinkRef}
        href={NOTEBOOK_PATH}
        download={DOWNLOAD_AS_FILENAME}
        aria-hidden="true"
        style={{ display: "none" }}
      >
        Download Trigger
      </a>
    </div>
  );
}
