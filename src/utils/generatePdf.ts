import puppeteer from "puppeteer";

export const generatePdfFromHtml = async (
  htmlContent: string
): Promise<Buffer> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(`
    <html>
      <head>
        <style>
          body { font-family: Rubik, sans-serif; color: #333; }
          h1 { color: #1a73e8; }
          p { line-height: 1.6; }
          /* Add more styles as needed */
        </style>
      </head>
      <body>${htmlContent}</body>
    </html>
  `);

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();
  return Buffer.from(pdfBuffer);
};
