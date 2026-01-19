import { RPMFormData } from './types';

export const SUBJECTS = [
  "Pendidikan Agama Islam",
  "Pendidikan Pancasila",
  "Bahasa Indonesia",
  "Matematika",
  "IPAS",
  "Seni Rupa",
  "Seni Musik",
  "Seni Tari",
  "PJOK",
  "Bahasa Inggris",
  "Bahasa Madura"
];

export const PHASES = [
  "Fase A / Kelas 1",
  "Fase A / Kelas 2",
  "Fase B / Kelas 3",
  "Fase B / Kelas 4",
  "Fase C / Kelas 5",
  "Fase C / Kelas 6"
];

export const SEMESTERS = ["Ganjil", "Genap"];

export const LEARNING_MODELS = [
  "Project Based Learning (PjBL)",
  "Problem Based Learning (PBL)",
  "Discovery Learning",
  "Game Based Learning (Gamifikasi)",
  "Inquiry Learning"
];

export const INITIAL_FORM_DATA: RPMFormData = {
  schoolName: "",
  principalName: "",
  principalNip: "",
  teacherName: "",
  teacherNip: "",
  date: new Date().toISOString().split('T')[0],
  location: "",
  subject: "Bahasa Indonesia",
  phaseClass: "Fase A / Kelas 1",
  semester: "Ganjil",
  academicYear: "2025/2026",
  timeAllocation: "4 x 35 Menit",
  meetingCount: 2,
  learningObjective: "",
  learningModel: "Problem Based Learning (PBL)"
};