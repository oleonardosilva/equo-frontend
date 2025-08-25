import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

// Garantir que a pasta exista
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export interface LocalFile {
  name: string;
  path: string;
  size: number;
  mimeType: string;
  createdTime: string;
}

/**
 * Upload de arquivo local
 */
export async function uploadFile({
  fileBuffer,
  fileName,
  mimeType,
  folder = "",
}: {
  fileBuffer: Buffer;
  fileName: string;
  mimeType: string;
  folder?: string;
}): Promise<LocalFile> {
  try {
    const folderPath = path.join(UPLOAD_DIR, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const filePath = path.join(folderPath, fileName);
    await fs.promises.writeFile(filePath, fileBuffer);

    const stats = await fs.promises.stat(filePath);

    return {
      name: fileName,
      path: filePath,
      size: stats.size,
      mimeType,
      createdTime: stats.birthtime.toISOString(),
    };
  } catch (error) {
    console.error("Erro no upload:", error);
    throw new Error("Upload failed");
  }
}

/**
 * Download de arquivo local
 */
export async function downloadFile(filePath: string): Promise<Buffer> {
  try {
    return await fs.promises.readFile(filePath);
  } catch (error) {
    console.error("Erro no download:", error);
    throw new Error("Download failed");
  }
}

/**
 * Deletar arquivo local
 */
export async function deleteFile(
  filePath: string
): Promise<{ success: boolean }> {
  try {
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    console.error("Erro ao deletar arquivo:", error);
    throw new Error("Delete failed");
  }
}

/**
 * Obter metadados do arquivo local
 */
export async function getFileMetadata(filePath: string): Promise<LocalFile> {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error("Arquivo não encontrado");
    }

    const stats = await fs.promises.stat(filePath);
    return {
      name: path.basename(filePath),
      path: filePath,
      size: stats.size,
      mimeType: "application/octet-stream", // você pode tentar inferir com 'mime-types' se quiser
      createdTime: stats.birthtime.toISOString(),
    };
  } catch (error) {
    console.error("Erro ao obter metadados:", error);
    throw new Error(
      error instanceof Error ? error.message : "Erro desconhecido"
    );
  }
}
