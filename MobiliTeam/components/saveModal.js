import { useEffect, useState } from "react";
import { Modal, View, StyleSheet, Text } from "react-native";

export default function SaveModal({ setShowModal }) {
  const [visibleNow, setVisible] = useState(true);

  useEffect(() => {
    let id;
    if (visibleNow) {
      id = window.setTimeout(() => {
        setVisible(false);
        setShowModal(false);
      }, 1500);
    }
    return () => {
      if (id) {
        window.clearTimeout(id);
      }
    };
  }, [visibleNow, setShowModal]);

  return (
    <Modal
      animationType="fade"
      visible={visibleNow}
      transparent={true}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>Entry Saved!</Text>
          <Text style={styles.textStyle}>Your entry input has been saved</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  container: {
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 20,
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    gap: 10,
  },
  title: {
    fontFamily: "MontserratBold",
    fontSize: 16,
    textAlign: "center",
    color: "green",
  },
  textStyle: {
    fontFamily: "MontserratRegular",
    fontSize: 12,
    textAlign: "center",
  },
});
