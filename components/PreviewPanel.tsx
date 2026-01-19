import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Download, FileDown, FileText } from 'lucide-react';

interface PreviewPanelProps {
  content: string;
  onDownloadPDF: () => void;
  onDownloadWord: () => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ content, onDownloadPDF, onDownloadWord }) => {
  return (
    <div className="w-full lg:w-[60%] h-auto lg:h-full bg-slate-100 flex flex-col border-l border-slate-200">
      {/* Toolbar - Sticky on top for mobile, static for desktop */}
      <div className="sticky top-0 lg:static h-16 bg-white flex items-center justify-between px-4 lg:px-6 border-b border-slate-200 shadow-sm z-20">
        <div className="text-slate-800 font-bold flex items-center gap-2 text-base lg:text-lg">
          <div className="bg-blue-100 p-1.5 rounded-lg">
            <FileText className="w-5 h-5 text-blue-700" />
          </div>
          <span className="hidden sm:inline">Preview Dokumen</span>
          <span className="sm:hidden">Preview</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onDownloadPDF}
            className="flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-white border border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 rounded-lg text-xs lg:text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            disabled={!content}
          >
            <FileDown className="w-4 h-4" />
            <span className="hidden sm:inline">PDF</span>
          </button>
          <button 
             onClick={onDownloadWord}
             className="flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs lg:text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
             disabled={!content}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Word</span>
          </button>
        </div>
      </div>

      {/* Paper Preview */}
      <div className="flex-1 lg:overflow-y-auto p-4 lg:p-8 flex justify-center bg-slate-100/50 min-h-[500px] lg:min-h-0">
        {content ? (
          <div id="document-preview" className="bg-white w-full max-w-[210mm] min-h-[297mm] shadow-[0_0_40px_rgba(0,0,0,0.08)] border border-slate-200 p-6 lg:p-[20mm] text-black">
             {/* 
                We use ReactMarkdown to render the AI output. 
                Explicit styling for tables to ensure they look like a document.
             */}
             <div className="prose max-w-none text-black">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  // Pass-through for div (needed for signature table wrapper if used)
                  div: ({node, ...props}) => <div {...props} />,
                  
                  // Strict Table Styling for Preview
                  table: ({node, ...props}) => (
                    <table style={{
                      borderCollapse: 'collapse', 
                      width: '100%', 
                      marginBottom: '1.5rem', 
                      marginTop: '1rem',
                      fontSize: '0.95rem'
                    }} {...props} />
                  ),
                  thead: ({node, ...props}) => <thead style={{backgroundColor: '#f8fafc'}} {...props} />,
                  tbody: ({node, ...props}) => <tbody {...props} />,
                  tr: ({node, ...props}) => <tr {...props} />,
                  
                  // Table Header: Bold, Gray Background, Black Border
                  th: ({node, ...props}) => (
                    <th style={{
                      border: '1px solid black', 
                      padding: '8px', 
                      backgroundColor: '#e2e8f0', 
                      fontWeight: 'bold',
                      textAlign: 'left',
                      color: 'black'
                    }} {...props} />
                  ),
                  
                  // Table Data: Black Border, Padding
                  td: ({node, ...props}) => (
                    <td style={{
                      border: '1px solid black', 
                      padding: '8px', 
                      verticalAlign: 'top',
                      color: 'black'
                    }} {...props} />
                  ),

                  // Standard Text Styling
                  h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 uppercase text-center border-b-2 border-black pb-2" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-6 mb-3 uppercase text-blue-900 border-b border-gray-300 pb-1" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-4 mb-2 text-black" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-1" {...props} />,
                  p: ({node, ...props}) => <p className="mb-3 leading-relaxed text-justify" {...props} />,
                }}
              >
                {content}
              </ReactMarkdown>
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 gap-4 mt-20">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100">
              <FileText className="w-10 h-10 text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">Isi data di sebelah kiri lalu klik Generate</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;