import { Upload } from "lucide-react";
import { useEffect, useState } from "react";

export const FileUpload = ({ handleFileChange, resetPhoto }) => {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle file selection and preview
  const handleFile = (file) => {
    if (file) {
      if (preview) URL.revokeObjectURL(preview); // Clean up old preview
      const newPreview = URL.createObjectURL(file);
      setPreview(newPreview);
      handleFileChange({ target: { files: [file] } });
    }
  };

  // Clear preview when photo is reset from parent
  useEffect(() => {
    if (!resetPhoto && preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
  }, [preview, resetPhoto]);

  return (
    <div className="w-full relative">
      <div
        className={`mt-1 flex flex-col items-center justify-center w-full h-[502px] 
        border-2 border-dashed rounded-lg bg-gray-950 ${
          isDragging
            ? "border-blue-400"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
      >
        {preview ? (
          <div className="relative w-full h-full p-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain"
            />
            {/* Clear button */}
            <button
              type="button" // Important: prevent form submission
              onClick={() => {
                URL.revokeObjectURL(preview);
                setPreview(null);
                handleFileChange({ target: { files: [] } });
              }}
              className="absolute top-6 right-6 bg-red-500 text-white p-2 rounded-full"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="w-fit h-fit">
            <Upload className="w-12 h-12 mb-4 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG</p>
            <input
              type="file"
              onChange={(e) => handleFile(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".svg,.png,.jpg,.jpeg"
              required
            />
          </div>
        )}
      </div>
    </div>
  );
};
