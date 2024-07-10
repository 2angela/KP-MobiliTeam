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
      <Icon
        source="home"
        size="35"
        color={highlightTab("Home")}
        style={styles.icon}
      ></Icon>
      <Text>Home</Text>
    </View>
  );
}

const theme = {
  roundness: 8,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "white",
    shadowColor: "rgba(59, 59, 137, 0.25)",
    bottom: 0,
  },
  icon: {
    borderRadius: 10,
  },
});
