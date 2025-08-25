import { NextResponse } from "next/server";
import {
  uploadFile,
  LocalFile,
  getFileMetadata,
  downloadFile,
  deleteFile,
} from "@/storage";

export async function POST(req: Request) {
  try {
    // Lê o FormData enviado no body
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Nenhum arquivo enviado" },
        { status: 400 }
      );
    }

    // Converte File -> Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const originalname = file.name;
    const mimetype = file.type;

    // Opcional: suportar subpasta via query string
    const url = new URL(req.url);
    const folder = url.searchParams.get("folder") || "";

    // Faz o upload para o storage local
    const uploadResult: LocalFile = await uploadFile({
      fileBuffer: buffer,
      fileName: originalname,
      mimeType: mimetype,
      folder,
    });

    return NextResponse.json({
      success: true,
      fileName: uploadResult.name,
      filePath: uploadResult.path,
      size: uploadResult.size,
      mimeType: uploadResult.mimeType,
      createdTime: uploadResult.createdTime,
      message: "Arquivo enviado com sucesso",
    });
  } catch (error) {
    console.error("Erro no upload:", error);
    return NextResponse.json(
      {
        success: false,
        error: `Upload failed: ${
          error instanceof Error ? error.message : "Erro desconhecido"
        }`,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const filePath = url.searchParams.get("filePath");

    if (!filePath) {
      return NextResponse.json(
        { error: "Parâmetro 'filePath' é obrigatório" },
        { status: 400 }
      );
    }

    // Obter metadados
    const metadata = await getFileMetadata(filePath);

    if (!metadata?.name || !metadata?.mimeType) {
      return NextResponse.json(
        { error: "Arquivo não encontrado" },
        { status: 404 }
      );
    }

    // Baixar arquivo
    const fileBuffer = await downloadFile(filePath);

    const headers = new Headers({
      "Content-Type": metadata.mimeType,
      "Content-Disposition": `attachment; filename="${metadata.name}"`,
    });

    if (metadata.size) {
      headers.append("Content-Length", metadata.size.toString());
    }

    return new Response(new Uint8Array(fileBuffer), { headers });
  } catch (error) {
    console.error("Erro no GET:", error);
    const message =
      error instanceof Error ? error.message : "Erro interno no servidor";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const filePath = url.searchParams.get("filePath");

    if (!filePath) {
      return NextResponse.json(
        { error: "Parâmetro 'filePath' é obrigatório" },
        { status: 400 }
      );
    }

    await deleteFile(filePath);

    return NextResponse.json(
      { success: true, message: "Arquivo deletado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no DELETE:", error);
    const message =
      error instanceof Error ? error.message : "Erro interno no servidor";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
