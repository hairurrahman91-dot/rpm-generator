export interface RPMFormData {
  schoolName: string;
  principalName: string;
  principalNip: string;
  teacherName: string;
  teacherNip: string;
  date: string;
  location: string;
  subject: string;
  phaseClass: string;
  semester: string;
  academicYear: string;
  timeAllocation: string;
  meetingCount: number;
  learningObjective: string;
  learningModel: string;
}

export enum RPMSection {
  IDENTITY = 'A. IDENTITAS MODUL',
  IDENTIFICATION = 'B. IDENTIFIKASI',
  DESIGN = 'C. DESAIN PEMBELAJARAN',
  EXPERIENCE = 'D. PENGALAMAN BELAJAR',
  ASSESSMENT = 'E. ASESMEN',
  VALIDATION = 'F. PENGESAHAN',
  APPENDICES = 'G. LAMPIRAN'
}

export interface ToolboxState {
  isOpen: boolean;
  type: 'icebreaker' | 'quiz' | 'reflection' | null;
  content: string;
  isLoading: boolean;
}