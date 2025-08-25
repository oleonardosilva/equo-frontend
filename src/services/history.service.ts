export class HistoryService {
  constructor() {}

  async upload({ file, result }: { file: File; result?: string }) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/storage", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        let history = JSON.parse(
          sessionStorage.getItem("uploadHistory") || "[]"
        );

        // Usa filePath como id único
        if (
          history.filter((item: any) => item.filePath === data.filePath)
            .length > 0
        ) {
          history = history.filter(
            (item: any) => item.filePath !== data.filePath
          );
        }

        history.unshift({
          filePath: data.filePath,
          name: data.fileName,
          result,
          uploadedAt: new Date().toISOString(),
        });

        sessionStorage.setItem("uploadHistory", JSON.stringify(history));
        return true;
      }

      throw new Error(data.error || "Upload failed");
    } catch (error) {
      console.error("Erro no upload:", error);
    }
    return false;
  }

  getHistory() {
    return JSON.parse(sessionStorage.getItem("uploadHistory") || "[]").sort(
      (a: any, b: any) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
  }

  async getFile(filePath: string) {
    try {
      const response = await fetch(
        `/api/storage?filePath=${encodeURIComponent(filePath)}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch file");
      }

      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error("Erro ao obter arquivo:", error);
    }
    return null;
  }
}
