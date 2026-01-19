import React from 'react';
import { RPMFormData } from '../types';
import { SUBJECTS, PHASES, SEMESTERS, LEARNING_MODELS } from '../constants';
import { Sparkles, FileText, Brain, Smile } from 'lucide-react';

interface InputPanelProps {
  data: RPMFormData;
  onChange: (field: keyof RPMFormData, value: string | number) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  onToolboxClick: (type: 'icebreaker' | 'quiz' | 'reflection') => void;
}

const InputPanel: React.FC<InputPanelProps> = ({ 
  data, 
  onChange, 
  onGenerate, 
  isGenerating,
  onToolboxClick 
}) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    onChange(name as keyof RPMFormData, type === 'number' ? parseInt(value) : value);
  };

  // Shared classes for inputs to ensure consistent "Light Blue Accent" style
  const inputClasses = "w-full p-2.5 bg-slate-50 border border-blue-200 rounded-lg text-slate-700 text-sm focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400";
  const labelClasses = "text-xs font-semibold text-blue-900 mb-1 block uppercase tracking-wide";

  return (
    <div className="w-full lg:w-[40%] h-auto lg:h-full lg:overflow-y-auto bg-white border-b lg:border-b-0 lg:border-r border-slate-200 p-6 space-y-8 shadow-sm lg:shadow-none z-10 relative">
      
      {/* Header */}
      <div className="space-y-2 border-b border-blue-100 pb-4">
        <h1 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
          <Brain className="w-8 h-8 text-blue-600" />
          RPM Generator
        </h1>
        <p className="text-sm text-slate-500 font-medium">By Hairur Rahman</p>
      </div>

      {/* A. IDENTITAS SEKOLAH */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold tracking-wider text-blue-800 uppercase border-b border-blue-100 pb-2 flex items-center gap-2">
           <span className="bg-blue-100 text-blue-800 py-0.5 px-2 rounded text-[10px]">BAGIAN A</span>
           Identitas Sekolah & Guru
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClasses}>Nama Sekolah</label>
            <input 
              type="text" name="schoolName" value={data.schoolName} onChange={handleChange}
              className={inputClasses}
              placeholder="SDN Contoh 01"
            />
          </div>
          <div>
            <label className={labelClasses}>Tempat Penandatanganan</label>
            <input 
              type="text" name="location" value={data.location} onChange={handleChange}
              className={inputClasses}
              placeholder="Jakarta"
            />
          </div>
          <div>
            <label className={labelClasses}>Nama Kepala Sekolah</label>
            <input 
              type="text" name="principalName" value={data.principalName} onChange={handleChange}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>NIP Kepala Sekolah</label>
            <input 
              type="text" name="principalNip" value={data.principalNip} onChange={handleChange}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Nama Guru</label>
            <input 
              type="text" name="teacherName" value={data.teacherName} onChange={handleChange}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>NIP Guru</label>
            <input 
              type="text" name="teacherNip" value={data.teacherNip} onChange={handleChange}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Tanggal</label>
            <input 
              type="date" name="date" value={data.date} onChange={handleChange}
              className={inputClasses}
            />
          </div>
        </div>
      </section>

      {/* B. IDENTITAS MODUL */}
      <section className="space-y-4">
         <h2 className="text-sm font-bold tracking-wider text-blue-800 uppercase border-b border-blue-100 pb-2 flex items-center gap-2">
           <span className="bg-blue-100 text-blue-800 py-0.5 px-2 rounded text-[10px]">BAGIAN B</span>
           Identitas Modul
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClasses}>Mata Pelajaran</label>
            <select name="subject" value={data.subject} onChange={handleChange} className={inputClasses}>
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Fase / Kelas</label>
            <select name="phaseClass" value={data.phaseClass} onChange={handleChange} className={inputClasses}>
              {PHASES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Semester</label>
            <select name="semester" value={data.semester} onChange={handleChange} className={inputClasses}>
              {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Tahun Pelajaran</label>
            <input 
              type="text" name="academicYear" value={data.academicYear} onChange={handleChange}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Alokasi Waktu</label>
            <input 
              type="text" name="timeAllocation" value={data.timeAllocation} onChange={handleChange}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Jumlah Pertemuan</label>
            <input 
              type="number" name="meetingCount" value={data.meetingCount} onChange={handleChange}
              min={1} max={10}
              className={inputClasses}
            />
          </div>
        </div>
      </section>

      {/* C. KOMPONEN INTI */}
      <section className="space-y-4">
         <h2 className="text-sm font-bold tracking-wider text-blue-800 uppercase border-b border-blue-100 pb-2 flex items-center gap-2">
           <span className="bg-blue-100 text-blue-800 py-0.5 px-2 rounded text-[10px]">BAGIAN C</span>
           Komponen Inti
        </h2>
        <div className="space-y-4">
           <div>
            <label className={labelClasses}>Model Pembelajaran</label>
            <select name="learningModel" value={data.learningModel} onChange={handleChange} className={inputClasses}>
              {LEARNING_MODELS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Tujuan Pembelajaran (TP)</label>
            <textarea 
              name="learningObjective" 
              value={data.learningObjective} 
              onChange={handleChange}
              rows={4}
              className={inputClasses}
              placeholder="Contoh: Peserta didik mampu menjelaskan proses fotosintesis dan mengaitkannya dengan pentingnya menjaga lingkungan."
            ></textarea>
          </div>
        </div>
      </section>

      {/* D. BUTTONS */}
      <div className="pt-4 space-y-4">
        <button 
          onClick={onGenerate}
          disabled={isGenerating || !data.learningObjective}
          className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg shadow-blue-900/20 flex items-center justify-center gap-3 transition-all
            ${isGenerating || !data.learningObjective ? 'bg-slate-300 cursor-not-allowed text-slate-500' : 'bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-900/30 active:scale-[0.98]'}
          `}
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              Sedang Meracik RPM...
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6 text-yellow-300" />
              GENERATE RPM
            </>
          )}
        </button>

        {/* E. TOOLBOX */}
        <div className="grid grid-cols-3 gap-3">
           <button onClick={() => onToolboxClick('icebreaker')} className="group flex flex-col items-center justify-center p-3 border border-blue-100 bg-blue-50/50 rounded-xl hover:bg-blue-100 hover:border-blue-300 transition-all gap-2 text-slate-600 hover:text-blue-900">
             <div className="bg-white p-2 rounded-full shadow-sm group-hover:scale-110 transition-transform">
               <Smile className="w-5 h-5 text-orange-500" />
             </div>
             <span className="text-xs font-semibold text-center">Ice Breaker</span>
           </button>
           <button onClick={() => onToolboxClick('quiz')} className="group flex flex-col items-center justify-center p-3 border border-blue-100 bg-blue-50/50 rounded-xl hover:bg-blue-100 hover:border-blue-300 transition-all gap-2 text-slate-600 hover:text-blue-900">
              <div className="bg-white p-2 rounded-full shadow-sm group-hover:scale-110 transition-transform">
               <Brain className="w-5 h-5 text-purple-500" />
             </div>
             <span className="text-xs font-semibold text-center">Bank Soal</span>
           </button>
           <button onClick={() => onToolboxClick('reflection')} className="group flex flex-col items-center justify-center p-3 border border-blue-100 bg-blue-50/50 rounded-xl hover:bg-blue-100 hover:border-blue-300 transition-all gap-2 text-slate-600 hover:text-blue-900">
              <div className="bg-white p-2 rounded-full shadow-sm group-hover:scale-110 transition-transform">
               <FileText className="w-5 h-5 text-green-500" />
             </div>
             <span className="text-xs font-semibold text-center">Refleksi</span>
           </button>
        </div>
      </div>

    </div>
  );
};

export default InputPanel;