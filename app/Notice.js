import { View, Text, StyleSheet, Button } from "react-native";

export default function Notice({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notice</Text>
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
