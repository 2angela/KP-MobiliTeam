import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  PermissionsAndroid,
  Alert,
  SafeAreaView,
} from "react-native";
import { useDispatch } from "react-redux";
import { clockIn } from "../redux/actions";
import AnalogClock from "react-native-clock-analog";
import { Icon } from "react-native-paper";
import ButtonLarge from "../components/buttonLarge";
import ButtonMedium from "../components/buttonMedium";
import ButtonLocation from "../components/buttonLocation";
import Location from "../assets/icons/location.svg";

export default function ClockIn({ navigation }) {
  const getCurrentDate = () => {
    const day = new Date().toLocaleString("en-us", { weekday: "long" });
    const date = new Date().getDate();
    const month = new Date().toLocaleString("en-us", { month: "long" });
    const year = new Date().getFullYear();
    return `${day}, ${date} ${month} ${year}`;
  };

  const getCurrentMinute = () => new Date().getMinutes();
  const getCurrentHours = () => new Date().getHours();

  const [currentTime, setCurrentTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [modalVisible, setModalVisible] = useState(false);

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

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message:
            "This app needs access to your location " +
            "so we can know where you are.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert("You can use the location");
      } else {
        Alert.alert(
          "Alert",
          "Failed to find location. Attendance cannot be proceeded."
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleClockIn = () => {
    setModalVisible(true);
  };

  const handleAbsent = () => {
    navigation.push("MainPage");
  };

  const dispatch = useDispatch();
  const handlePermissionChoice = (choice) => {
    setModalVisible(false);
    if (choice === "allow") {
      dispatch(clockIn());
      navigation.push("MainPage");
    } else if (choice === "deny") {
      requestLocationPermission();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
          marginLeft: 20,
          marginRight: 20,
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
        <View style={{ paddingBottom: 0 }}></View>
        <AnalogClock
          size={220}
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
        <ButtonMedium
          label="Clock In"
          action={handleClockIn}
          marginTop={20}
          marginLeft={10}
        />
        <ButtonMedium
          label="Absent"
          action={handleAbsent}
          marginTop={20}
          marginLeft={-15}
        />
      </View>
      <ButtonLarge
        label="Cancel"
        action={() => navigation.goBack()}
        marginTop={20}
        marginBottom={40}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Location width={40} height={40} fill="#3b3b89" />
            <Text style={styles.modalText}>
              Allow MobiliTeam App to access this device location?
            </Text>
            <ButtonLocation
              label="Allow While Using the App"
              action={() => handlePermissionChoice("allow")}
            />
            <ButtonLocation
              label="Allow This Time"
              action={() => handlePermissionChoice("allow")}
            />
            <ButtonLocation
              label="Don't Allow"
              action={() => handlePermissionChoice("deny")}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    color: "white",
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
    paddingTop: 20,
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 9,
  },
  buttonlocation: {
    borderRadius: 5,
    borderColor: "#3B3B89",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    margin: 8,
  },
  textLocationButton: {
    fontFamily: "MontserratSemiBold",
    color: "#3B3B89",
    fontSize: 10,
    textAlign: "center",
  },
});
