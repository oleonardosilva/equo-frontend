import { useChat } from "@/context/chat.context";
import { HistoryService } from "@/services/history.service";
import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";

function Chat() {
  const {
    image,
    setImage,
    isLoading,
    result,
    clear,
    onSubmit,
    uploadFile,
  } = useChat();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    clear();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await uploadFile(file);
      setImage(file);
    }
  };

  return (
    <div className="w-full h-full flex flex-row items-center">
      <div>
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-96 h-96 border-2 border-dashed border-line rounded-lg cursor-pointer transition-colors duration-200 hover:bg-btn-hover bg-background relative"
        >
          {!image ? (
            <>
              <FiUpload className="text-4xl mb-2" />
              <span>Clique ou arraste uma imagem</span>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </>
          ) : (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </label>
        {image && (
          <div className="flex justify-center mt-6 w-96">
            <button
              onClick={onSubmit}
              hidden={!!result || isLoading}
              className="cursor-pointer px-12 py-2 bg-blue-600 duration-200 text-white rounded hover:bg-blue-500 transition-colors"
            >
              Analisar
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 flex justify-center items-center">
        {isLoading && (
          <div className="flex flex-col justify-center items-center">
            <div className="loader"></div>
            <div className="mt-4">Analisando....</div>
          </div>
        )}
        {!!result && (
          <div className="flex-col justify-center items-center">
            <div className="text-secondary">Resultado: {result}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function HistorySideBar() {
  const { setImage, setResult, image, imageVersion } = useChat();
  const [history, setHistory] = useState<
    { id: string; name: string; result: string }[]
  >([]);

  useEffect(() => {
    const historyService = new HistoryService();
    setHistory(historyService.getHistory());
  }, [imageVersion]);

  const onClickFile = async (item: any) => {
    const historyService = new HistoryService();
    const blob = await historyService.getFile(item.filePath);
    if (!blob) return;
    const file = new File([blob], item.name, { type: blob.type });

    setImage(file);
    setResult(item.result);
  };

  return (
    <div className="flex flex-col p-6 w-full h-full">
      <div className="h-full select-none">
        <span>histórico</span>
        <div className="ml-4 mt-2 flex flex-col overflow-y-scroll h-4/5 scrollbar-thin">
          <span
            className={`mt-1 w-fit cursor-pointer duration-100 hover:text-tertiary ${
              !image ? "text-tertiary" : ""
            }`}
            onClick={() => {
              setImage(undefined);
              setResult(undefined);
            }}
          >
            {"> _new upload"}
          </span>

          {history.map((item, index) => (
            <span
              key={index}
              className={`mt-1 cursor-pointer duration-100 hover:text-tertiary truncate ${
                image?.name === item.name ? "text-tertiary" : ""
              }`}
              onClick={() => onClickFile(item)}
            >
              {`> _${item.name}`}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export { Chat, HistorySideBar };
