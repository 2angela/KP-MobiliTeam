import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export default function ButtonLocation({ label, action }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonStyle,
        pressed ? styles.buttonPressed : null,
      ]}
      onPress={action}
    >
      {({ pressed }) => (
        <Text style={[styles.buttonText, pressed ? styles.textPressed : null]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 10,
    color: "#3B3B89",
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#3B3B89",
    borderWidth: 1,
    marginTop: 15,
    paddingHorizontal: 50,
    paddingVertical: 0,
  },
  buttonPressed: {
    backgroundColor: "#3B3B89",
  },
  textPressed: {
    color: "white",
  },
});
