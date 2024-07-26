import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AnalogClock from "react-native-clock-analog";
import { Icon } from "react-native-paper";
import ButtonLarge from "../components/buttonLarge";
import ButtonMedium from "../components/buttonMedium";

export default function ClockIn({ navigation }) {
  const getCurrentDate = () => {
    const day = new Date().toLocaleString("en-us", { weekday: "long" });
    const date = new Date().getDate();
    const month = new Date().toLocaleString("en-us", { month: "long" });
    const year = new Date().getFullYear();
    return `${day}, ${date} ${month} ${year}`;
  };

  const getCurrentMinute = () => {
    return new Date().getMinutes().toString().padStart(2, "0");
  };

  const getCurrentHours = () => {
    return new Date().getHours().toString().padStart(2, "0");
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleClockIn = () => {
    navigation.push("MainPage");
  };

  const [currentTime, setCurrentTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime({ hours, minutes, seconds });
      requestAnimationFrame(updateCurrentTime);
    };

    updateCurrentTime();

    return () => cancelAnimationFrame(updateCurrentTime);
  }, []);

  // const handleNavigate = (screen) => {
  //   validate();
  //   if (valid == true) {
  //     if (screen == "Login") {
  //       return navigation.push("ClockIn");
  //     } else if (screen == "SignUp") {
  //       return navigation.push("SignUp");
  //     }
  //   } else {
  //     return null;
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.titletext}>Clock-In Now</Text>
      <View style={styles.dateBox}>
        <View style={{ flexDirection: "row", alignself: "flex-start" }}>
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
          hour={getCurrentHours()}
          minutes={getCurrentMinute()}
        ></AnalogClock>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <ButtonMedium label="Clock In" action={handleClockIn} marginTop={50} />
        <ButtonMedium label="Absent" action={handleClockIn} marginTop={50} />
      </View>
      <ButtonLarge
        label="Cancel"
        action={handleCancel}
        marginTop={20}
        marginBottom={40}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%", // Adjust the container width to allow left alignment
    padding: 20,
    backgroundColor: "white",
  },
  titletext: {
    fontFamily: "MontserratBold",
    fontSize: 24,
    textAlign: "left",
    paddingBottom: 20,
    alignSelf: "flex-start", // Align text to the left
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
    alignself: "flex-start",
    textAlign: "left",
    marginLeft: 0,
    alignItems: "flex-start",
  },
  textdate: {
    alignself: "flex-start",
    fontSize: 8,
    color: "#808080",
    fontFamily: "MontserratSemiBold",
    paddingLeft: 5,
    paddingTop: 1,
  },
});
