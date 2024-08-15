import { Text, StyleSheet, Pressable } from "react-native";

export default function ButtonSmall({
  label,
  action,
  selected,
  selectedColor,
}) {
  return (
    <Pressable
      style={[
        styles.buttonStyle,
        selected && { backgroundColor: selectedColor, shadowOpacity: 0 },
      ]}
      onPress={action}
    >
      <Text
        style={[
          styles.buttonText,
          selected && label == "All" ? { color: "white" } : null,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 11,
    color: "black",
  },
  buttonStyle: {
    display: "flex",
    alignItems: "center",
    width: "20%",
    paddingVertical: 10,
    backgroundColor: "#ECECEC",
    borderRadius: 40,
  },
});
