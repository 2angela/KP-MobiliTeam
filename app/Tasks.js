import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import ScreenTitle from "../components/screenTitle";
import ButtonSmall from "../components/buttonsmall";
import TaskCard from "../components/taskCard";

// data import
import * as taskData from "../data/task.json";
import { Fragment, useEffect, useState } from "react";

export default function Tasks({ navigation, route }) {
  const data = Object.values(taskData);
  const [currentView, setCurrentView] = useState("All");
  const filteredData = data.filter(
    (item) =>
      item.status == currentView ||
      (currentView == "On Progress" && item.status == "Pending") ||
      (currentView == "All" && item.status)
  );

  useEffect(() => {
    const viewRequest = route.params.view;
    console.log(viewRequest);
    setCurrentView(viewRequest);
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle screenName={"Your Tasks"} navigation={navigation} />
      <View style={styles.menu}>
        <ButtonSmall
          label="All"
          action={() => setCurrentView("All")}
          selected={currentView == "All"}
          selectedColor="#3B3B89"
        />
        <ButtonSmall
          label="Done"
          action={() => setCurrentView("Done")}
          selected={currentView == "Done"}
          selectedColor="#CDF1CA"
        />
        <ButtonSmall
          label="On Progress"
          action={() => setCurrentView("On Progress")}
          selected={currentView == "On Progress"}
          selectedColor="#FFEBC9"
        />
        <ButtonSmall
          label="Cancelled"
          action={() => setCurrentView("Cancelled")}
          selected={currentView == "Cancelled"}
          selectedColor="#F3DDD7"
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.cards}
        showsVerticalScrollIndicator={false}
      >
        {filteredData.map((item, index) => {
          // omit last element (last element in json is default with empty values)
          if (index < filteredData.length)
            return (
              <Fragment key={index}>
                <TaskCard item={item} />
              </Fragment>
            );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    gap: 10,
  },
  menu: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  cards: {
    display: "flex",
    width: "90%",
    paddingTop: 15,
    gap: "20%",
  },
});
