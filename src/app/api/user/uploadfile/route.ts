import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const filename = url.searchParams.get("filename");
  const path = url.searchParams.get("path");
  const blob = await put(
    `${path}/${filename}`,
    request.body || new Uint8Array(),
    {
      access: "public",
    }
  );
  return NextResponse.json(blob);
}
