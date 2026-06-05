const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const files = [
    { html: 'cv-en.html', pdf: 'Le-Tan-Thinh-English-Tutor-CV-EN.pdf' },
    { html: 'cv-vi.html', pdf: 'Le-Tan-Thinh-English-Tutor-CV-VI.pdf' }
  ];

  for (const file of files) {
    const filePath = `file://${path.resolve(__dirname, file.html)}`;
    console.log('Opening:', filePath);
    await page.goto(filePath, { waitUntil: 'networkidle' });
    
    const pdfPath = path.resolve(__dirname, file.pdf);
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });
    console.log('PDF saved to:', pdfPath);
  }

  await browser.close();
})();
