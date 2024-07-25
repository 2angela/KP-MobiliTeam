import React, { useState, useEffect } from "react";
import { LineChart } from "react-native-gifted-charts";
import ScreenTitle from "../components/screenTitle";
import Tabbar from "../components/tabbar";
import * as COPData from "../data/cop.json";
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
import Delete from "../assets/icons/delete.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CopHistory({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("List");
  const initialData = Object.values(COPData);
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const filePath = FileSystem.documentDirectory + "cop.json";

  const calculateCOPMonthlyTotals = (data) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const totals = Array(currentMonth).fill(0);

    data.slice(0, -1).forEach((item) => {
      const date = item.createdAt;
      const month = parseInt(date.substring(3, 5));
      totals[month - 1] += item.cop;
    });

    return totals;
  };

  const copMonthlyTotals = calculateCOPMonthlyTotals(data);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle screenName={"COP History"} navigation={navigation} />
      <Tabbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === "List" && (
        <ListTab
          copMonthlyTotals={copMonthlyTotals}
          data={data}
          setData={setData}
        />
      )}
      {selectedTab === "Tabel" && (
        <TableTab search={search} setSearch={setSearch} data={data} />
      )}
    </SafeAreaView>
  );
}

const ListTab = ({ copMonthlyTotals, data, setData }) => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1);
  const endDate = today;
  const dateRange = `${startDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })} - ${endDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;

  // const removeItem = async (index) => {
  //   const updatedData = data.filter((item) => item.index !== index);
  //   setData(updatedData);
  //   await writeFile(updatedData);
  // };

  const handleDelete = async (index) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));

    // const updatedData = [...data];
    // updatedData.splice(index, 1);
    // data.remove(data[index]);
    // console.log(data);

    // try {
    //   await AsyncStorage.setItem("COPData", JSON.stringify(updatedData));
    //   console.log("Data saved successfully");
    // } catch (error) {
    //   console.error("Error saving data: ", error);
    // }
  };

  const lineChartData = copMonthlyTotals.map((total, index) => ({
    value: total,
    label: new Date(0, index).toLocaleString("en-US", { month: "short" }),
  }));

  return (
    <ScrollView contentContainerStyle={list.listContainer}>
      <View style={list.detailcontainer}>
        <Text style={list.titleText}>COP Trend</Text>
        <Text style={list.dateText}>{dateRange}</Text>
        <LineChart
          areaChart
          curved
          data={lineChartData}
          width={340}
          height={200}
          color="#5b5b5b"
          thickness={3}
          hideRules={false}
          hideYAxisText={true}
          startFillColor="#ECECEC"
          startOpacity={0.8}
          endFillColor="#D9D9D9"
          endOpacity={0.3}
          textFontSize={8}
          pointerConfig={{
            pointerStripHeight: 160,
            pointerStripColor: "lightgray",
            pointerStripWidth: 2,
            pointerColor: "lightgray",
            radius: 6,
            pointerLabelWidth: 100,
            pointerLabelHeight: 90,
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: false,
            pointerLabelComponent: (items) => {
              return (
                <View
                  style={{
                    height: 90,
                    width: 130,
                    justifyContent: "center",
                    marginTop: -30,
                    marginLeft: -40,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      marginBottom: 6,
                      textAlign: "center",
                    }}
                  >
                    {items[0].date}
                  </Text>

                  <View
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 16,
                      backgroundColor: "white",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                      {"Rp " + items[0].value}
                    </Text>
                  </View>
                </View>
              );
            },
          }}
        />
      </View>
      {data.slice(0, -1).map((item, index) => (
        <View key={index} style={list.card}>
          <View style={list.topInfoContainer}>
            <View style={[list.topInfo, { backgroundColor: "#E2E2EE" }]}>
              <Text style={list.date}>{item.createdAt}</Text>
            </View>
            <View style={[list.topInfo, { backgroundColor: "#E2E2EE" }]}>
              <Text style={[list.status, { color: "black" }]}>
                No. {index + 1}
              </Text>
            </View>
          </View>
          <View style={list.cardContents}>
            <View>
              <Text style={[list.title, { textAlign: "center" }]}>SITE</Text>
              <Text style={[list.value, { textAlign: "center" }]}>
                {item.site}
              </Text>
            </View>
            <View style={list.column}>
              <View style={list.row}>
                <View>
                  <Text style={list.title}>REGION</Text>
                  <Text style={list.value}>{item.region}</Text>
                </View>
                <View>
                  <Text style={list.title}>CLUSTER</Text>
                  <Text style={list.value}>{item.cluster}</Text>
                </View>
                <View>
                  <Text style={list.title}>SOW</Text>
                  <Text style={list.value}>{item.sow}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={list.titlecop}>COP</Text>
                  <Text style={list.copvalue}>{`Rp ${item.cop}`}</Text>
                </View>
              </View>
              <View style={list.row}>
                <View>
                  <Text style={list.title}>ACTIVITY</Text>
                  <Text style={list.value2}>{item.activity}</Text>
                </View>
                <View>
                  <Text style={list.title}>RESOURCE</Text>
                  <Text style={list.value2}>{item.resource}</Text>
                </View>
                <View>
                  <Text style={list.title}>TYPE</Text>
                  <Text style={list.value2}>{item.type}</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={list.deletecontainer}
            onPress={() => handleDelete(index)}
          >
            <Delete width={30} height={30} fill="#FF0000" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const list = StyleSheet.create({
  listContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  detailcontainer: {
    marginTop: 23,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#D9D9D9",
    borderWidth: 1,
    width: "90%",
    borderRadius: 10,
  },
  boxcontainer: {
    padding: 20,
    marginTop: 10,
    borderRadius: 15,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    marginTop: 30,
    width: "90%",
  },
  titleText: {
    fontFamily: "MontserratBold",
    fontSize: 16,
    marginTop: 5,
  },
  dateText: {
    fontFamily: "MontserratRegular",
    fontSize: 12,
    marginVertical: 10,
  },
  card: {
    marginTop: 30,
    display: "flex",
    width: "90%",
    borderRadius: 15,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    paddingBottom: 15,
    paddingTop: 20,
    position: "relative",
  },
  topInfoContainer: {
    display: "flex",
    width: "100%",
    position: "absolute",
    top: "-8%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    paddingHorizontal: 15,
  },
  topInfo: {
    display: "flex",
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 20,
  },
  date: {
    fontFamily: "MontserratRegular",
    fontSize: 12,
  },
  status: {
    fontFamily: "MontserratMedium",
    fontSize: 12,
  },
  cardContents: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
  },
  title: {
    fontFamily: "MontserratLight",
    fontSize: 12,
  },
  titlecop: {
    fontFamily: "MontserratLight",
    fontSize: 12,
    paddingTop: 5,
  },
  value: {
    fontFamily: "MontserratBold",
    fontSize: 14,
  },
  value2: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
  },
  copvalue: {
    fontFamily: "MontserratBold",
    fontSize: 16,
    paddingLeft: 5,
  },
  column: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  row: {
    display: "flex",
    flex: 1,
    gap: 10,
  },
  deletecontainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: "#f3ddd7",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});

const TableTab = ({ data }) => {
  const initialData = data.slice(0, -1).map((item, index) => [
    // item.no,
    index + 1,
    item.site,
    item.region,
    item.cluster,
    item.type,
    item.resource,
    item.activity,
    item.sow,
    item.createdAt.split(", ")[0],
    item.cop,
  ]);

  const [tableData, setTableData] = useState(
    initialData.sort((a, b) => (a[0] > b[0] ? 1 : -1))
  );

  const [sortDirection, setSortDirection] = useState({
    column: 0,
    direction: "asc",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const columnNames = [
    "No",
    "Site",
    "Region",
    "Cluster",
    "Type",
    "Resource",
    "Activity",
    "SOW",
    "Tanggal Minta",
    "COP",
  ];

  const columnWidths = [50, 100, 100, 100, 100, 100, 100, 100, 120, 100];

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    const date = new Date(`${year}-${month}-${day}`);
    return isNaN(date) ? null : date;
  };

  const handleSort = (columnIndex) => {
    const direction =
      sortDirection.column === columnIndex && sortDirection.direction === "asc"
        ? "desc"
        : "asc";

    const sortedData = [...tableData].sort((a, b) => {
      if (columnIndex === 2) {
        const dateA = parseDate(a[columnIndex]);
        const dateB = parseDate(b[columnIndex]);

        if (dateA === null && dateB === null) return 0;
        if (dateA === null) return direction === "asc" ? 1 : -1;
        if (dateB === null) return direction === "asc" ? -1 : 1;

        return direction === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        if (direction === "asc") {
          return a[columnIndex] > b[columnIndex] ? 1 : -1;
        } else {
          return a[columnIndex] < b[columnIndex] ? 1 : -1;
        }
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

    const fileUri = FileSystem.documentDirectory + "COPHistory.xlsx";
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
          width: columnWidths[columnIndex],
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{text}</Text>
        <View style={{ marginLeft: 5 }}>{getSortImage()}</View>
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

      <ScrollView horizontal>
        <ScrollView>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#5B5B5B" }}>
            <Row
              data={columnNames.map((name, index) => renderHeader(name, index))}
              style={{
                height: 40,
                backgroundColor: "#B1B1D0",
                justifyContent: "center",
              }}
              textStyle={{ textAlign: "center" }}
              widthArr={columnWidths}
            />
            <Rows
              data={tableData}
              textStyle={{
                margin: 6,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
              widthArr={columnWidths}
            />
          </Table>
        </ScrollView>
      </ScrollView>
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

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    gap: 5,
  },
});
