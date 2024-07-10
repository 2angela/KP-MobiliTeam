import { View, Text, StyleSheet, Button } from "react-native";

export default function Landing({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Landing</Text>
      <Button title="Home" onPress={() => navigation.push("Home")} />
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
