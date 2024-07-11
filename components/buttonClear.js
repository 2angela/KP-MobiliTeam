import { Text, StyleSheet, Pressable } from "react-native";

export default function ButtonClear({
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
    width: "80%",
    paddingVertical: 10,
    backgroundColor: "transparent",
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 30,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 0,
  },
  buttonPressed: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    shadowOpacity: 1,
  },
});
