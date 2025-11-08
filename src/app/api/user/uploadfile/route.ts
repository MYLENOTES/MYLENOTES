import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

// Increase timeout for file uploads (5 minutes)
export const maxDuration = 300;

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Check if BLOB_READ_WRITE_TOKEN is set
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN is not set in environment variables");
      return NextResponse.json(
        { error: "Blob storage is not configured. Please add BLOB_READ_WRITE_TOKEN to .env.local" },
        { status: 500 }
      );
    }

    const url = new URL(request.url);
    const filename = url.searchParams.get("filename");
    const path = url.searchParams.get("path");
    
    if (!filename || !path) {
      console.error("Missing filename or path");
      return NextResponse.json(
        { error: "Filename and path are required" },
        { status: 400 }
      );
    }

    // Get the file from the request body as a Blob
    const fileBlob = await request.blob();
    
    if (!fileBlob || fileBlob.size === 0) {
      console.error("Empty file body");
      return NextResponse.json(
        { error: "File body is required and cannot be empty" },
        { status: 400 }
      );
    }

    console.log(`Uploading file: ${filename}, Size: ${fileBlob.size} bytes`);

    // Upload to Vercel Blob
    const blob = await put(`${path}/${filename}`, fileBlob, {
      access: "public",
    });
    
    console.log("Upload successful:", blob.url);
    return NextResponse.json(blob);
  } catch (error) {
    console.error("Error uploading file:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to upload file";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
