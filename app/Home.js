import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import Navigation from "../components/navigation";
import Modal from "../components/modal";
import ModalEditProfile from "../components/modalEditProfile";

export default function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSend = () => {
    setModalVisible(false);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Button title="Landing" onPress={() => navigation.push("Landing")} />
      <Navigation screenName="Home" navigation={navigation} />
      <Button title="Notice" onPress={() => navigation.push("Notice")} />
      <Button title="ClockIn" onPress={() => navigation.push("ClockIn")} />
      <Button title="ClockOut" onPress={() => navigation.push("ClockOut")} />
      <Button
        title="BBMRequest"
        onPress={() => navigation.push("BBMRequest")}
      />
      <Button title="Site" onPress={() => navigation.push("Site")} />
      <Button title="MainPage" onPress={() => navigation.push("MainPage")} />
      <Button title="AORDoc" onPress={() => navigation.push("AORDoc")} />
      <Button
        title="CopHistory"
        onPress={() => navigation.push("CopHistory")}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Notification</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} onClose={handleSend} />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
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
