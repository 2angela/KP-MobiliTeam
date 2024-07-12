import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigation from "../components/navigation";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.text}>Home</Text>
        <Button title="Back" onPress={() => navigation.goBack()} />
        <Button title="Landing" onPress={() => navigation.push("Landing")} />
      </SafeAreaView>
      <Navigation screenName="Home" navigation={navigation} />
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
    fontFamily: "MonserratRegular",
  },
  text: {
    color: "#FFFFFF",
  },
});
