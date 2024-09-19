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
            color: #6b48b7; /* hsl(267.5, 42.86%, 56.08%) */
            margin-bottom: 1.5rem; /* mb-6 */
          }

          h2 {
            font-weight: bold;
            font-size: 30px;
            line-height: 1.2;
            letter-spacing: -0.5px;
            color: #6b48b7; /* hsl(267.5, 42.86%, 56.08%) */
            margin-bottom: 1.5rem; /* mb-6 */
          }

          h3 {
            font-weight: bold;
            font-size: 1.5rem; /* text-2xl */
            line-height: 1.2;
            letter-spacing: -0.5px;
            color: #6b48b7; /* hsl(267.5, 42.86%, 56.08%) */
            margin-bottom: 1.5rem; /* mb-6 */
          }

          h4 {
            font-size: 1.25rem; /* text-xl */
            font-weight: 500; /* font-medium */
            color: #6b48b7; /* hsl(267.5, 42.86%, 56.08%) */
            margin-bottom: 1rem; /* mb-4 */
          }

          h5,
          h6 {
            font-size: 1.125rem; /* text-lg */
            font-weight: 500; /* font-medium */
            color: #6b48b7; /* hsl(267.5, 42.86%, 56.08%) */
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
          }

          ol {
            list-style-type: decimal;
            padding-left: 1.5rem; /* pl-6 */
            display: flex;
            flex-direction: column;
            gap: 0.375rem; /* gap-1.5 */
            margin-bottom: 1rem; /* mb-4 */
          }

          li {
            font-size: 1.125rem; /* 18px */
            padding-bottom: 0.5rem; /* pb-2 */
          }

          blockquote {
            border-left-width: 4px;
            border-left-color: #462f79; /* hsl(267.91, 43%, 39.22%) */
            padding-left: 1rem;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }

          table th {
            font-size: 1.25rem; /* text-xl */
            color: #462f79; /* hsl(267.91, 43%, 39.22%) */
            font-weight: 500; /* font-medium */
          }

          table td {
            font-size: 1.125rem; /* 18px */
            color: #878787; /* hsl(0, 0%, 52.94%) */
          }

          a {
            font-size: 1.125rem; /* 18px */
            text-decoration: underline;
            color: #6b48b7; /* hsl(267.5, 42.86%, 56.08%) */
          }

          pre {
            font-size: 1.125rem; /* 18px */
            background-color: #ffffff; /* hsl(0, 0%, 100%) */
            padding: 1rem;
            border-radius: 0.5rem;
          }

          code {
            font-size: 1.125rem; /* 18px */
            background-color: #4a4a4a; /* hsl(0, 0%, 29.02%) */
            color: #878787; /* hsl(0, 0%, 52.94%) */
            padding: 0.25rem;
            border-radius: 0.125rem;
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
