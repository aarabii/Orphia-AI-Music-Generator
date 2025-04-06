import { NextResponse } from "next/server";
// Debugging line to check if the token is set

export const maxDuration = 60; // Maximum duration in seconds

export async function POST(request: Request) {
  try {
    // Early token validation with more context
    if (!process.env.HF_TOKEN) {
      console.error("CRITICAL: Hugging Face Token is not set");
      return NextResponse.json(
        {
          error: "Server configuration error",
          details:
            "Hugging Face API token is missing. Please check your environment configuration.",
          diagnostics: {
            envVarExists: false,
            tokenLength: 0,
          },
        },
        { status: 500 }
      );
    }

    // Attempt to parse request body with extra error handling
    let requestBody;
    try {
      requestBody = await request.json();
      console.log("Parsed Request Body:", JSON.stringify(requestBody, null, 2));
    } catch (parseError) {
      console.error("CRITICAL: Request Body Parsing Error", parseError);
      return NextResponse.json(
        {
          error: "Failed to parse request body",
          details:
            parseError instanceof Error
              ? parseError.message
              : "Unknown parsing error",
        },
        { status: 400 }
      );
    }

    // Destructure and validate request parameters
    const {
      prompt,
      duration = 30,
      creativity = 0.5,
      complexity = 0.3,
    } = requestBody;

    // Validate prompt
    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      console.warn("VALIDATION ERROR: Invalid or missing prompt");
      return NextResponse.json(
        {
          error: "Invalid prompt",
          details: "Prompt must be a non-empty string",
        },
        { status: 400 }
      );
    }

    const clampedDuration = Math.min(Math.max(5, duration), 120);

    console.log("Generation Parameters:", {
      prompt,
      duration: clampedDuration,
      creativity,
      complexity,
    });

    // Attempt to call Hugging Face API
    try {
      const huggingFaceResponse = await fetch(
        "https://router.huggingface.co/hf-inference/models/facebook/musicgen-small",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer hf_CbpHCAjihQRRTnrFYFgLympkjWqTogqcIXs`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: prompt,
            // parameters: {
            //     max_new_tokens: clampedDuration * 10,
            //     temperature: creativity,
            //     guidance_scale: complexity * 2,
            //     do_sample: true,
            // },
          }),
        }
      );

      console.log("Hugging Face API Response:", {
        status: huggingFaceResponse.status,
        statusText: huggingFaceResponse.statusText,
      });

      if (!huggingFaceResponse.ok) {
        const errorText = await huggingFaceResponse.text();
        console.error("Hugging Face API Error:", {
          status: huggingFaceResponse.status,
          body: errorText,
        });

        return NextResponse.json(
          {
            error: "Failed to generate music",
            details: errorText || "Unknown Hugging Face API error",
            status: huggingFaceResponse.status,
          },
          { status: huggingFaceResponse.status || 500 }
        );
      }

      const audioData = await huggingFaceResponse.arrayBuffer();

      if (!audioData || audioData.byteLength === 0) {
        console.warn("No audio data generated");
        return NextResponse.json(
          {
            error: "No audio data",
            details: "The API returned an empty audio buffer",
          },
          { status: 500 }
        );
      }

      console.log(`Audio data generated: ${audioData.byteLength} bytes`);

      return new Response(audioData, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Disposition": `attachment; filename="generated-music-${Date.now()}.mp3"`,
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      });
    } catch (huggingFaceError) {
      console.error("Hugging Face API Call Error:", huggingFaceError);

      return NextResponse.json(
        {
          error: "API call failed",
          details:
            huggingFaceError instanceof Error
              ? huggingFaceError.message
              : "Unknown API error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("CRITICAL: Unexpected Error in Music Generation", error);

    return NextResponse.json(
      {
        error: "Unexpected server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Ensure dynamic rendering
export const dynamic = "force-dynamic";
