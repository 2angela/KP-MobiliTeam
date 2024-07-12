import { View, StyleSheet, Text, Button } from "react-native";
import { Icon } from "react-native-paper";

export default function Navigation({ screenName, navigation }) {
  function highlightTab(tabName) {
    if (tabName == screenName) {
      return "#3B3B89";
    } else return "black";
  }
  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <View style={styles.tab}>
          <Icon
            source="home"
            size="35"
            color={highlightTab("Home")}
            style={styles.icon}
          ></Icon>
          <Text>Home</Text>
        </View>
        <View style={styles.tab}>
          <Icon
            source="account-circle"
            size="35"
            color={highlightTab("Profile")}
            style={styles.icon}
          ></Icon>
          <Text>Profile</Text>
        </View>
      </View>
      <View style={styles.middleTab}>
        <Icon
          source="bell"
          size="35"
          color={highlightTab("Notify")}
          style={styles.icon}
        ></Icon>
      </View>
    </View>
  );
}

const theme = {
  roundness: 8,
};

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
    paddingVertical: 15,
    shadowColor: "rgba(59, 59, 137, 0.25)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: "0.5",
    shadowRadius: "10",
    bottom: 30,
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
    backgroundColor: "white",
    shadowColor: "rgba(59, 59, 137, 0.5)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: "0.5",
    shadowRadius: "10",
  },
  icon: {
    borderRadius: 10,
  },
});
