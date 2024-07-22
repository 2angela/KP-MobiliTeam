import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Table, Row, Rows } from "react-native-table-component";
import Search from "../assets/icons/search.svg";
import Download from "../assets/icons/download.svg";
import ButtonWhite from "../components/buttonWhite";
import ArrowDown from "../assets/icons/arrow_down.svg";
import ArrowUp from "../assets/icons/arrow_up.svg";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as XLSX from "xlsx";
import Tabbar from "../components/tabbar";
import ScreenTitle from "../components/screenTitle";
import SiteData from "../data/site.json";

export default function Site({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("List");
  const data = Object.values(SiteData);
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle screenName={"Project Site List"} navigation={navigation} />
      <Tabbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === "List" && <ListTab data={data} />}
      {selectedTab === "Tabel" && (
        <TableTab search={search} setSearch={setSearch} data={data} />
      )}
    </SafeAreaView>
  );
}

const ListTab = ({ data }) => {
  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      {data.slice(0, -1).map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemText}>Site: {item.site}</Text>
          <View style={styles.detailContainer}>
            <Text style={[styles.detailText, styles.detailTextLeft]}>
              Region: {item.region}
            </Text>
            <View style={styles.verticalLine}></View>
            <Text style={[styles.detailText, styles.detailTextRight]}>
              Cluster: {item.cluster}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const TableTab = ({ data }) => {
  const initialData = data
    .slice(0, -1)
    .map((item) => [item.site, item.region, item.cluster]);

  const [tableData, setTableData] = useState(
    initialData.sort((a, b) => (a[0] > b[0] ? 1 : -1))
  );

  const [sortDirection, setSortDirection] = useState({
    column: 0,
    direction: "asc",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const columnNames = ["site", "region", "cluster"];

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
    const workbook = XLSX.utils.book_new();

    const worksheetData = [columnNames, ...tableData];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const fileUri = FileSystem.documentDirectory + "Project_Site_List.xlsx";
    const wbout = XLSX.write(workbook, { type: "base64", bookType: "xlsx" });

    await FileSystem.writeAsStringAsync(fileUri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await Sharing.shareAsync(fileUri);
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
            renderHeader("Region", 1),
            renderHeader("Cluster", 2),
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  listContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    padding: 20,
  },
  itemContainer: {
    borderRadius: 15,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#ececec",
    borderWidth: 1,
    flex: 1,
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  itemText: {
    fontSize: 16,
    fontFamily: "MontserratBold",
    textAlign: "center",
  },
  verticalLine: {
    height: "250%",
    width: 1,
    backgroundColor: "#ECECEC",
    position: "absolute",
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    borderColor: "#ECECEC",
    marginBottom: 10,
  },
  detailText: {
    textAlign: "center",
    fontFamily: "MontserratSemiBold",
    fontSize: 10,
    flex: 1,
  },
  detailTextLeft: {
    marginRight: 10,
  },
  detailTextRight: {
    marginLeft: 10,
  },
});
