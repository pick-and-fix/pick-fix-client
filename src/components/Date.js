import React from "react";
import { StyleSheet, View, Text, Plarform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import PropTypes from "prop-types";

import StyledButton from "./Button";

const PlanDate = ({
  onChange,
  showDatepicker,
  showTimepicker,
  date,
  mode,
  show,
}) => {
  return (
    <View style={styles.dateContainer}>
      <View style={styles.dateInlineContainer}>
        <Text style={styles.date}>
          {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일
        </Text>
        <StyledButton
          onPress={showDatepicker}
          title="DATE"
          width="30"
          height="60"
          size="13"
        />
      </View>
      <View style={styles.dateInlineContainer}>
        <Text style={styles.time}>
          {date.toLocaleTimeString().substring(0, 5)}
        </Text>
        <StyledButton
          onPress={showTimepicker}
          title="TIME"
          width="30"
          height="60"
          size="13"
        />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    width: 260,
    alignItems: "center",
    marginLeft: 10,
  },
  dateInlineContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  date: {
    marginLeft: 20,
    marginRight: "20%",
  },
  time: {
    marginLeft: 30,
    marginRight: "42%",
  },
});

PlanDate.propTypes = {
  onChange: PropTypes.func,
  showDatepicker: PropTypes.func,
  showTimepicker: PropTypes.func,
  date: PropTypes.instanceOf(Date),
  mode: PropTypes.string,
  show: PropTypes.bool,
};

export default PlanDate;
