import {
  Document,
  Page,
  pdf,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { marked } from "marked";
import React from "react";

const renderHtmlToPdf = (html: string) => {
  return html.split("\n").map((line, index) => {
    if (line.startsWith("<h1>"))
      return (
        <Text key={index} style={styles.h1}>
          {line.replace(/<\/?h1>/g, "")}
        </Text>
      );
    if (line.startsWith("<h2>"))
      return (
        <Text key={index} style={styles.h2}>
          {line.replace(/<\/?h2>/g, "")}
        </Text>
      );
    if (line.startsWith("<p>"))
      return (
        <Text key={index} style={styles.p}>
          {line.replace(/<\/?p>/g, "")}
        </Text>
      );
    if (line.startsWith("<strong>"))
      return (
        <Text key={index} style={styles.strong}>
          {line.replace(/<\/?strong>/g, "")}
        </Text>
      );
    if (line.startsWith("<ul>"))
      return (
        <View key={index} style={styles.ul}>
          {line.replace(/<\/?ul>/g, "")}
        </View>
      );
    if (line.startsWith("<li>"))
      return (
        <Text key={index} style={styles.li}>
          {line.replace(/<\/?li>/g, "")}
        </Text>
      );
    if (line.startsWith("<blockquote>"))
      return (
        <Text key={index} style={styles.blockquote}>
          {line.replace(/<\/?blockquote>/g, "")}
        </Text>
      );
    if (line.startsWith("<a "))
      return (
        <Text key={index} style={styles.a}>
          {line.replace(/<\/?a>/g, "")}
        </Text>
      );
    if (line.startsWith("<pre>"))
      return (
        <Text key={index} style={styles.pre}>
          {line.replace(/<\/?pre>/g, "")}
        </Text>
      );
    if (line.startsWith("<code>"))
      return (
        <Text key={index} style={styles.code}>
          {line.replace(/<\/?code>/g, "")}
        </Text>
      );
    if (line.startsWith("<table>"))
      return (
        <View key={index} style={styles.table}>
          {line.replace(/<\/?table>/g, "")}
        </View>
      );
    if (line.startsWith("<tr>"))
      return (
        <View key={index} style={styles.tableRow}>
          {line.replace(/<\/?tr>/g, "")}
        </View>
      );
    if (line.startsWith("<th>"))
      return (
        <Text key={index} style={styles.tableHeaderCell}>
          {line.replace(/<\/?th>/g, "")}
        </Text>
      );
    if (line.startsWith("<td>"))
      return (
        <Text key={index} style={styles.tableCell}>
          {line.replace(/<\/?td>/g, "")}
        </Text>
      );
    if (line.startsWith("<hr>")) return <View key={index} style={styles.hr} />;
    return (
      <Text key={index} style={styles.p}>
        {line}
      </Text>
    );
  });
};

type Props = {
  content: string;
};

const ExportToPdf: React.FC<Props> = ({ content }) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const htmlContent = marked(content);

  const handleExport = async () => {
    setLoading(true);

    try {
      const MyDocument = () => (
        <Document>
          <Page size="A4" style={styles.page}>
            {renderHtmlToPdf(htmlContent as string)}
          </Page>
        </Document>
      );

      const blob = await pdf(<MyDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "document.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleExport} disabled={loading}>
        {loading ? "Generating..." : "Export to PDF"}
      </button>
    </div>
  );
};

export default ExportToPdf;

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Times-Roman",
  },
  div: {
    marginBottom: 12,
  },
  h1: {
    fontSize: 24,
    marginBottom: 12,
  },
  h2: {
    fontSize: 18,
    marginBottom: 12,
  },
  p: {
    marginBottom: 12,
    fontSize: 12,
    textAlign: "justify",
  },
  span: {
    fontSize: 12,
  },
  strong: {
    fontWeight: "bold",
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 12,
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
  },
  tableCell: {
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    padding: 4,
  },
  tableRow: {
    // display: "table-row",
  },
  tableHeaderCell: {
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    padding: 4,
  },
  blockquote: {
    margin: 12,
    paddingLeft: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#ccc",
    fontStyle: "italic",
  },
  a: {
    color: "#0000ff",
    textDecoration: "underline",
  },
  pre: {
    fontFamily: "Courier",
    fontSize: 10,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 4,
  },
  code: {
    fontFamily: "Courier",
    fontSize: 10,
    backgroundColor: "#f5f5f5",
    padding: 2,
    borderRadius: 4,
  },
  hr: {
    borderTopWidth: 1,
    borderTopColor: "#000",
    marginVertical: 12,
  },
  ul: {
    marginBottom: 12,
  },
  ol: {
    marginBottom: 12,
  },
  li: {
    fontSize: 12,
    marginBottom: 4,
  },
});
