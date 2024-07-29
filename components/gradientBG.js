import { StyleSheet } from "react-native";
import { Fragment } from "react";
import BG from "../assets/bg.svg";

export default function GradientBG() {
  return (
    <Fragment>
      <BG style={styles.background} resizeMode="cover" />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
