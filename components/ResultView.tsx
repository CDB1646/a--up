
import React, { useState } from 'react';

interface ResultViewProps {
  originalImage: string;
  enhancedImage: string;
  onReset: () => void;
}

const ImageContainer: React.FC<{ src: string; label: string; isEnhanced?: boolean }> = ({ src, label, isEnhanced = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="flex-1 flex flex-col items-center p-4 bg-white/5 dark:bg-black/20 rounded-2xl backdrop-blur-sm border border-white/10">
      <h3 className="text-lg font-semibold mb-3">{label}</h3>
      <div className="w-full aspect-square flex items-center justify-center">
        <img
          src={src}
          alt={label}
          onLoad={() => setIsLoaded(true)}
          className={`max-w-full max-h-full object-contain rounded-lg transition-all duration-1000 ease-out 
            ${isEnhanced ? (isLoaded ? 'blur-0' : 'blur-xl') : ''}
          `}
        />
      </div>
    </div>
  );
};

const ResultView: React.FC<ResultViewProps> = ({ originalImage, enhancedImage, onReset }) => {
  return (
    <div className="w-full flex flex-col items-center space-y-6 opacity-0 fade-in">
      <div className="w-full flex flex-col md:flex-row gap-6">
        <ImageContainer src={originalImage} label="Original" />
        <ImageContainer src={enhancedImage} label="Enhanced" isEnhanced />
      </div>
      <div className="flex items-center gap-4">
        <a
          href={enhancedImage}
          download="enhanced-image.png"
          className="px-6 py-3 text-base font-semibold text-white bg-green-600 rounded-xl transition-all duration-300 ease-in-out
                     hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-0.5"
        >
          Download
        </a>
        <button
          onClick={onReset}
          className="px-6 py-3 text-base font-semibold text-gray-800 dark:text-gray-200 bg-white/20 dark:bg-white/10 rounded-xl transition-colors duration-300
                     hover:bg-white/30 dark:hover:bg-white/20"
        >
          Enhance Another Image
        </button>
      </div>
    </div>
  );
};

export default ResultView;
