import React, { useState, useRef } from "react";
import { View, Text, Button, TouchableOpacity, Alert } from "react-native";
import { questions } from "../data/questions";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";

export default function MockTestScreen({ navigation }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(600);

  const startRef = useRef(Date.now());
  const times = useRef({});

  const record = () => {
    const now = Date.now();
    const t = (now - startRef.current) / 1000;
    times.current[current] = (times.current[current] || 0) + t;
    startRef.current = now;
  };

  const setSelected = (sel) => {
    setAnswers({ ...answers, [current]: sel });
  };

  const next = () => { record(); setCurrent(c => c + 1); };
  const prev = () => { record(); setCurrent(c => c - 1); };

  const submit = () => {
    const unanswered = questions.filter((_, i) => !answers[i]);

    if (unanswered.length > 0) {
      Alert.alert("Unanswered", "Submit anyway?", [
        { text: "Cancel" },
        { text: "Submit", onPress: go }
      ]);
    } else go();
  };

  const go = () => {
    record();
    navigation.navigate("Result", {
      answers,
      timeUsed: 600 - time,
      questionTimes: times.current
    });
  };

  const status = (i) => {
    if (i === current) return "blue";
    if (answers[i]) return "green";
    return "gray";
  };

  return (
    <View style={{ padding: 20 }}>
      <Timer time={time} setTime={setTime} onFinish={submit} />

      <Text>Q {current + 1} / {questions.length}</Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {questions.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setCurrent(i)}
            style={{
              width: 35,
              height: 35,
              margin: 5,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: status(i)
            }}
          >
            <Text style={{ color: "white" }}>{i + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <QuestionCard
        question={questions[current]}
        selected={answers[current] || []}
        setSelected={setSelected}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {current > 0 && <Button title="Prev" onPress={prev} />}
        {current < questions.length - 1 && <Button title="Next" onPress={next} />}
        {current === questions.length - 1 && <Button title="Submit" onPress={submit} />}
      </View>
    </View>
  );
}