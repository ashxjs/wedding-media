import { GetVideoUrl } from "@/services/storage.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }

  const file = slug.join("/");

  // URL du fichier stocké sur GCS
  const fileUrl = await GetVideoUrl(file);

  try {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Fichier non trouvé" },
        { status: response.status }
      );
    }

    // Get the response data as an array buffer
    const data = await response.arrayBuffer();

    // Create a new response with the correct headers
    return new NextResponse(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=31536000",
        "Content-Type":
          response.headers.get("Content-Type") || "application/dash+xml",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur de récupération du fichier" },
      { status: 500 }
    );
  }
}
