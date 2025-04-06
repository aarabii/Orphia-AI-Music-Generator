import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

// Configure with your Hugging Face API Key
// It's highly recommended to use environment variables for API keys
// const HF_API_KEY = process.env.HUGGING_FACE_API_KEY;
// Using the provided key directly for demonstration, replace in production
const HF_API_KEY = "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"; // Replace with process.env.HUGGING_FACE_API_KEY

// Define a maximum allowed file size in bytes (e.g., 5MB)
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest) {
  try {
    // Parse form data from the request
    const formData = await request.formData();

    // Get audio file and parameters from form data
    const audioFile = formData.get("audio") as File | null; // Check if null
    const prompt = (formData.get("prompt") as string) || "";
    const duration = parseInt((formData.get("duration") as string) || "30");
    const sampleInfluence = parseInt(
      (formData.get("sampleInfluence") as string) || "70"
    );
    const transformationStyle = parseInt(
      (formData.get("transformationStyle") as string) || "50"
    );

    // --- Validation ---
    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // --- File Size Check ---
    if (audioFile.size > MAX_FILE_SIZE_BYTES) {
      console.warn(
        `Audio file rejected: Size (${audioFile.size} bytes) exceeds limit (${MAX_FILE_SIZE_BYTES} bytes)`
      );
      return NextResponse.json(
        {
          error: `Audio file is too large. Maximum size allowed is ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB.`,
        },
        { status: 413 } // 413 Payload Too Large is appropriate here
      );
    }
    // --- End File Size Check ---

    // Convert file to array buffer and then to base64
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Audio = buffer.toString("base64");

    // Prepare data for the Hugging Face API
    const apiData = {
      inputs: prompt || "Extend this music sample", // Use default prompt if none provided
    };

    console.log(
      `Sending request to Hugging Face API with prompt: "${prompt}" and parameters:`,
      {
        duration,
        guidance_scale: transformationStyle / 20,
        continuation_start: sampleInfluence / 100,
        // Log estimated payload size (base64 string length + other fields)
        estimatedPayloadSize: JSON.stringify(apiData).length,
      }
    );

    // Call the Hugging Face MusicGen API
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/facebook/musicgen-small",
      {
        method: "POST",
        headers: {
          // Use the API key
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      }
    );

    // --- Error Handling for API Response ---
    if (!response.ok) {
      let errorText = response.statusText;
      try {
        // Try to parse more specific error from Hugging Face response body
        const errorJson = await response.json();
        console.error("Hugging Face API Error Response Body:", errorJson);
        errorText = errorJson.error || errorText; // Use HF error message if available
        // Handle specific error cases if needed
        if (response.status === 413) {
          errorText = `Payload Too Large: The generated request was too large for the Hugging Face API. Try a smaller audio file or shorter duration. ${errorText}`;
        }
      } catch (e) {
        // Ignore error if response body is not valid JSON
        console.error("Could not parse Hugging Face error response body.");
      }

      console.error(
        `Hugging Face API error: ${response.status} ${response.statusText}`,
        `Error Detail: ${errorText}`
      );

      // Return a detailed error response
      return NextResponse.json(
        { error: `API error: ${errorText}` },
        { status: response.status } // Use the status code from the HF API response
      );
    }
    // --- End Error Handling ---

    // Get the audio blob from Hugging Face
    const audioBlob = await response.blob();

    // Return the audio data directly
    return new NextResponse(audioBlob, {
      headers: {
        "Content-Type": audioBlob.type || "audio/wav", // Use blob type or default
        "Content-Disposition": `attachment; filename="generated-audio.wav"`, // Suggest a filename
      },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unknown error occurred processing the request.",
      },
      { status: 500 } // Internal Server Error
    );
  }
}

// Configure the API route
export const config = {
  api: {
    bodyParser: false, // Essential for handling FormData correctly
    // responseLimit: '10mb', // This limits the size of the response *from* this API route, not the request *to* Hugging Face. Keep or adjust as needed for your responses.
  },
};
