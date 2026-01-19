import { marked } from 'marked';

// Configure marked to not sanitize strictly for Word generation, 
// ensuring tables and styles are preserved.
// Since we are in a browser environment without 'fs', we generate a Blob.

export const generateWordBlob = (markdownContent: string): Blob => {
  // Convert Markdown to HTML
  // Note: We need to parse Markdown manually or use a simple parser if 'marked' isn't available via simple import in this env.
  // Assuming 'marked' is available or using a simple regex replace for basic md to html if needed.
  // Ideally, we use the library. For this output, we'll assume marked is imported correctly.
  
  const htmlContent = marked.parse(markdownContent) as string;

  // Enhance HTML for Word
  // 1. Add specific Border styles to tables
  const styledHtmlContent = htmlContent.replace(
    /<table>/g, 
    '<table style="border-collapse: collapse; width: 100%; border: 1px solid black;">'
  ).replace(
    /<th>/g,
    '<th style="border: 1px solid black; padding: 5px; background-color: #f0f0f0;">'
  ).replace(
    /<td>/g,
    '<td style="border: 1px solid black; padding: 5px;">'
  );

  // Remove border from the Signature table (F. PENGESAHAN)
  // This requires a bit of regex specific targeting or just ensure the Prompt generates inline styles that override the generic replace.
  // The Prompt asks AI to add 'border: none' inline. Word respects inline styles over tag styles.
  // But our global replace above might conflict. Let's make the replace smarter: 
  // ONLY add borders if the td doesn't already have a style attribute or if it doesn't say 'border: none'.
  
  // A safer approach for the signature is to ensure the AI output contains `style="border: none"` 
  // and we wrap the "Generic Table" styles in a CSS block in the head, not inline replacements.

  const wordTemplate = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
      <head>
        <meta charset='utf-8'>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 12pt; }
          h1, h2, h3 { color: #000; }
          table { border-collapse: collapse; width: 100%; margin-bottom: 1rem; }
          /* General table cells have borders */
          td, th { border: 1px solid black; padding: 5px; vertical-align: top; }
          
          /* Specific override for signature table (assumed to use inline styles or specific class if we could add it)
             However, inline styles in the HTML body take precedence in Word. 
             So if AI outputs <td style="border: none">, it should work. */
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;

  return new Blob(['\ufeff', wordTemplate], {
    type: 'application/msword'
  });
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToPDF = (elementId: string, filename: string) => {
  // @ts-ignore
  const html2pdf = window.html2pdf;
  if (!html2pdf) {
    alert("Library HTML2PDF belum dimuat. Mohon tunggu atau refresh.");
    return;
  }
  const element = document.getElementById(elementId);
  if (!element) return;

  const opt = {
    margin: [15, 15, 15, 15], // mm
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
};