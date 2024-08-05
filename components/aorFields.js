import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Image,
  TextInput,
} from "react-native";
import Camera from "../assets/icons/photo-camera.svg";
import NoPhoto from "../assets/no-photo.svg";

// get random photo from Lorem Picsum
const randomPhoto = () => {
  return "https://picsum.photos/50?random=1";
};

// Generate Random Photo component
const RandomPhoto = () => {
  return (
    <Image
      source={{ uri: randomPhoto() }}
      style={{
        minWidth: 50,
        minHeight: 50,
        width: 50,
        height: 50,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: "10%",
      }}
    />
  );
};

// Only Photo Upload
export const PhotoUpload = ({
  category,
  currentPhotoPath,
  photoVal,
  handleInputUpload,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed ? styles.fieldPressed : null,
      ]}
      onPress={() => handleInputUpload(currentPhotoPath, randomPhoto())}
    >
      {!photoVal ? (
        <NoPhoto
          width="50"
          height="50"
          marginTop={5}
          marginBottom={5}
          marginLeft="10%"
        />
      ) : (
        <RandomPhoto />
      )}

      <View style={styles.textContent}>
        <Text style={styles.title}>{category.toUpperCase()}</Text>
        <Text style={styles.capture}>Capture Photo</Text>
      </View>
      <View style={[styles.cameraContainer, { borderBottomRightRadius: 29 }]}>
        <Camera width="100" height="100" fill="#3B3B89" right="-5%" top="5%" />
      </View>
    </Pressable>
  );
};

// Photo Upload and Input number
export const PhotoInput = ({
  category,
  currentPhotoPath,
  photoVal,
  currentInputPath,
  inputVal,
  handleInputUpload,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container2,
        pressed ? styles.fieldPressed : null,
      ]}
      onPress={() => handleInputUpload(currentPhotoPath, randomPhoto())}
    >
      <View style={styles.container3}>
        {!photoVal ? (
          <NoPhoto
            width="50"
            height="50"
            marginTop={5}
            marginBottom={5}
            marginLeft="10%"
          />
        ) : (
          <RandomPhoto />
        )}
        <View style={styles.textContent}>
          <Text style={styles.title}>{category.toUpperCase()}</Text>
          <Text style={styles.capture}>Capture Photo</Text>
        </View>
      </View>
      <TextInput
        placeholder={category}
        style={[styles.input, styles.textStyle]}
        inputMode="decimal"
        value={inputVal}
        onChangeText={(e) => handleInputUpload(currentInputPath, e)}
      />
      <View style={[styles.cameraContainer, { borderRadius: 34 }]}>
        <Camera width="100" height="100" fill="#3B3B89" right="-5%" top="5%" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fieldPressed: {
    backgroundColor: "#ECECEC",
  },
  container2: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 35,
    borderColor: "#B1B1D0",
    borderWidth: 1,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    elevation: 4,
    shadowOpacity: 1,
  },
  container3: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    gap: 10,
    borderRadius: 30,
    borderColor: "#B1B1D0",
    borderWidth: 1,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    elevation: 4,
    shadowOpacity: 1,
  },
  input: {
    display: "flex",
    width: "80%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#D8D8E7",
    padding: 10,
    marginHorizontal: "10%",
    marginBottom: 5,
  },
  textStyle: {
    fontFamily: "MontserratRegular",
    fontSize: 12,
  },
  textContent: {
    display: "flex",
    gap: 5,
    paddingVertical: 5,
  },
  title: {
    fontFamily: "MontserratLight",
    fontSize: 11,
  },
  capture: {
    fontFamily: "MontserratBold",
    fontSize: 12,
  },
  cameraContainer: {
    opacity: 0.2,
    display: "flex",
    alignItems: "flex-end",
    height: "100%",
    position: "absolute",
    overflow: "hidden",
    right: 0,
    zIndex: -1,
  },
});
