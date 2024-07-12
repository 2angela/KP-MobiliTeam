import { View, Text, StyleSheet } from "react-native";
import Navigation from "../components/navigation";

export default function Profile({ navigation }) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
