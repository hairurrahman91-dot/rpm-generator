import React, { useState } from 'react';
import { RPMFormData, ToolboxState } from './types';
import { INITIAL_FORM_DATA } from './constants';
import InputPanel from './components/InputPanel';
import PreviewPanel from './components/PreviewPanel';
import ToolboxModal from './components/ToolboxModal';
import { generateRPMContent, generateToolboxContent } from './services/geminiService';
import { generateWordBlob, downloadBlob, exportToPDF } from './utils/exportUtils';

const App: React.FC = () => {
  const [formData, setFormData] = useState<RPMFormData>(INITIAL_FORM_DATA);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [toolboxState, setToolboxState] = useState<ToolboxState>({
    isOpen: false,
    type: null,
    content: "",
    isLoading: false
  });

  const handleInputChange = (field: keyof RPMFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateRPM = async () => {
    setIsGenerating(true);
    try {
      const content = await generateRPMContent(formData);
      setGeneratedContent(content);
    } catch (error) {
      console.error("Error generating RPM:", error);
      alert("Gagal menghasilkan RPM. Pastikan koneksi internet stabil atau API Key valid.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToolboxClick = async (type: 'icebreaker' | 'quiz' | 'reflection') => {
    setToolboxState({
      isOpen: true,
      type,
      content: "",
      isLoading: true
    });

    try {
      const content = await generateToolboxContent(type, formData);
      setToolboxState(prev => ({ ...prev, content, isLoading: false }));
    } catch (error) {
      console.error("Error toolbox:", error);
      setToolboxState(prev => ({ 
        ...prev, 
        isLoading: false, 
        content: "Maaf, terjadi kesalahan saat menghubungi AI." 
      }));
    }
  };

  const closeToolbox = () => {
    setToolboxState(prev => ({ ...prev, isOpen: false }));
  };

  const downloadRPMWord = () => {
    if (!generatedContent) return;
    const blob = generateWordBlob(generatedContent);
    const filename = `RPM-${formData.subject}-${formData.phaseClass.replace(/\//g, '-')}.doc`;
    downloadBlob(blob, filename);
  };

  const downloadToolboxWord = () => {
    if (!toolboxState.content) return;
    const blob = generateWordBlob(toolboxState.content);
    const filename = `${toolboxState.type}-${formData.subject}.doc`;
    downloadBlob(blob, filename);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full font-sans bg-slate-50 lg:h-screen lg:overflow-hidden">
      <InputPanel 
        data={formData} 
        onChange={handleInputChange} 
        onGenerate={handleGenerateRPM}
        isGenerating={isGenerating}
        onToolboxClick={handleToolboxClick}
      />
      <PreviewPanel 
        content={generatedContent} 
        onDownloadPDF={() => window.print()} 
        onDownloadWord={downloadRPMWord}
      />
      <ToolboxModal 
        state={toolboxState} 
        onClose={closeToolbox} 
        onDownload={downloadToolboxWord}
      />
    </div>
  );
};

export default App;