import { useState } from "react";
import { FiUpload } from "react-icons/fi";

function Chat() {
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmit = () => {
    setLoading(true);
    console.log("eita");
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
              onClick={() => setImage(null)}
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

      <div className="flex-1 flex justify-center items-center">
        {isLoading && (
          <div className="flex-col justify-center items-center">
            <div className="loader"></div>
            <div className="mt-4">Analisando....</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
