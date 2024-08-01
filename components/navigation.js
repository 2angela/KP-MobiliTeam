import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Alert,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import Home from "../assets/icons/home_fill.svg";
import Profile from "../assets/icons/account-circle.svg";
import Bell from "../assets/icons/bell_fill.svg";

export default function Navigation({
  navigation,
  screenName,
  setCurrentScreen,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const highlightTab = (tabName) => {
    return tabName === screenName ? "#3B3B89" : "black";
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.middleTab,
          pressed ? { backgroundColor: "#3B3B89" } : null,
        ]}
        onPress={() => setModalVisible(true)}
      >
        {({ pressed }) => (
          <Bell width="35px" height="35px" fill={pressed ? "white" : "black"} />
        )}
      </Pressable>
      <View style={styles.tabs}>
        <Pressable
          style={styles.tab}
          onPress={() => {
            setCurrentScreen("Home");
            navigation.navigate("MainPage");
          }}
        >
          <View
            style={[
              styles.line,
              screenName === "Home" ? { display: "flex" } : { display: "none" },
            ]}
          />
          <Home width="35px" height="35px" fill={highlightTab("Home")} />
          <Text style={[styles.textStyle, { color: highlightTab("Home") }]}>
            Home
          </Text>
        </Pressable>
        <Pressable
          style={styles.tab}
          onPress={() => {
            setCurrentScreen("Profile");
            navigation.navigate("MainPage");
          }}
        >
          <View
            style={[
              styles.line,
              screenName === "Profile"
                ? { display: "flex" }
                : { display: "none" },
            ]}
          />
          <Profile width="35px" height="35px" fill={highlightTab("Profile")} />
          <Text style={[styles.textStyle, { color: highlightTab("Profile") }]}>
            Profile
          </Text>
        </Pressable>
      </View>
      <NotificationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const NotificationModal = ({ visible, onClose }) => {
  const [notification, setNotification] = useState("");

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          onClose();
        }}
      >
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.centeredView}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Send a notification</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Message (optional)"
                    value={notification}
                    onChangeText={setNotification}
                  />
                  <Pressable
                    style={({ pressed }) => [
                      styles.buttonStyle,
                      pressed ? styles.buttonPressed : null,
                    ]}
                    onPress={onClose}
                  >
                    <Text style={styles.buttonText}>Send</Text>
                  </Pressable>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  container: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 30,
    paddingTop: 10,
    paddingBottom: 15,
    borderColor: "rgba(59, 59, 137, 0.1)",
    borderWidth: 1,
    shadowColor: "rgba(59, 59, 137, 0.25)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 1,
    bottom: "2%",
    fontFamily: "MontserratRegular",
  },
  tabs: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  tab: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    display: "flex",
    width: "100%",
    height: 3,
    borderWidth: 2,
    borderColor: "rgb(59, 59, 137)",
    borderRadius: 5,
    marginBottom: 5,
  },
  middleTab: {
    position: "absolute",
    top: -45,
    left: "50%",
    transform: [{ translateX: -50 }],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "rgba(59, 59, 137, 0.1)",
    borderWidth: 1,
    backgroundColor: "white",
    shadowColor: "rgba(59, 59, 137, 0.5)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  textStyle: {
    fontFamily: "MontserratRegular",
    fontSize: 12,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "flex-start",
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  buttonStyle: {
    display: "flex",
    alignItems: "center",
    width: 350,
    paddingVertical: 15,
    backgroundColor: "rgb(59, 59, 137)",
    borderRadius: 30,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
  },
  buttonPressed: {
    backgroundColor: "#B1B1D0",
    shadowOpacity: 0,
  },
  buttonText: {
    fontFamily: "MontserratBold",
    fontSize: 16,
    color: "white",
  },
  modalText: {
    fontFamily: "MontserratMedium",
    fontSize: 14,
    marginBottom: 15,
    textAlign: "left",
  },
  input: {
    height: 50,
    width: 350,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
    borderRadius: 8,
    textAlign: "left",
  },
});
