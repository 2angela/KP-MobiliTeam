import { View, Text, StyleSheet, Pressable } from "react-native";
import Back from "../assets/icons/back_fill.svg";

// component must be rendered inside SafeAreaView
export default function ScreenTitle({ screenName, navigation }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("MainPage")}>
        <Back width="30" height="30" fill="black" />
      </Pressable>
      <Text style={styles.h1}>{screenName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    gap: 10,
  },
  h1: {
    fontFamily: "MontserratBold",
    fontSize: 20,
  },
});
