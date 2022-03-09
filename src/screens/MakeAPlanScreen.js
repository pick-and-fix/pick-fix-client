import React, { useState } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import StyledButton from "../components/Button";
import PlanDate from "../components/Date";

export default function MakeAPlanScreen() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainTextContainer}>
        <Text style={styles.title}>Make A Plan Screen</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inlineContainer}>
          <View style={styles.circle} />
          <Text style={styles.formText}>Date</Text>
          <PlanDate
            onChange={onChange}
            showDatepicker={showDatepicker}
            showTimepicker={showTimepicker}
            date={date}
            mode={mode}
            show={show}
          />
        </View>
        <View style={styles.inlineContainer}>
          <View style={styles.circle} />
          <Text>Place</Text>
        </View>
        <View style={styles.inlineContainer}>
          <View style={styles.circle} />
          <Text>Pick</Text>
        </View>
        <View style={styles.inlineContainer}>
          <View style={styles.circle} />
          <Text>Friends</Text>
        </View>
      </View>
      <StyledButton width={100} height={7} title="CREATE" size={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  mainTextContainer: {
    flex: 1,
    marginTop: 30,
    paddingTop: 0,
  },
  title: {
    color: "#0A80AE",
    fontSize: 40,
  },
  formContainer: {
    flex: 7,
    width: 350,
  },
  inlineContainer: {
    height: 90,
    flexDirection: "row",
    // flexWrap: "wrap",
    alignItems: "center",
    // paddingBottom: 0,
    marginBottom: 10,
    borderWidth: 1,
  },
  circle: {
    width: 10,
    height: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100,
    backgroundColor: "#f6dced",
  },
  formText: {
    color: "#0A80AE",
    fontSize: 20,
  },
});
