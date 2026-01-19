import { GoogleGenAI } from "@google/genai";
import { RPMFormData } from "../types";

const getAIClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateRPMContent = async (data: RPMFormData): Promise<string> => {
  const ai = getAIClient();
  
  const systemPrompt = `
    Anda adalah pakar kurikulum dan instruktur pendidikan yang ahli dalam menyusun "Rencana Pembelajaran Mendalam (RPM)".

    Data Input:
    - Sekolah: ${data.schoolName}
    - Kepala Sekolah: ${data.principalName} (NIP: ${data.principalNip})
    - Guru: ${data.teacherName} (NIP: ${data.teacherNip})
    - Lokasi & Tgl: ${data.location}, ${data.date}
    - Mapel: ${data.subject}
    - Kelas: ${data.phaseClass}
    - Semester: ${data.semester}
    - Tahun: ${data.academicYear}
    - Waktu: ${data.timeAllocation}
    - Jml Pertemuan: ${data.meetingCount}
    - TP: ${data.learningObjective}
    - Model: ${data.learningModel}

    INSTRUKSI UTAMA:
    1. Gunakan format Markdown standar.
    2. BERPIKIRLAH SECARA KRITIS: Sebelum menjawab, analisis karakteristik siswa dan mapel secara mendalam. Jangan memberikan jawaban umum/klise.
    3. Pada "Kegiatan Inti", narasi harus **SANGAT TERPERINCI** dan langkah demi langkah.
    4. **INTEGRASI MODEL PEMBELAJARAN**: Sintaks/langkah-langkah dari model pembelajaran **${data.learningModel}** harus diaplikasikan secara keseluruhan dan melebur ke dalam tahap **Memahami**, **Mengaplikasikan**, dan **Merefleksi**.
    5. **PRINSIP**: AI harus memilih SATU prinsip yang paling relevan (Berkesadaran / Bermakna / Menggembirakan) untuk setiap tahap.
    6. **DURASI WAKTU**: JANGAN tuliskan durasi waktu (misal: 10 menit, 15%) pada judul kegiatan Awal, Inti, maupun Penutup.
    7. Pada bagian Lampiran LKPD, **WAJIB** buatkan LKPD yang berbeda untuk **SETIAP** pertemuan (Looping LKPD).

    --- FORMAT OUTPUT MARKDOWN ---

    # RENCANA PEMBELAJARAN MENDALAM (RPM)

    ## A. IDENTITAS MODUL
    | Komponen | Keterangan |
    | :--- | :--- |
    | Nama Penyusun | ${data.teacherName} |
    | Nama Sekolah | ${data.schoolName} |
    | Mata Pelajaran | ${data.subject} |
    | Fase / Kelas | ${data.phaseClass} |
    | Semester | ${data.semester} |
    | Tahun Pelajaran | ${data.academicYear} |
    | Alokasi Waktu | ${data.timeAllocation} |
    | Jumlah Pertemuan | ${data.meetingCount} Kali Pertemuan |
    | Topik | (Tentukan topik menarik relevan dengan TP) |

    ## B. IDENTIFIKASI
    1. **Identifikasi Peserta Didik**: (Jelaskan karakteristik siswa usia ${data.phaseClass} dan gaya belajar mereka secara singkat).
    2. **Dimensi Profil Lulusan (DPL)**: (Pilih 2-3 dimensi yang paling relevan dari daftar berikut: Keimanan & Ketakwaan, Kewargaan, Penalaran Kritis, Kreativitas, Kolaborasi, Kemandirian, Kesehatan, Komunikasi).

    ## C. DESAIN PEMBELAJARAN
    | Komponen | Deskripsi |
    | :--- | :--- |
    | Tujuan Pembelajaran | ${data.learningObjective} |
    | Kriteria Ketercapaian TP | (Sebutkan 3-4 indikator keberhasilan spesifik) |
    | Praktik Pedagogis | Model: ${data.learningModel}<br>Metode: (Diskusi/Demonstrasi/Eksperimen/dll) |
    | Kemitraan Pembelajaran | (Pelibatan Orang Tua/Komunitas/Ahli) |
    | Lingkungan Pembelajaran | (Setting kelas/Luar kelas/Perpustakaan) |
    | Pemanfaatan Digital | (Platform/Media digital yang digunakan) |

    ## D. PENGALAMAN BELAJAR
    (Ulangi blok di bawah ini untuk Pertemuan 1 sampai Pertemuan ${data.meetingCount}. Pastikan kegiatannya berkesinambungan).

    ### PERTEMUAN KE-[X] : (Judul Sub-Materi)
    **1. Kegiatan Awal**
    * (Narasi detail guru membuka kelas, salam, dan doa).
    * **Apersepsi**: (Jelaskan skenario apersepsi yang menarik minat siswa).
    * **Pertanyaan Pemantik**: (Tuliskan pertanyaan spesifik).
    * *Prinsip: (Pilih SATU saja: Berkesadaran / Bermakna / Menggembirakan)*

    **2. Kegiatan Inti (Deep Learning)**
    * **Memahami**
        * (Integrasikan sintaks awal model ${data.learningModel} di sini).
        * (Deskripsikan aktivitas siswa membangun pemahaman konsep secara mendalam dan terperinci).
        * *Prinsip: (Pilih SATU saja: Berkesadaran / Bermakna / Menggembirakan)*
    * **Mengaplikasikan**
        * (Integrasikan sintaks inti model ${data.learningModel} di sini secara dominan).
        * (Deskripsikan aktivitas siswa menerapkan konsep/memecahkan masalah/membuat projek sesuai model).
        * (Sebutkan produk/karya konkret yang dihasilkan siswa).
        * *Prinsip: (Pilih SATU saja: Berkesadaran / Bermakna / Menggembirakan)*
    * **Merefleksi**
        * (Integrasikan sintaks penutup/evaluasi model ${data.learningModel} di sini).
        * (Deskripsikan momen siswa melihat kembali proses belajarnya dan menyimpulkan).
        * *Prinsip: (Pilih SATU saja: Berkesadaran / Bermakna / Menggembirakan)*

    **3. Kegiatan Penutup**
    * (Narasi siswa menyimpulkan, guru memberi penguatan positif, info materi berikutnya, dan doa).

    --- (Akhir Loop Pertemuan) ---

    ## E. ASESMEN
    | Jenis | Teknik & Instrumen |
    | :--- | :--- |
    | Asesmen Awal | (Misal: Tanya jawab, Kuis singkat) |
    | Asesmen Formatif | (Misal: Observasi diskusi, LKPD, Jurnal diri) |
    | Asesmen Sumatif | (Misal: Tes tertulis, Produk akhir) |

    ## F. PENGESAHAN
    <table border="0" width="100%" style="margin-top: 30px; border: none; font-family: 'Times New Roman';">
      <tr>
        <td width="50%" align="center" style="border: none; vertical-align: top;">
          Mengetahui,<br>Kepala Sekolah<br><br><br><br>
          <strong>${data.principalName}</strong><br>NIP. ${data.principalNip}
        </td>
        <td width="50%" align="center" style="border: none; vertical-align: top;">
          ${data.location}, ${data.date}<br>Guru Kelas<br><br><br><br>
          <strong>${data.teacherName}</strong><br>NIP. ${data.teacherNip}
        </td>
      </tr>
    </table>

    ## G. LAMPIRAN
    
    ### 1. LEMBAR KERJA PESERTA DIDIK (LKPD)
    (INSTRUKSI KHUSUS AI: Buatkan ${data.meetingCount} LKPD yang berbeda sesuai alur pertemuan di atas. Gunakan format di bawah ini untuk setiap pertemuan).

    **LKPD PERTEMUAN 1**
    * **Judul Aktivitas**: ...
    * **Nama Kelompok/Siswa**: ...........................
    * **Petunjuk Kerja**: (Langkah-langkah detail).
    * **Soal/Isian**: (Buatkan soal atau kotak isian yang relevan).

    **(Jika ada Pertemuan 2, buatkan: LKPD PERTEMUAN 2 dengan format sama, dst...)**

    ### 2. MATERI AJAR PENDUKUNG
    (Ringkasan materi esensial 2-3 paragraf).

    ### 3. RUBRIK PENILAIAN
    Buatkan 3 tabel rubrik penilaian sebagai berikut:
    
    **A. Penilaian Sikap**
    Buatkan tabel dengan kolom: **Dimensi Profil Lulusan**, **Kurang**, **Cukup**, **Baik**, **Sangat Baik**.
    Isi baris pada kolom "Dimensi Profil Lulusan" **HANYA** dengan nama Dimensi yang dipilih pada Bagian B (Identifikasi) di atas.
    (Isi sel pada kolom Kurang/Cukup/Baik/Sangat Baik dengan deskripsi perilaku singkat).

    **B. Penilaian Pengetahuan**
    (Buatkan tabel indikator pemahaman materi).

    **C. Penilaian Keterampilan (Opsional)**
    (Jika relevan, buatkan tabel penilaian unjuk kerja/produk. Jika tidak, tulis "Tidak ada penilaian keterampilan khusus").
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-flash-latest',
    contents: systemPrompt,
  });

  return response.text;
};

export const generateToolboxContent = async (
  type: 'icebreaker' | 'quiz' | 'reflection',
  data: RPMFormData
): Promise<string> => {
  const ai = getAIClient();
  
  let prompt = "";
  if (type === 'icebreaker') {
    prompt = `Buatkan 3 ide Ice Breaker seru untuk kelas ${data.phaseClass} mata pelajaran ${data.subject} dengan topik yang relevan dengan TP: "${data.learningObjective}". Format output: Judul, Durasi, Cara Main.`;
  } else if (type === 'quiz') {
    prompt = `Buatkan Bank Soal Kuis (5 soal Pilihan Ganda dan 3 Soal Uraian) untuk kelas ${data.phaseClass}, mapel ${data.subject}, TP: "${data.learningObjective}". Sertakan kunci jawaban.`;
  } else if (type === 'reflection') {
    prompt = `Buatkan Lembar Refleksi Siswa yang menarik (menggunakan emoji jika perlu) untuk kelas ${data.phaseClass} setelah mempelajari TP: "${data.learningObjective}". Sertakan 5 pertanyaan reflektif sederhana.`;
  }

  const response = await ai.models.generateContent({
    model: 'gemini-flash-latest',
    contents: prompt,
  });

  return response.text;
};