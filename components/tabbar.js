import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Tabbar({ selectedTab, setSelectedTab }) {
  return (
    <View style={styles.tabBarContainerWrapper}>
      <View style={styles.tabBarContainer}>
        <Pressable
          style={[styles.tabItem, selectedTab === "List" && styles.selectedTab]}
          onPress={() => setSelectedTab("List")}
        >
          <Text
            style={[
              styles.tabItemText,
              selectedTab === "List" && styles.selectedtext,
            ]}
          >
            List
          </Text>
          {selectedTab === "List" && <View style={styles.selectedLine} />}
        </Pressable>
        <Pressable
          style={[
            styles.tabItem,
            selectedTab === "Tabel" && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab("Tabel")}
        >
          <Text
            style={[
              styles.tabItemText,
              selectedTab === "Tabel" && styles.selectedtext,
            ]}
          >
            Tabel
          </Text>
          {selectedTab === "Tabel" && <View style={styles.selectedLine} />}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainerWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    borderBottomWidth: 2,
    borderColor: "#d9d9d9",
    paddingVertical: 10,
  },
  tabItem: {
    alignItems: "center",
    position: "relative",
    flex: 1,
  },
  tabItemText: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
    fontFamily: "MontserratRegular",
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFFFFF",
  },
  selectedLine: {
    position: "absolute",
    height: 2,
    width: "40%",
    backgroundColor: "#3B3B89",
    bottom: -17,
    borderBottomWidth: 5,
    borderRadius: 3,
    borderColor: "#3B3B89",
  },
  selectedtext: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
    fontFamily: "MontserratExtraBold",
  },
});
