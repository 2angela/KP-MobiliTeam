import { View, Text, StyleSheet, Button } from "react-native";
import Navigation from "../components/navigation";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Button title="Landing" onPress={() => navigation.push("Landing")} />
      <Navigation screenName="Home" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    paddingTop: 100,
  },
});
