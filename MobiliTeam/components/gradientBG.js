import { StyleSheet, Dimensions, View } from "react-native";
import { Fragment } from "react";
import BG from "../assets/bg.svg";

export default function GradientBG() {
  const originalWidth = 393;
  const originalHeight = 1063;
  const aspectRatio = originalWidth / originalHeight;
  const windowWidth = Dimensions.get("window").width;
  return (
    <View style={[styles.background, { width: windowWidth, aspectRatio }]}>
      <BG
        width="100%"
        height="100%"
        viewBox={`0 0 ${originalWidth} ${originalHeight}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
  },
});
