import { Text, StyleSheet, Pressable } from "react-native";

export default function ButtonLarge({
  label,
  action,
  marginTop,
  marginBottom,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonStyle,
        { marginTop: marginTop, marginBottom: marginBottom },
        pressed ? styles.buttonPressed : null,
      ]}
      onPress={action}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: "MontserratBold",
    fontSize: 16,
    color: "white",
  },
  buttonStyle: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "rgb(59, 59, 137)",
    borderRadius: 30,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
  },
  buttonPressed: {
    backgroundColor: "#B1B1D0",
    shadowOpacity: 0,
  },
});
