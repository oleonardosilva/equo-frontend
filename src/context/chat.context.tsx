import { createContext, useContext, useState, ReactNode } from "react";
import { HistoryService } from "@/services/history.service";
import { error, success } from "@/utils";

interface ChatContextProps {
  image?: File;
  result?: string;
  isLoading: boolean;
  imageVersion: number;
  setLoading: (loading: boolean) => void;
  setImage: (file?: File) => void;
  setResult: (result?: string) => void;
  uploadFile: (file: File, result?: string) => Promise<boolean>;
  onSubmit: () => void;
  clear: () => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [image, setImageFile] = useState<File>();
  const [result, setResult] = useState<string>();
  const [imageVersion, setImageVersion] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const clear = () => {
    setImage(undefined);
    setResult(undefined);
  };

  const setImage = (file: File | undefined) => {
    setImageFile(file);
    setImageVersion((v) => v + 1);
  };

  const uploadFile = async (file: File, result?: string) => {
    const historyService = new HistoryService();
    const resp = await historyService.upload({ file, result });
    if (!resp) {
      error("Erro ao salvar análise no histórico");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (!image) return;
    setLoading(true);

    setTimeout(async () => {
      // todo: definir o result correto
      await uploadFile(image, "benigno");
      setResult("benigno");
      success("Análise salva no histórico");
      setImageVersion((v) => v + 1);
      setLoading(false);
    }, 5000);
  };

  return (
    <ChatContext.Provider
      value={{
        image,
        result,
        isLoading,
        setLoading,
        setImage,
        imageVersion,
        setResult,
        uploadFile,
        onSubmit,
        clear,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat deve ser usado dentro de ChatProvider");
  }
  return context;
}
