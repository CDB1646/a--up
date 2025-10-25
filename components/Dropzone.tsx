
import React, { useState, useCallback, useRef } from 'react';

interface DropzoneProps {
  onFileSelect: (file: File | null) => void;
  onEnhance: () => void;
  selectedFile: File | null;
  error: string | null;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
);

const Dropzone: React.FC<DropzoneProps> = ({ onFileSelect, onEnhance, selectedFile, error }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-6 opacity-0 fade-in fade-in-delay-2">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
        className={`w-full h-72 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center p-8 cursor-pointer transition-all duration-300 group
          ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'}
          bg-white/5 dark:bg-black/20 backdrop-blur-sm`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />
        {selectedFile ? (
            <div className='flex flex-col items-center justify-center gap-2'>
                <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="max-h-36 object-contain rounded-lg"/>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{selectedFile.name}</p>
                 <p className="text-sm text-gray-500 dark:text-gray-400">Ready to enhance!</p>
            </div>
        ) : (
            <>
                <UploadIcon />
                <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">Drag & Drop your image here</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">or <span className="text-blue-500 dark:text-blue-400 font-semibold">browse files</span></p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">Supports PNG, JPG, WEBP (Max 4MB)</p>
            </>
        )}
      </div>

       {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      
      <button
        onClick={onEnhance}
        disabled={!selectedFile}
        className="w-full max-w-sm text-lg font-semibold text-white bg-blue-600 rounded-xl py-4 transition-all duration-300 ease-in-out
                   disabled:bg-gray-400 disabled:dark:bg-gray-600 disabled:cursor-not-allowed disabled:shadow-none
                   hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-500/40 transform hover:-translate-y-1"
      >
        Enhance Now
      </button>
    </div>
  );
};

export default Dropzone;
