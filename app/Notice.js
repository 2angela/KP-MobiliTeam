import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function Notice({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.imagecontainer}>
          <Image
            style={styles.imagestyle}
            source={require("../assets/Mobiliteam.jpg")}
          />
        </View>
        <Text style={styles.title}>Mobiliteam App Notice</Text>
        <View style={styles.line}></View>
        <Text style={styles.text1}>
          It’s important that you understand what information RPJS MOBILE
          collects and uses. We explain in detail in our updated Privacy Policy
          at the Setting section of this app and you can review the keypoints
          below.
        </Text>
        <Text style={styles.text2}>Your task photos and content</Text>
        <Text style={styles.text3}>
          This may include any information you share with us including photos of
          locations
        </Text>
        <Text style={styles.text2}>Location and Activity</Text>
        <Text style={styles.text3}>
          This may include your route details, distances, and your exact
          location coordinate.
        </Text>
        <Text style={styles.text2}>Example Location Usage</Text>
        <Text style={styles.text3}>
          Upon task creation, by clicking the button Simpan, your location and
          distance to your task site will be saved.
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Disagree</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Agree</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: "#F2F9FE",
  },
  box: {
    width: "100%",
    // padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 0,
  },
  title: {
    fontFamily: "MontserratBold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  text1: {
    paddingLeft: 20,

    fontFamily: "MontserratMedium",
    fontSize: 10,
    textAlign: "left",
    marginBottom: 8,
    paddingTop: 15,
  },
  text2: {
    paddingLeft: 20,
    fontFamily: "MontserratBold",
    fontSize: 12,
    textAlign: "left",
    marginTop: 12,
    marginBottom: 8,
  },
  text3: {
    paddingLeft: 20,
    fontFamily: "MontserratMedium",
    fontSize: 10,
    textAlign: "left",
    marginBottom: 8,
  },
  buttonContainer: {
    flex: 1,
    margin: 8,
  },
  button: {
    flex: 1,
    margin: 8,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonText: {
    fontFamily: "MontserratBold",
    fontSize: 14,
    color: "#3b3b89",
  },
  imagestyle: {
    marginTop: 20,
    width: 35,
    height: 35,
    alignItems: "center",
  },
  imagecontainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  line: {
    height: 0.5,
    backgroundColor: "black",
    width: "100%",
    alignSelf: "stretch",
  },
});
