import React from "react";
import { View, Text, Button } from "react-native";
import { questions } from "../data/questions";

export default function ResultScreen({ route, navigation }) {
  const { answers, timeUsed, questionTimes } = route.params;

  let score = 0, correct = 0, wrong = 0, skipped = 0;

  questions.forEach((q, i) => {
    const a = answers[i];

    if (!a) { skipped++; return; }

    const ok = JSON.stringify(a.sort()) === JSON.stringify(q.correct.sort());

    if (ok) { score++; correct++; }
    else wrong++;
  });

  return (
    <View style={{ padding: 20 }}>
      <Text>Score: {score}/{questions.length}</Text>
      <Text>Percentage: {(score / questions.length) * 100}%</Text>

      <Text>Correct: {correct}</Text>
      <Text>Wrong: {wrong}</Text>
      <Text>Skipped: {skipped}</Text>

      <Text>Total Time: {timeUsed}s</Text>
      <Text>Avg Time: {timeUsed / questions.length}s</Text>

      {questions.map((q, i) => {
        const a = answers[i];
        const ok = a && JSON.stringify(a.sort()) === JSON.stringify(q.correct.sort());
        const status = !a ? "Skipped" : ok ? "Correct" : "Wrong";

        return (
          <View key={i} style={{ borderWidth: 1, margin: 5, padding: 5 }}>
            <Text>Q{i + 1} ({q.type})</Text>
            <Text>{status}</Text>
            <Text>{Math.round(questionTimes[i] || 0)}s</Text>
          </View>
        );
      })}

      <Button title="Restart" onPress={() => navigation.replace("MockTest")} />
    </View>
  );
}