
import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { type Theme, type View } from './types';
import SideMenu from './components/SideMenu';
import Header from './components/Header';
import Dropzone from './components/Dropzone';
import Loader from './components/Loader';
import ResultView from './components/ResultView';
import History from './components/History';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>('HOME');

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        const mimeType = result.split(',')[0].split(':')[1].split(';')[0];
        resolve({ base64, mimeType });
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleEnhance = useCallback(async () => {
    if (!originalImage) return;

    setIsLoading(true);
    setError(null);
    setEnhancedImage(null);

    try {
      const { base64, mimeType } = await fileToBase64(originalImage);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      
      const prompt = `Upscale this image to 4 times its original resolution. Enhance its quality significantly by sharpening details, removing pixelation and compression artifacts, and smoothing edges for a clean, crisp look. Make the colors more vibrant and rich, but stay true to the original color scheme. The final result should be ultra-high-definition, similar to a 4K image or a vector graphic.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64,
                mimeType: mimeType,
              },
            },
            { text: prompt },
          ],
        },
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });

      const imagePart = response.candidates?.[0]?.content.parts.find(part => part.inlineData);
      if (imagePart?.inlineData) {
        const enhancedBase64 = imagePart.inlineData.data;
        const enhancedMimeType = imagePart.inlineData.mimeType;
        setEnhancedImage(`data:${enhancedMimeType};base64,${enhancedBase64}`);
      } else {
        throw new Error("AI could not generate an enhanced image.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to enhance the image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);

  const handleFileSelect = useCallback((file: File | null) => {
    if (file) {
      if(file.size > 4 * 1024 * 1024) {
        setError("File size should be less than 4MB.");
        setOriginalImage(null);
        return;
      }
      setError(null);
      setOriginalImage(file);
      setEnhancedImage(null);
    }
  }, []);

  const handleReset = useCallback(() => {
    setOriginalImage(null);
    setEnhancedImage(null);
    setError(null);
    setIsLoading(false);
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'HOME':
        return (
          <div className="w-full max-w-2xl mx-auto">
            {isLoading ? (
              <Loader />
            ) : enhancedImage && originalImage ? (
              <ResultView 
                originalImage={URL.createObjectURL(originalImage)} 
                enhancedImage={enhancedImage} 
                onReset={handleReset} 
              />
            ) : (
              <Dropzone 
                onFileSelect={handleFileSelect} 
                onEnhance={handleEnhance}
                selectedFile={originalImage}
                error={error}
              />
            )}
          </div>
        );
      case 'HISTORY':
        return <History />;
      case 'SETTINGS':
        return <Settings theme={theme} toggleTheme={toggleTheme} />;
      default:
        return null;
    }
  };

  return (
    <div className={`${theme} transition-colors duration-500`}>
      <main className="flex h-screen w-full bg-gray-100 dark:bg-[#0a0a0f] text-gray-800 dark:text-gray-200 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-transparent dark:from-purple-900/50 dark:via-blue-900/50 dark:to-black animate-background-pan"></div>
        <SideMenu currentView={view} onNavigate={setView} />
        <div className="flex flex-1 flex-col relative z-10">
          <Header theme={theme} toggleTheme={toggleTheme} onNavigate={setView} />
          <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
