"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function GlobalError({
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

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-background">
          <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-destructive/10 mb-6">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>

          <h1 className="text-3xl font-bold mb-2">Critical Error</h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-md">
            Our AI orchestra has encountered a serious problem.
          </p>

          <p className="text-muted-foreground mb-8 max-w-md">
            We've recorded this error and will work to fix it as soon as
            possible.
          </p>

          <Button
            onClick={reset}
            size="lg"
            className="rounded-full gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            <RefreshCcw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </body>
    </html>
  );
}
