import { View, Text, StyleSheet, Image } from "react-native";
import pfp from "../assets/profile-photo-placeholder.jpg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Mail from "../assets/icons/mail_fill.svg";
import Role from "../assets/icons/work_fill.svg";
import Project from "../assets/icons/project_fill.svg";
import ButtonBlue from "../components/buttonBlue";

export default function Profile({ navigation }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    project: "",
  });

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SafeAreaView style={styles.imageContainer}>
          <Image source={pfp} style={styles.pfp} />
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
    </View>
  );
}

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
  pfp: {
    position: "absolute",
    width: "30%",
    height: "auto",
    aspectRatio: 1 / 1,
    left: "35%",
    top: 80,
    borderRadius: "100%",
  },
  innerContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
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
    marginTop: "10%",
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
  },
  p: {
    fontFamily: "MontserratRegular",
    fontSize: 12,
  },
});
