import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";
import AnalogClock from "react-native-clock-analog";
import { Icon } from "react-native-paper";
import ButtonMedium from "../components/buttonMedium";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ClockOut({ navigation }) {
  const getCurrentDate = () => {
    const day = new Date().toLocaleString("en-us", { weekday: "long" });
    const date = new Date().getDate();
    const month = new Date().toLocaleString("en-us", { month: "long" });
    const year = new Date().getFullYear();
    return `${day}, ${date} ${month} ${year}`;
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
    let animationFrameId;

    const updateCurrentTime = () => {
      setCurrentTime(getCurrentTime());
      animationFrameId = requestAnimationFrame(updateCurrentTime);
    };

    updateCurrentTime();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleClockOut = () => {
    if (!reason.trim()) {
      setIsReasonValid(false);
      Alert.alert("Validation Error", "Please provide a reason.");
      return;
    }

    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <Text style={styles.titletext}>Clock-Out Now</Text>
        <View style={styles.dateBox}>
          <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
            <Icon source="calendar" size={12} style={styles.iconstyle} />
            <Text style={styles.textdate}>Current Date</Text>
          </View>
          <Text style={styles.text1}>{getCurrentDate()}</Text>
        </View>
        <View
          style={{
            borderBottomColor: "#BBB686",
            borderBottomWidth: 1,
            paddingTop: 20,
            marginLeft: 20,
            marginRight: 20,
          }}
        />
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
          <View style={{ paddingBottom: 20 }} />
          <AnalogClock
            size={220}
            colorClock="#F2F9FE"
            colorNumber="#000000"
            colorCenter="#00BCD4"
            colorHour="#3B3B89"
            colorMinutes="#3B3B89"
            hour={parseInt(currentTime.hours)}
            minutes={parseInt(currentTime.minutes)}
          />
        </View>
        <View
          style={{
            borderBottomColor: "#BBB686",
            borderBottomWidth: 1,
            marginLeft: 20,
            marginRight: 20,
          }}
        />
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
          <ButtonMedium label="Cancel" action={handleCancel} marginLeft={10} />
          <ButtonMedium
            label="Clock Out"
            action={handleClockOut}
            marginLeft={-20}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
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
    padding: 20,
    fontFamily: "MontserratBold",
    fontSize: 24,
    textAlign: "left",
    paddingBottom: 20,
    alignSelf: "flex-start",
  },
  dateBox: {
    marginLeft: 20,
    paddingTop: 15,
    paddingLeft: 20,
    paddingBottom: 15,
    backgroundColor: "#F2F9FE",
    borderRadius: 10,
    alignItems: "left",
    width: "90%",
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
    paddingLeft: 20,
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
    textAlign: "left",
    alignSelf: "flex-start",
    paddingTop: 10,
  },
  boxtime: {
    margin: 20,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginTop: 10,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  timeBox: {
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
    paddingTop: 15,
    marginLeft: 20,
  },
  textInput: {
    marginLeft: 20,
    height: 40,
    borderColor: "#3B3B89",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 10,
    width: "90%",
  },
  invalidInput: {
    borderColor: "red",
  },
});
