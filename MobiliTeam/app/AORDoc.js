import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Table, Row, Rows } from "react-native-table-component";
import Search from "../assets/icons/search.svg";
import Download from "../assets/icons/download.svg";
import ArrowDown from "../assets/icons/arrow_down.svg";
import ArrowUp from "../assets/icons/arrow_up.svg";
import ScreenTitle from "../components/screenTitle";
import AorData from "../data/aor.json";
import ButtonAOR from "../components/buttonAOR";
import ButtonWhite from "../components/buttonWhite";

export default function AORDoc({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("On-Progress");
  const data = Object.values(AorData);

  const handleFilterChange = (status) => {
    setSelectedTab(status);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle screenName={"AOR Doc"} navigation={navigation} />
      <View style={styles.buttonContainer}>
        <ButtonAOR
          label="On-Progress"
          action={() => handleFilterChange("On-Progress")}
          selected={selectedTab === "On-Progress"}
        />
        <ButtonAOR
          label="Ready"
          action={() => handleFilterChange("Ready")}
          selected={selectedTab === "Ready"}
        />
      </View>
      <TableTab data={data} selectedTab={selectedTab} />
    </SafeAreaView>
  );
}

const TableTab = ({ data, selectedTab }) => {
  const [tableData, setTableData] = useState([]);
  const [sortDirection, setSortDirection] = useState({
    column: 0,
    direction: "asc",
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filteredData = data
      .filter((item) => item.status === selectedTab)
      .map((item, index) => [
        item.site,
        item.createdAt.split(", ")[0],
        selectedTab === "Ready" ? (
          <View
            key={index}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Download width={24} height={24} fill="black" />
          </View>
        ) : null,
      ]);
    setTableData(filteredData.sort((a, b) => (a[0] > b[0] ? 1 : -1)));
  }, [data, selectedTab]);

  const columnNames =
    selectedTab === "Ready"
      ? ["Site", "Tanggal Minta", "Download"]
      : ["Site", "Tanggal Minta"];

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
    const filteredData = data
      .filter((item) => item.status === selectedTab)
      .map((item) => [
        item.site,
        item.createdAt.split(", ")[0],
        selectedTab === "Ready" ? <Download width={20} height={20} /> : null,
      ])
      .filter((row) =>
        row.some((cell) =>
          cell?.toString().toLowerCase().includes(query.toLowerCase())
        )
      );
    setTableData(filteredData);
  };

  const handleReset = () => {
    const filteredData = data
      .filter((item) => item.status === selectedTab)
      .map((item) => [
        item.namesite,
        item.createdAt.split(", ")[0],
        selectedTab === "Ready" ? <Download width={20} height={20} /> : null,
      ]);
    setTableData(filteredData.sort((a, b) => (a[0] > b[0] ? 1 : -1)));
    setSortDirection({ column: 0, direction: "asc" });
    setSearchQuery("");
  };

  // const handleDownload = async () => {
  //   const workbook = XLSX.utils.book_new();

  //   const worksheetData = [columnNames, ...tableData];
  //   const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  //   const fileUri = FileSystem.documentDirectory + "Project_Site_List.xlsx";
  //   const wbout = XLSX.write(workbook, { type: "base64", bookType: "xlsx" });

  //   await FileSystem.writeAsStringAsync(fileUri, wbout, {
  //     encoding: FileSystem.EncodingType.Base64,
  //   });

  //   await Sharing.shareAsync(fileUri);
  // };

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

        {/* {selectedTab === "Ready" && (
          <TouchableOpacity onPress={handleDownload} style={table.download}>
            <Download width={20} height={20} style={{ marginRight: 5 }} />
            <Text style={table.downloadText}>Download</Text>
          </TouchableOpacity>
        )} */}
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
          data={columnNames.map((name, index) => renderHeader(name, index))}
          style={{
            height: 40,
            backgroundColor: "#B1B1D0",
            justifyContent: "center",
          }}
          textStyle={{ textAlign: "center" }}
        />

        <Rows
          data={tableData.map((row) =>
            selectedTab === "Ready" ? row : row.slice(0, 2)
          )}
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
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    gap: 5,
  },
});
