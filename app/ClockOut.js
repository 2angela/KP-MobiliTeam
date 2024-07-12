import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import AnalogClock from "react-native-clock-analog";
import { Icon } from "react-native-paper";
import ButtonMedium from "../components/buttonMedium";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ClockOut({ navigation }) {
  const getCurrentDate = () => {
    var day = new Date().toLocaleString("en-us", { weekday: "long" });
    var date = new Date().getDate();
    var month = new Date().toLocaleString("en-us", { month: "long" });
    var year = new Date().getFullYear();

    return day + ", " + date + " " + month + " " + year; // format: d-m-y;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return { hours, minutes, seconds };
  };

  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [reason, setReason] = useState("");
  const [isReasonValid, setIsReasonValid] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  const handleClockOut = () => {
    if (!reason.trim()) {
      setIsReasonValid(false);
      Alert.alert("Validation Error", "Please provide a reason.");
      return;
    }
    // Handle clock-out logic here (e.g., API call, navigation)
    // For now, let's just navigate back
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack(); // Navigate back when "Cancel" button is pressed
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titletext}>Clock-Out Now</Text>
      <View style={styles.dateBox}>
        <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
          <Icon source="calendar" size={12} style={styles.iconstyle}></Icon>
          <Text style={styles.textdate}>Current Date</Text>
        </View>
        <Text style={styles.text1}>{getCurrentDate()}</Text>
      </View>
      <View
        style={{
          borderBottomColor: "#BBB686",
          borderBottomWidth: 1,
          paddingTop: 20,
        }}
      ></View>
      <Text style={styles.text2}>Current Time</Text>
      <View style={styles.boxtime}>
        <View style={styles.timeContainer}>
          <View style={styles.timeBox}>
            <Text style={styles.timeText}>{currentTime.hours}</Text>
          </View>
          <Text style={styles.separator}>:</Text>
          <View style={styles.timeBox}>
            <Text style={styles.timeText}>{currentTime.minutes}</Text>
          </View>
          <Text style={styles.separator}>:</Text>
          <View style={styles.timeBox}>
            <Text style={styles.timeText}>{currentTime.seconds}</Text>
          </View>
        </View>
        <View style={{ paddingBottom: 20 }}></View>
        <AnalogClock
          size={250}
          colorClock="#F2F9FE"
          colorNumber="#000000"
          colorCenter="#00BCD4"
          colorHour="#3B3B89"
          colorMinutes="#3B3B89"
          hour={parseInt(currentTime.hours)}
          minutes={parseInt(currentTime.minutes)}
        ></AnalogClock>
      </View>
      <View
        style={{
          borderBottomColor: "#BBB686",
          borderBottomWidth: 1,
          paddingTop: 20,
        }}
      ></View>
      <Text style={styles.textreason}>Reason</Text>
      <TextInput
        style={[styles.textInput, !isReasonValid && styles.invalidInput]}
        placeholder="Reason"
        value={reason}
        onChangeText={(text) => {
          setReason(text);
          setIsReasonValid(true);
        }}
      />
      <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <ButtonMedium label="Cancel" action={handleCancel} />
        <ButtonMedium label="Clock Out" action={handleClockOut} />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    padding: 20,
    backgroundColor: "white",
  },
  titletext: {
    fontFamily: "MontserratBold",
    fontSize: 24,
    textAlign: "left",
    paddingBottom: 20,
    alignSelf: "flex-start",
  },
  dateBox: {
    paddingTop: 15,
    paddingLeft: 20,
    paddingBottom: 15,
    backgroundColor: "#F2F9FE",
    borderRadius: 10,
    alignItems: "left",
  },
  text1: {
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
    textAlign: "left",
    alignSelf: "flex-start",
    paddingTop: 5,
    paddingLeft: 16,
  },
  text2: {
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
    textAlign: "left",
    alignSelf: "flex-start",
    paddingTop: 20,
  },
  boxtime: {
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginTop: 10,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeBox: {
    padding: 10,
    backgroundColor: "#F2F9FE",
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  timeText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 24,
    textAlign: "center",
    color: "#3B3B89",
  },
  separator: {
    fontFamily: "MontserratSemiBold",
    fontSize: 24,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonstyle: {
    flex: 1,
    margin: 8,
    padding: 10,
  },
  iconstyle: {
    alignSelf: "flex-start",
    textAlign: "left",
    marginLeft: 0,
    alignItems: "flex-start",
  },
  textdate: {
    alignSelf: "flex-start",
    fontSize: 8,
    color: "#808080",
    fontFamily: "MontserratSemiBold",
    paddingLeft: 5,
    paddingTop: 1,
  },
  textreason: {
    alignSelf: "flex-start",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    paddingTop: 10,
  },
  textInput: {
    height: 40,
    borderColor: "#3B3B89",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 10,
  },
  invalidInput: {
    borderColor: "red",
  },
});