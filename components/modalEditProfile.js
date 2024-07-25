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
import Camera from "../assets/icons/camera.svg";
import Gallery from "../assets/icons/gallery.svg";
import Close from "../assets/icons/close.svg";

export default function ModalEditProfile({ visible, onClose }) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          onClose();
        }}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Edit Profile Picture</Text>
                <View style={styles.editcontainer1}>
                  <Camera width={24} height={24} fill="black" />
                  <Text style={styles.textdetail}>Take photo</Text>
                </View>
                <View style={styles.editcontainer1}>
                  <Gallery width={24} height={24} fill="black" />
                  <Text style={styles.textdetail}>
                    Choose image from picture
                  </Text>
                </View>
                <View style={styles.editcontainer1}>
                  <Close width={24} height={24} fill="black" />
                  <Text style={styles.textdetail}>Cancel</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#ECECEC",
    borderRadius: 20,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingHorizontal: 100,
    paddingVertical: 5,
    alignItems: "flex-start",
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  editcontainer1: {
    backgroundColor: "white",
    borderColor: "#D9D9D9",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingLeft: 24,
    paddingRight: 24,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 5,
    padding: 50,
  },
  textdetail: {
    fontFamily: "MontserratMedium",
    fontSize: 12,
    marginLeft: 15,
  },
  buttonStyle: {
    display: "flex",
    alignItems: "center",
    width: 300,
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
    fontFamily: "MontserratBold",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
    borderRadius: 8,
    textAlign: "left",
  },
});
