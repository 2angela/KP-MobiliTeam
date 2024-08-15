import { Text, StyleSheet, Pressable } from "react-native";
import Close from "../assets/icons/close.svg";
import Reset from "../assets/icons/reset-filter_fill.svg";

export default function ButtonWhite({
  label,
  action,
  marginLeft,
  marginRight,
}) {
  const findIcon = (label) => {
    if (label == "Clear") {
      return <Close width="16" height="16" fill="#3B3B89" />;
    } else if (label == "Reset") {
      return <Reset width="16" height="16" fill="#3B3B89" />;
    } else
      console.error("No icon button is assigned, check ButtonWhite component");
  };
  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonContainer,
        pressed ? { backgroundColor: "#ECECEC" } : null,
        { marginLeft: marginLeft, marginRight: marginRight },
      ]}
      onPress={action}
    >
      {findIcon(label)}
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 50,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    gap: 2,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 10,
  },
  buttonText: {
    fontFamily: "MontserratBold",
    fontSize: 12,
    color: "#3B3B89",
  },
});
