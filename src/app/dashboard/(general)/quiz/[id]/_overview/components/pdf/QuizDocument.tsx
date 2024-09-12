import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import { Quiz } from "@/types";

const styles = StyleSheet.create({
  section: {
    padding: 10,
    flexGrow: 1,
  },
  headingPrimary: {
    fontSize: 32,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#8B5FBF",
  },
  headingSecondary: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
    fontWeight: "bold",
    color: "#8B5FBF",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  listElement: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  listElementContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  listElementNumberContainer: {
    fontWeight: "bold",
    color: "#8B5FBF",
    fontSize: 16,
    border: "2px solid #8B5FBF",
    borderRadius: "100%",
    width: 32,
    height: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  choiceNumberContainer: {
    fontWeight: "bold",
    color: "#8B5FBF",
    fontSize: 14,
    borderRadius: "100%",
    width: 24,
    height: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  choiceNumberContainerActive: {
    backgroundColor: "#40c057",
    color: "#fff",
  },
});

type Props = {
  quiz: Quiz;
};

const QuizDocument: React.FC<Props> = ({ quiz }) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          fontFamily: "Rubik",
          flexDirection: "column",
          gap: 24,
          color: "#292929",
          paddingHorizontal: 24,
          flex: 1,
        }}
      >
        <Text style={styles.headingPrimary}>{quiz.title}</Text>
        {quiz?.mcqs?.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.headingSecondary}>MCQs</Text>
            <View style={styles.listContainer}>
              {quiz.mcqs.map((mcq, index) => (
                <View key={index} style={styles.listElementContainer}>
                  <View style={styles.listElement}>
                    <View style={styles.listElementNumberContainer}>
                      <Text>{index + 1}</Text>
                    </View>
                    <Text style={{ lineHeight: 1.5 }}>{mcq.question}</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      marginLeft: 36,
                    }}
                  >
                    {mcq.choices.map((choice, index) => (
                      <View key={index} style={styles.listElement}>
                        <View
                          style={{
                            ...styles.choiceNumberContainer,
                            ...(mcq.answers[index]
                              ? styles.choiceNumberContainerActive
                              : {}),
                          }}
                        >
                          <Text>{choices(index)}</Text>
                        </View>
                        <Text style={{ lineHeight: 1.6 }}>{choice}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {quiz?.cqs?.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.headingSecondary}>CQs</Text>
            <View style={styles.listContainer}>
              {quiz.cqs.map((cq, index) => (
                <View key={index} style={styles.listElementContainer}>
                  <View style={styles.listElement}>
                    <View style={styles.listElementNumberContainer}>
                      <Text>{index + 1}</Text>
                    </View>
                    <Text style={{ lineHeight: 1.5 }}>{cq.question}</Text>
                  </View>

                  <View
                    style={{
                      ...styles.listElement,
                      marginLeft: 36,
                      alignItems: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        ...styles.choiceNumberContainer,
                        ...styles.choiceNumberContainerActive,
                      }}
                    >
                      <Text>A</Text>
                    </View>
                    <Text style={{ lineHeight: 1.6 }}>{cq.answer}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </Page>
    </Document>
  );
};

Font.register({
  family: "Rubik",
  fonts: [
    { src: "/fonts/rubik/Rubik-Regular.ttf" },
    {
      src: "/fonts/rubik/Rubik-Medium.ttf",
      fontWeight: "medium",
    },
    {
      src: "/fonts/rubik/Rubik-SemiBold.ttf",
      fontWeight: "semibold",
    },
    {
      src: "/fonts/rubik/Rubik-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

export default QuizDocument;

const choices = (index: number) => {
  return String.fromCharCode("a".charCodeAt(0) + index).toUpperCase();
};
