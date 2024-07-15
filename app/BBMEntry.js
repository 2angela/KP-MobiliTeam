import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import ScreenTitle from "../components/screenTitle";

export default function BBMEntry({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle screenName="BBM Request Entry" navigation={navigation} />
    </SafeAreaView>
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
});
