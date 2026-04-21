import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function QuestionCard({ question, selected, setSelected }) {
  const toggle = (i) => {
    if (question.type === "MCQ") {
      setSelected([i]);
    } else {
      if (selected.includes(i)) {
        setSelected(selected.filter(x => x !== i));
      } else {
        setSelected([...selected, i]);
      }
    }
  };

  return (
    <View>
      <Text>{question.type} - {question.subject}</Text>
      <Text>{question.question}</Text>

      {question.options.map((opt, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => toggle(i)}
          style={{
            flexDirection: "row",
            padding: 10,
            margin: 5,
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: selected.includes(i) ? "#add8e6" : "white"
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              marginRight: 10,
              borderWidth: 2,
              borderRadius: question.type === "MCQ" ? 10 : 3,
              backgroundColor: selected.includes(i) ? "blue" : "white"
            }}
          />
          <Text>{opt}</Text>
        </TouchableOpacity>
      ))}

      {question.type === "MSQ" && <Text>Select all correct options</Text>}
    </View>
  );
}
