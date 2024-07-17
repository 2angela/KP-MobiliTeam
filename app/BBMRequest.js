import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Table, Row, Rows } from "react-native-table-component";
import ButtonSmall from "../components/buttonsmall";
import * as BBMdata from "../data/bbmreq.json";
import { Icon } from "react-native-paper";
import Search from "../assets/icons/search.svg";
import Download from "../assets/icons/download.svg";
import ButtonWhite from "../components/buttonWhite";
import ArrowDown from "../assets/icons/arrow_down.svg";
import ArrowUp from "../assets/icons/arrow_up.svg";

export default function BBMRequest({ navigation }) {
  const [filter, setFilter] = useState("All");
  const [selectedTab, setSelectedTab] = useState("List");
  const [search, setSearch] = useState("");
  const data = Object.values(BBMdata);

  const removeDefaultValues = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map((item) => removeDefaultValues(item));
    } else if (typeof obj === "object" && obj !== null) {
      const newObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] !== "default") {
          newObj[key] = removeDefaultValues(obj[key]);
        }
      }
      return newObj;
    }
    return obj;
  };
  useEffect(() => {
    // console.log("type of data = ", typeof(BBMdata));
    // console.log("data = ", BBMdata);
    // console.log("values =", );
    // console.log("keys =", Object.keys(BBMdata));
    // console.log(typeof(data));
  }, []);

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
      <Tabbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {/* Filter Menu */}
      {selectedTab === "List" && (
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
      )}
      {selectedTab === "List" && <ListTab filter={filter} data={data} />}
      {selectedTab === "Tabel" && (
        <TableTab search={search} setSearch={setSearch} data={data} />
      )}
    </SafeAreaView>
  );
}

// Select view as list or table
const Tabbar = ({ selectedTab, setSelectedTab }) => {
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

const ListTab = ({ filter, data }) => {
  const filteredData = data.filter(
    (item) => filter === "All" || item.status === filter
  );

  return (
    <View
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        padding: 20,
      }}
    >
      {filter === "All"
        ? filteredData.slice(0, -1).map((item, index) => (
            <View key={index} style={list.groupContainer}>
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
                <Text style={list.detailText}>
                  {item.createdAt.split(", ")[0]}
                </Text>
                <View style={list.verticalLine}></View>
                <Text style={list.detailText}>{item.region}</Text>
                <View style={list.verticalLine}></View>
                <Text style={list.detailText}>{item.volume} litres</Text>
              </View>
            </View>
          ))
        : filteredData.map((item, index) => (
            <View key={index} style={list.groupContainer}>
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
                <Text style={list.detailText}>
                  {item.createdAt.split(", ")[0]}
                </Text>
                <View style={list.verticalLine}></View>
                <Text style={list.detailText}>{item.region}</Text>
                <View style={list.verticalLine}></View>
                <Text style={list.detailText}>{item.volume} litres</Text>
              </View>
            </View>
          ))}
    </View>
  );
};

const TableTab = ({ data }) => {
  const initialData = data
    .slice(0, -1)
    .map((item) => [
      item.site,
      item.volume,
      item.createdAt ? item.createdAt.split(", ")[0] : "",
      item.region,
      item.status,
    ]);

  const [tableData, setTableData] = useState(
    initialData.sort((a, b) => (a[0] > b[0] ? 1 : -1))
  );

  const [sortDirection, setSortDirection] = useState({
    column: 0,
    direction: "asc",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const columnNames = ["site", "volume", "date", "region", "status"];

  const handleSort = (columnIndex) => {
    const direction =
      sortDirection.column === columnIndex && sortDirection.direction === "asc"
        ? "desc"
        : "asc";

    const sortedData = [...tableData].sort((a, b) => {
      if (direction === "asc") {
        return a[columnIndex] > b[columnIndex] ? 1 : -1;
      } else {
        return a[columnIndex] < b[columnIndex] ? 1 : -1;
      }
    });

    setTableData(sortedData);
    setSortDirection({ column: columnIndex, direction });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = initialData.filter((row) =>
      row.some((cell) =>
        cell.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setTableData(filteredData);
  };

  const handleReset = () => {
    const resetData = [...initialData].sort((a, b) => (a[0] > b[0] ? 1 : -1));
    setTableData(resetData);
    setSortDirection({ column: 0, direction: "asc" });
    setSearchQuery("");
  };

  const handleDownload = async () => {
    // const csvData = tableData.map(row => row.join(',')).join('\n');
    // const fileUri = FileSystem.documentDirectory + 'tableData.csv';
    // await FileSystem.writeAsStringAsync(fileUri, csvData);
    // Sharing.shareAsync(fileUri);
  };

  const renderHeader = (text, columnIndex) => {
    const getSortImage = () => {
      if (sortDirection.column === columnIndex) {
        return sortDirection.direction === "asc" ? (
          <ArrowUp width={15} height={15} />
        ) : (
          <ArrowDown width={15} height={15} />
        );
      }
    };

    return (
      <TouchableOpacity
        onPress={() => handleSort(columnIndex)}
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{text}</Text>
        <View style={{ marginLeft: 0 }}>{getSortImage()}</View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{ flex: 1, paddingTop: 17, paddingRight: 20, paddingLeft: 20 }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <View style={[table.searchContainer, { flex: 1 }]}>
          <Search width={24} height={24} fill="#000" style={table.searchIcon} />
          <TextInput
            style={table.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        <TouchableOpacity onPress={handleDownload} style={table.download}>
          <Download width={20} height={20} style={{ marginRight: 5 }} />
          <Text style={table.downloadText}>Download</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <ButtonWhite label="Reset" action={handleReset} marginRight={20} />
        <Text style={{ fontSize: 10, fontFamily: "MontserratRegular" }}>
          This list is sorted by{" "}
        </Text>
        <Text style={{ fontSize: 10, fontFamily: "MontserratBold" }}>
          {sortDirection.column !== null
            ? `${columnNames[sortDirection.column]} (${
                sortDirection.direction === "asc" ? "ascending" : "descending"
              })`
            : "none"}
        </Text>
      </View>

      <Table borderStyle={{ borderWidth: 1, borderColor: "#5B5B5B" }}>
        <Row
          data={[
            renderHeader("Site", 0),
            renderHeader("Volume", 1),
            renderHeader("Date", 2),
            renderHeader("Region", 3),
            renderHeader("Status", 4),
          ]}
          style={{
            height: 40,
            backgroundColor: "#B1B1D0",
            justifyContent: "center",
          }}
          textStyle={{ textAlign: "center" }}
        />

        {/* Rows */}
        <Rows
          data={tableData}
          textStyle={{
            margin: 6,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        />
      </Table>
    </View>
  );
};

const table = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    padding: 5,
    borderColor: "#d9d9d9",
    marginRight: 10,
  },
  searchIcon: {
    padding: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "white",
    fontFamily: "MontserratSemiBold",
  },
  download: {
    flexDirection: "row",
    backgroundColor: "#3b3b89",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  downloadText: {
    fontWeight: "700",
    fontSize: 12,
    fontFamily: "Montserrat-Bold",
    color: "#fff",
  },
  searchTypo: {
    textAlign: "left",
    fontSize: 12,
  },
  searchIconOld: {
    top: 6,
    left: 10,
    width: 23,
    height: 24,
    position: "absolute",
  },
  downloadIcon: {
    width: 15,
    height: 15,
  },
  tableButton: {
    left: 254,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    position: "absolute",
  },
  groupParent: {
    flex: 1,
    width: "100%",
    height: 35,
  },
});

const list = StyleSheet.create({
  listContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
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
