import { useState } from "react";
import { FiUpload } from "react-icons/fi";

function Chat() {
  const [image, setImage] = useState<File>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const clear = () => {
    setResult(undefined);
    setImage(undefined);
  };

  const onSubmit = () => {
    setResult(undefined);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setResult("Benigno");
    }, 5000);
  };

  return (
    <div className="w-full h-full flex flex-row items-center">
      {/**
       * Área de upload de imagem
       */}

      <div>
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-96 h-96 border-2 border-dashed border-line rounded-lg cursor-pointer transition-colors duration-200 hover:bg-btn-hover bg-background relative"
        >
          {!image ? (
            <>
              <FiUpload className="text-4xl mb-2" />
              <span className="">Clique ou arraste uma imagem</span>
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
          <div className="grid grid-cols-2 gap-4 mt-4 w-96">
            <button
              onClick={clear}
              className="cursor-pointer px-6 py-2 bg-rose-600 duration-200 text-white rounded hover:bg-red-400 transition-colors"
            >
              Remover
            </button>

            <button
              onClick={onSubmit}
              className="cursor-pointer px-6 py-2 bg-blue-600 duration-200 text-white rounded hover:bg-blue-500 transition-colors"
            >
              Analisar
            </button>
          </div>
        )}
      </div>

      {/**
       * Exibição do resultado/loading da análise da IA
       */}
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
  return (
    <div className="flex flex-col p-6 w-full h-full">
      <div>
        <span>Histórico</span>
      </div>
    </div>
  )
}

export { Chat, HistorySideBar };
