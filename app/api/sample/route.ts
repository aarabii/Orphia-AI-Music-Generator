import { NextRequest, NextResponse } from "next/server";

const HF_API_KEY = process.env.HF_API_TOKEN;
export const maxDuration = 60;

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const audioFile = formData.get("audio") as File | null;
    const prompt = (formData.get("prompt") as string) || "";
    const duration = parseInt((formData.get("duration") as string) || "30");
    const sampleInfluence = parseInt(
      (formData.get("sampleInfluence") as string) || "70"
    );
    const transformationStyle = parseInt(
      (formData.get("transformationStyle") as string) || "50"
    );

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    if (audioFile.size > MAX_FILE_SIZE_BYTES) {
      console.warn(
        `Audio file rejected: Size (${audioFile.size} bytes) exceeds limit (${MAX_FILE_SIZE_BYTES} bytes)`
      );
      return NextResponse.json(
        {
          error: `Audio file is too large. Maximum size allowed is ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB.`,
        },
        { status: 413 }
      );
    }

    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Audio = buffer.toString("base64");

    const apiData = {
      inputs: prompt || "Extend this music sample",
    };

    console.log(
      `Sending request to Hugging Face API with prompt: "${prompt}" and parameters:`,
      {
        duration,
        guidance_scale: transformationStyle / 20,
        continuation_start: sampleInfluence / 100,
        estimatedPayloadSize: JSON.stringify(apiData).length,
      }
    );

    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/facebook/musicgen-small",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      }
    );

    if (!response.ok) {
      let errorText = response.statusText;
      try {
        const errorJson = await response.json();
        console.error("Hugging Face API Error Response Body:", errorJson);
        errorText = errorJson.error || errorText;
        if (response.status === 413) {
          errorText = `Payload Too Large: The generated request was too large for the Hugging Face API. Try a smaller audio file or shorter duration. ${errorText}`;
        }
      } catch (e) {
        console.error("Could not parse Hugging Face error response body.");
      }

      console.error(
        `Hugging Face API error: ${response.status} ${response.statusText}`,
        `Error Detail: ${errorText}`
      );

      return NextResponse.json(
        { error: `API error: ${errorText}` },
        { status: response.status }
      );
    }

    const audioBlob = await response.blob();

    return new NextResponse(audioBlob, {
      headers: {
        "Content-Type": audioBlob.type || "audio/wav",
        "Content-Disposition": `attachment; filename="generated-audio.wav"`,
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
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
