import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X, Download, Loader2 } from 'lucide-react';
import { ToolboxState } from '../types';

interface ToolboxModalProps {
  state: ToolboxState;
  onClose: () => void;
  onDownload: () => void;
}

const ToolboxModal: React.FC<ToolboxModalProps> = ({ state, onClose, onDownload }) => {
  if (!state.isOpen) return null;

  const titles = {
    'icebreaker': 'Ide Ice Breaker',
    'quiz': 'Bank Soal Kuis',
    'reflection': 'Lembar Refleksi'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-bold text-lg text-blue-900">
            {state.type ? titles[state.type] : 'Toolbox'}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {state.isLoading ? (
            <div className="flex flex-col items-center justify-center h-40 gap-3 text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <p>Sedang meminta bantuan AI...</p>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none prose-headings:text-blue-900">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {state.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-3 bg-white rounded-b-xl">
           <button 
            onClick={onClose}
            className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded"
          >
            Tutup
          </button>
          <button 
            onClick={onDownload}
            disabled={state.isLoading || !state.content}
            className="flex items-center gap-2 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded font-medium disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Unduh Word (.docx)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolboxModal;