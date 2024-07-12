import { View, Text, StyleSheet, Button } from "react-native";
import { useState } from "react";
import Navigation from "../components/navigation";
import Home from "./Home";
import Profile from "./Profile";

export default function MainPage({ navigation }) {
  const [activeScreen, setActiveScreen] = useState("Home");
  return (
    <View style={styles.container}>
      {activeScreen == "Home" ? <Home /> : <Profile />}
      <Navigation
        screenName={activeScreen}
        navigation={navigation}
        setCurrentScreen={setActiveScreen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    color: "#FFFFFF",
  },
});
