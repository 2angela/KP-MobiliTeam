import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";

export default function NotificationModal({ visible, onClose }) {
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
}

const styles = StyleSheet.create({
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
