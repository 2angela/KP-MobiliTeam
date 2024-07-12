import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ButtonSmall from "../components/buttonsmall";

const BBMRequest = ({ navigation }) => {
  const [filter, setFilter] = useState("All");

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.arrowstyle}
            source={require("../assets/arrowback.png")}
          />
        </TouchableOpacity>
        <Text style={styles.titletext}>My BBM Request</Text>
      </View>
      <Tabbar />
      <View style={styles.buttonContainer}>
        <ButtonSmall
          label="All"
          action={() => handleFilterChange("All")}
          selected={filter === "All"}
          marginTop={0}
        />
        <ButtonSmall
          label="Pending"
          action={() => handleFilterChange("Pending")}
          selected={filter === "Pending"}
          marginTop={0}
        />
        <ButtonSmall
          label="On-progress"
          action={() => handleFilterChange("On-progress")}
          selected={filter === "On-progress"}
          marginTop={0}
        />
        <ButtonSmall
          label="Done"
          action={() => handleFilterChange("Done")}
          selected={filter === "Done"}
          marginTop={0}
        />
      </View>
      <ListTab filter={filter} />
    </SafeAreaView>
  );
};

const Tabbar = () => {
  const [selectedTab, setSelectedTab] = useState("List");

  return (
    <View style={groupStyles.tabBarContainerWrapper}>
      <View style={groupStyles.tabBarContainer}>
        <Pressable
          style={[
            groupStyles.tabItem,
            selectedTab === "List" && groupStyles.selectedTab,
          ]}
          onPress={() => setSelectedTab("List")}
        >
          <Text
            style={[
              groupStyles.tabItemText,
              selectedTab === "List" && groupStyles.selectedtext,
            ]}
          >
            List
          </Text>
          {selectedTab === "List" && <View style={groupStyles.selectedLine} />}
        </Pressable>
        <Pressable
          style={[
            groupStyles.tabItem,
            selectedTab === "Tabel" && groupStyles.selectedTab,
          ]}
          onPress={() => setSelectedTab("Tabel")}
        >
          <Text
            style={[
              groupStyles.tabItemText,
              selectedTab === "Tabel" && groupStyles.selectedtext,
            ]}
          >
            Tabel
          </Text>
          {selectedTab === "Tabel" && <View style={groupStyles.selectedLine} />}
        </Pressable>
      </View>
    </View>
  );
};

const bbmreq = [
  {
    site: "BLA001",
    date: "Thursday, 4th July 2024",
    region: "Central Java",
    volume: 45,
    status: "Done",
  },
  {
    site: "BLA002",
    date: "Thursday, 4th July 2024",
    region: "Central Java",
    volume: 45,
    status: "On-progress",
  },
  {
    site: "BLA003",
    date: "Thursday, 4th July 2024",
    region: "Central Java",
    volume: 45,
    status: "Pending",
  },
  {
    site: "BLA004",
    date: "Thursday, 4th July 2024",
    region: "Central Java",
    volume: 45,
    status: "Pending",
  },
  {
    site: "BLA005",
    date: "Thursday, 4th July 2024",
    region: "Central Java",
    volume: 45,
    status: "On-progress",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return { backgroundColor: "#F3DDD7", color: "#E91111" };
    case "On-progress":
      return { backgroundColor: "#D7DDF3", color: "#1126E9" };
    case "Done":
      return { backgroundColor: "#CDF1CA", color: "#6AC432" };
    default:
      return { backgroundColor: "#000000", color: "#FFFFFF" };
  }
};

const ListTab = ({ filter }) => {
  const filteredData = bbmreq.filter(
    (item) => filter === "All" || item.status === filter
  );

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.site}
      renderItem={({ item }) => (
        <View style={list.groupContainer}>
          <View style={list.siteContainer}>
            <Text style={list.siteText}>Site : {item.site}</Text>
            <View style={[list.statusBox, getStatusColor(item.status)]}>
              <Text
                style={[
                  list.statusText,
                  { color: getStatusColor(item.status).color },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
          <View style={list.detailContainer}>
            <Text style={list.detailText}>{item.date}</Text>
            <View style={list.verticalLine}></View>
            <Text style={list.detailText}>{item.region}</Text>
            <View style={list.verticalLine}></View>
            <Text style={list.detailText}>{item.volume} litres</Text>
          </View>
        </View>
      )}
      contentContainerStyle={list.listContainer}
    />
  );
};

const list = StyleSheet.create({
  listContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10,
  },
  groupContainer: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ECECEC",
    backgroundColor: "#FFFFFF",
    width: 380,
    marginBottom: 15,
    padding: 10,
  },
  siteContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  siteText: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "MontserratBold",
    color: "#000000",
    paddingTop: 5,
  },
  statusBox: {
    padding: 5,
    borderRadius: 20,
    marginLeft: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "MontserratSemiBold",
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: "#ECECEC",
  },
  detailText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
    color: "#000000",
  },
  verticalLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#ECECEC",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  arrowstyle: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  titletext: {
    fontFamily: "MontserratBold",
    fontSize: 24,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

const groupStyles = StyleSheet.create({
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

export default BBMRequest;
