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
          body { font-family: Rubik, sans-serif;
            color: #4A4A4A;
            padding: 2.5rem; /* 10 * 0.25rem */
            margin-left: auto;
            margin-right: auto;
          }
          h1 {
            font-weight: bold;
            font-size: 44px;
            text-align: center;
            line-height: 1.2;
            letter-spacing: -0.5px;
            color: #8B5FBF;
            padding-top: 2.5rem;
            margin-bottom: 1.5rem; /* mb-6 */
          }

          h2 {
            font-weight: bold;
            font-size: 30px;
            line-height: 1.2;
            letter-spacing: -0.5px;
            color: #8B5FBF;
            padding-top: 2.5rem;
            margin-bottom: 1.5rem; /* mb-6 */
          }

          h3 {
            font-weight: bold;
            font-size: 1.5rem; /* text-2xl */
            line-height: 1.2;
            letter-spacing: -0.5px;
            color: #8B5FBF;
            padding-top: 2.5rem;
            margin-bottom: 1.5rem; /* mb-6 */
          }

          h4 {
            font-size: 1.25rem; /* text-xl */
            font-weight: 500; /* font-medium */
            color: #8B5FBF;
            padding-top: 1.5rem;
            margin-bottom: 1rem; /* mb-4 */
          }

          h5,
          h6 {
            font-size: 1.125rem; /* text-lg */
            font-weight: 500; /* font-medium */
            color: #8B5FBF;
            padding-top: 1.5rem;
            margin-bottom: 1rem; /* mb-4 */
          }

          p {
            font-size: 1.125rem; /* 18px */
            padding-bottom: 0.5rem; /* pb-2 */
          }

          ul {
            list-style-type: disc;
            padding-left: 1.5rem; /* pl-6 */
            display: flex;
            flex-direction: column;
            gap: 0.375rem; /* gap-1.5 */
            margin-bottom: 1rem; /* mb-4 */
            font-size: 1.125rem; /* 18px */
          }

          ol {
            list-style-type: decimal;
            padding-left: 1.5rem; /* pl-6 */
            display: flex;
            flex-direction: column;
            gap: 0.375rem; /* gap-1.5 */
            margin-bottom: 1rem; /* mb-4 */
            font-size: 1.125rem; /* 18px */
          }

          li {
            font-size: 1.125rem; /* 18px */
            padding-bottom: 0.5rem; /* pb-2 */
          }

          blockquote {
            border-left-width: 4px;
            border-left-color: #8B5FBF;
            padding-left: 1rem;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }

          table th {
            font-size: 1.25rem; /* text-xl */
            color: #8B5FBF;
            font-weight: 500; /* font-medium */
          }

          table td {
            font-size: 1.125rem; /* 18px */
            color: #878787; /* hsl(0, 0%, 52.94%) */
          }

          a {
            font-size: 1.125rem; /* 18px */
            text-decoration: underline;
            color: #8B5FBF;
          }

          pre {
            font-size: 1rem; /* 16px */
            background-color: #e6dded !important;
            padding: 1rem; /* p-4 */
            border-radius: 0.375rem; /* rounded-md */
            font-weight: 500; /* font-medium */
            margin-top: 0.75rem; /* my-3 */
            margin-bottom: 0.75rem; /* my-3 */
          }

          pre > code {
            font-weight: 500; /* font-medium */
            letter-spacing: 0.05em; /* tracking-wider */
          }

          code {
            background-color: #e6dded !important;
            color: #878787; /* hsl(0, 0%, 52.94%) (assuming --text-200 refers to this value) */
            font-weight: 500; /* font-medium */
            padding: 0.25rem; /* p-1 */
            border-radius: 0.375rem; /* rounded-md */
          }

          table {
            width: 100%;
            table-layout: auto;
          }

          img {
            width: 100%;
          }

          hr {
            border-top-width: 1px;
            border-top-color: #dcdcdc; /* hsl(217.5, 12.12%, 87.06%) */
            margin: 1rem 0;
          }

          strong {
            font-size: 1.125rem; /* 18px */
            font-weight: bold;
          }

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
