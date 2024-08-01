import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import pfp from "../assets/profile-photo-placeholder.jpg";
import { useEffect, useState } from "react";
import Mail from "../assets/icons/mail_fill.svg";
import Role from "../assets/icons/work_fill.svg";
import Project from "../assets/icons/project_fill.svg";
import ButtonBlue from "../components/buttonBlue";
import Camera from "../assets/icons/camera.svg";
import Gallery from "../assets/icons/gallery.svg";
import Close from "../assets/icons/close.svg";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default function Profile({ navigation }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    project: "",
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // set user example
    const userExample = {
      name: "Lorem Ipsum Dolor",
      email: "lorem@pocagroup.com",
      role: "Project Manager",
      project: "IOH NPM",
    };
    setUser(userExample);
  }, []);

  const handlePfpClick = () => {
    console.log("Profile picture clicked");
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SafeAreaView style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.pfpContainer}
            onPress={handlePfpClick}
          >
            <Image source={pfp} style={styles.pfp} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      <SafeAreaView style={styles.innerContainer}>
        <Text style={styles.h1}>{user.name}</Text>
        <View style={styles.details}>
          <View style={styles.detail}>
            <Mail width="25" height="25" fill="black" />
            <Text style={styles.p}>{user.email}</Text>
          </View>
          <View style={styles.detail}>
            <Role width="25" height="25" fill="black" />
            <Text style={styles.p}>{user.role}</Text>
          </View>
          <View style={styles.detail}>
            <Project width="25" height="25" fill="black" />
            <Text style={styles.p}>{user.project}</Text>
          </View>
        </View>
        <ButtonBlue
          label="Sign Out"
          action={() => navigation.navigate("Landing")}
          marginTop={20}
          marginBottom={0}
        />
      </SafeAreaView>
      <ModalEditProfile visible={modalVisible} onClose={handleCloseModal} />
    </View>
  );
}

const ModalEditProfile = ({ visible, onClose }) => {
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
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    display: "flex",
    width: "100%",
    height: 150,
    backgroundColor: "rgb(59, 59, 137)",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  imageContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  pfpContainer: {
    position: "absolute",
    width: "30%",
    height: "auto",
    aspectRatio: 1 / 1,
    left: "35%",
    top: 80,
  },
  pfp: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  innerContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    marginTop: "15%",
  },
  h1: {
    fontFamily: "MontserratBold",
    fontSize: 20,
  },
  details: {
    display: "flex",
    width: "80%",
    height: "auto",
    gap: 5,
    marginTop: "5%",
  },
  detail: {
    display: "flex",
    flexDirection: "row",
    height: "auto",
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: "center",
    borderRadius: 30,
    borderColor: "#D8D8E7",
    borderWidth: 1,
    gap: 10,
    backgroundColor: "white",
  },
  p: {
    fontFamily: "MontserratRegular",
    fontSize: 12,
  },
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
