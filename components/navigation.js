import { View, StyleSheet, Text, Pressable } from "react-native";
import Home from "../assets/icons/home_fill.svg";
import Profile from "../assets/icons/account-circle.svg";
import Bell from "../assets/icons/bell_fill.svg";

export default function Navigation({
  navigation,
  screenName,
  setCurrentScreen,
}) {
  const highlightTab = (tabName) => {
    if (tabName == screenName) {
      return "#3B3B89";
    } else return "black";
  };
  return (
    <View style={styles.container}>
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
              screenName == "Home" ? { display: "flex" } : { display: "none" },
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
              screenName == "Profile"
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
      <Pressable
        style={({ pressed }) => [
          styles.middleTab,
          pressed ? { backgroundColor: "#3B3B89" } : null,
        ]}
      >
        {({ pressed }) => {
          return (
            <Bell
              width="35px"
              height="35px"
              fill={pressed ? "white" : "black"}
            />
          );
        }}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
    shadowColor: "rgba(59, 59, 137, 0.25)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: "0.5",
    shadowRadius: "10",
    elevation: 1,
    bottom: "2%",
    fontFamily: "MontserratRegular",
  },
  tab: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tabs: {
    display: "flex",
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    display: "flex",
    width: "100%",
    height: "3px",
    borderWidth: 2,
    borderColor: "rgb(59, 59, 137)",
    borderRadius: 5,
    marginBottom: 5,
  },
  middleTab: {
    position: "absolute",
    bottom: "50%",
    left: "37%",
    transform: "translate: -50%, -50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "26%",
    aspectRatio: 1 / 1,
    borderRadius: 100,
    borderColor: "rgba(59, 59, 137, 0.25)",
    borderWidth: 1,
    backgroundColor: "white",
    shadowColor: "rgba(59, 59, 137, 0.5)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: "0.5",
    shadowRadius: "10",
  },
  textStyle: {
    fontFamily: "MontserratRegular",
    fontSize: 12,
    textAlign: "center",
  },
});
