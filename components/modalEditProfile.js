import React from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import Camera from "../assets/icons/camera.svg";
import Gallery from "../assets/icons/gallery.svg";
import Close from "../assets/icons/close.svg";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default function ModalEditProfile({ visible, onClose }) {
  const handleTakePhoto = () => {
    launchCamera({ mediaType: "photo", quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else {
        console.log("Image response: ", response);
      }
    });
  };

  const handleChooseImage = () => {
    launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else {
        console.log("Image response: ", response);
      }
    });
  };

  return (
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
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Profile Picture</Text>
            <Pressable style={styles.editcontainer1} onPress={handleTakePhoto}>
              <Camera width={24} height={24} fill="black" />
              <Text style={styles.textdetail}>Take photo</Text>
            </Pressable>
            <Pressable
              style={styles.editcontainer2}
              onPress={handleChooseImage}
            >
              <Gallery width={24} height={24} fill="black" />
              <Text style={styles.textdetail}>Choose image from gallery</Text>
            </Pressable>
            <Pressable style={styles.editcontainer3} onPress={onClose}>
              <Close width={24} height={24} fill="black" />
              <Text style={styles.textdetail}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    backgroundColor: "#ECECEC",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 55,
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
    width: "100%",
    paddingVertical: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  editcontainer2: {
    backgroundColor: "white",
    borderColor: "#D9D9D9",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    paddingLeft: 24,
    paddingRight: 24,
    flexDirection: "row",
    width: "100%",
    paddingVertical: 5,
  },
  editcontainer3: {
    backgroundColor: "white",
    borderColor: "#D9D9D9",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingLeft: 24,
    paddingRight: 24,
    flexDirection: "row",
    width: "100%",
    paddingVertical: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomWidth: 1,
  },
  textdetail: {
    fontFamily: "MontserratMedium",
    fontSize: 12,
    marginLeft: 15,
    marginTop: 4,
  },
  modalText: {
    alignItems: "center",
    alignSelf: "center",
    fontFamily: "MontserratBold",
    fontSize: 16,
    marginBottom: 12,
  },
});
