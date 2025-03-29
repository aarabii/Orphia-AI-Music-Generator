import Link from "next/link";
import React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { BookOpen } from "lucide-react";
import { notebookData } from "@/constants/notebook-values";

type CellItem = CodeCellItem | ImageCellItem;

export interface CodeCellItem {
  type: "code";
  codeBlocks: string[];
}

export interface ImageCellItem {
  type: "image";
  src: string;
  alt?: string;
  containerClassName?: string;
  imageClassName?: string;
}

export interface CodeSectionProps {
  title: string;
  cells: CellItem[];
}

const CodeCell: React.FC<{ codeBlocks: string[] }> = ({ codeBlocks }) => (
  <div className="bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-700 mb-4 shadow-sm">
    <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
      {codeBlocks.join("\n")}
    </pre>
  </div>
);

const ImageCell: React.FC<ImageCellItem> = ({
  src,
  alt,
  containerClassName,
  imageClassName,
}) => (
  <div
    className={
      containerClassName ||
      "bg-gray-50 dark:bg-gray-800 p-3 rounded border dark:border-gray-700 mb-4"
    }
  >
    <img
      src={src}
      alt={alt || "Image"}
      className={imageClassName || "mx-auto max-w-full h-auto"}
    />
  </div>
);

const CodeSection: React.FC<CodeSectionProps> = ({ title, cells }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mb-6 shadow-md">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200 border-b pb-2 dark:border-gray-700">
        {title}
      </h2>
      {cells.map((cell, index) => {
        if (cell.type === "code") {
          return <CodeCell key={index} codeBlocks={cell.codeBlocks} />;
        } else if (cell.type === "image") {
          return <ImageCell key={index} {...cell} />;
        }
        return null;
      })}
    </div>
  );
};

export const NotebookCode = () => {
  return (
    <Card className="border-primary/20 overflow-hidden bg-white dark:bg-black">
      <CardHeader className="border-b bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 dark:border-gray-700 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/10">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <BookOpen className="h-5 w-5 text-primary" />
            Jupyter Notebook: Orphia [cite: 1]
          </CardTitle>
          <Link
            href="https://colab.research.google.com/drive/10Kv_A2nF1qXvHqbRziLsjovHq03Og34g?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="sm"
              className="rounded-full dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Open in Colab
            </Button>
          </Link>
        </div>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Training and evaluation process for the Orphia model
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {/* Set max-height instead of fixed height for better responsiveness */}
        <div className="max-h-[600px] w-full overflow-auto">
          <div className="p-6 font-sans">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Orphia Music Generation Model [cite: 1]
            </h1>
            {notebookData.map((section, index) => (
              <CodeSection
                key={index}
                title={section.title}
                cells={section.cells}
              />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 dark:border-gray-700 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/10 flex justify-between items-center">
        <span className="text-sm text-muted-foreground dark:text-gray-500">
          Last updated: March 2025
        </span>
        <Link
          href="/download/notebook"
          className="text-sm text-primary hover:underline dark:text-blue-400 dark:hover:text-blue-300"
        >
          Download full notebook
        </Link>
      </CardFooter>
    </Card>
  );
};
