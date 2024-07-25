import { Text, StyleSheet, Pressable } from "react-native";

export default function ButtonAOR({ label, action, marginTop, selected }) {
  return (
    <Pressable
      style={[
        styles.buttonStyle,
        { marginTop: marginTop },
        selected ? styles.buttonSelected : null,
      ]}
      onPress={action}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 10,
    color: "white",
  },
  buttonStyle: {
    display: "flex",
    alignItems: "center",
    width: "42%",
    paddingVertical: 12,
    backgroundColor: "#B1B1D0",
    borderRadius: 40,
    elevation: 4,
    // marginLeft: 10,
    marginRight: 0,
  },
  buttonSelected: {
    backgroundColor: "#3B3B89",
    shadowOpacity: 0,
  },
});
