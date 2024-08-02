import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Clock from "../assets/icons/clock_fill.svg";
import Add from "../assets/icons/add_fill.svg";
import ChevronRight from "../assets/icons/chevron-right.svg";
import ExpandCircleRight from "../assets/icons/expand_circle_right.svg";
import BBM from "../assets/icons/bbm200_fill.svg";
import COP from "../assets/icons/cop200_fill.svg";
import AOR from "../assets/icons/aor200_fill.svg";
import Tower from "../assets/icons/tower200_fill.svg";

export default function Home({ navigation }) {
  // set tasks dynamically
  const [tasks, setTasks] = useState([
    { category: "Done", count: 0, color: "#4FB06D" },
    { category: "On Progress", count: 0, color: "#F5C26B" },
    { category: "Cancelled", count: 0, color: "#F07857" },
  ]);

  // set menu dynamically
  const [menu, setMenu] = useState([
    {
      title: "BBM",
      options: [
        { label: "Entry", screenName: "BBMEntry" },
        { label: "List", screenName: "BBMRequest" },
      ],
      color: "#C6A969",
    },
    {
      title: "COP",
      options: [
        { label: "Entry", screenName: "COPEntry" },
        { label: "List", screenName: "COPHistory" },
      ],
      color: "#379777",
    },
    {
      title: "AOR",
      options: [
        { label: "Entry", screenName: "AOREntry" },
        { label: "AOR 4-6", screenName: "AOR46" },
        { label: "Doc", screenName: "AORDoc" },
      ],
      color: "#7D8ABC",
    },
    {
      title: "Tower",
      options: [
        { label: "New Site", screenName: "NewSite" },
        { label: "List", screenName: "Site" },
      ],
      color: "#7C3E66",
    },
  ]);

  const findIcon = (item) => {
    const color = item.color;
    const size = 30;
    switch (item.title) {
      case "BBM":
        return <BBM width={size} height={size} fill={color} />;
      case "COP":
        return <COP width={size} height={size} fill={color} />;
      case "AOR":
        return <AOR width={size} height={size} fill={color} />;
      case "Tower":
        return <Tower width={size} height={size} fill={color} />;
    }
  };

  const handleMenuNavigation = (screenName) => {
    if (screenName == "") {
      console.error("No screen assigned");
      return null;
    } else {
      return navigation.push(screenName);
    }
  };
  useEffect(() => {
    //example changing task count values (without fetching data from API/database)
    const newTasks = tasks.map((item) => {
      if (item.category == "Done") {
        return { ...item, count: 5 };
      } else if (item.category == "On Progress") {
        return { ...item, count: 2 };
      } else if (item.category == "Cancelled") {
        return { ...item, count: 1 };
      } else {
        return item;
      }
    });
    setTasks(newTasks);
  }, []);

  const clockedIn = useSelector((state) => state.clockedIn);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      alwaysBounceVertical={false}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.h1, styles.bold]}>Lorem Ipsum Dolor</Text>
          <Text
            style={[
              styles.h2,
              styles.h2Style,
              styles.regular,
              { marginTop: 5 },
            ]}
          >
            Project Manager
          </Text>
          <Text
            style={[
              styles.h2,
              styles.h2Style,
              styles.regular,
              { marginTop: 5 },
            ]}
          >
            IOH NPM
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Pressable
            style={({ pressed }) => [
              styles.clockContainer,
              styles.shadowXY0,
              pressed ? styles.clicked : null,
            ]}
            onPress={() =>
              clockedIn
                ? navigation.push("ClockOut")
                : navigation.push("ClockIn")
            }
          >
            <Clock width="30" height="30" fill="#3B3B89" />
          </Pressable>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.addTaskContainer,
            styles.shadowY4R10,
            pressed ? styles.clicked : null,
          ]}
          onPress={() => navigation.push("TaskEntry")}
        >
          <View style={styles.addIconContainer}>
            <Add width="25" height="25" fill="white" />
          </View>
          <Text
            style={[
              styles.h2,
              styles.regular,
              styles.h2Style,
              { color: "rgb(59, 59, 137)" },
            ]}
          >
            Add a new Task
          </Text>
        </Pressable>
      </View>

      {/* Tasks */}
      <View style={styles.tasksContainer}>
        <View style={styles.taskHead}>
          <Text style={[styles.h2, styles.bold]}>Your Tasks</Text>
          <Pressable
            style={styles.allTask}
            onPress={() => navigation.push("Tasks", { view: "All" })}
          >
            <Text
              style={[styles.p, styles.bold, { color: "rgb(59, 59, 137)" }]}
            >
              All Tasks
            </Text>
            <ChevronRight width="24" height="24" fill="rgb(59, 59, 137)" />
          </Pressable>
        </View>
        <View style={styles.tasks}>
          {tasks.map((item, index) => {
            return (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  styles.task,
                  pressed ? styles.clicked : null,
                ]}
                onPress={() =>
                  navigation.push("Tasks", { view: item.category })
                }
              >
                <Text
                  style={[
                    styles.p,
                    styles.regular,
                    { alignSelf: "flex-start" },
                  ]}
                >
                  {item.category}
                </Text>
                <View style={styles.taskBottom}>
                  <Text style={[styles.bold, styles.p]}>{item.count}</Text>
                  <ExpandCircleRight width="24" height="24" fill={item.color} />
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Menu */}
      <View style={[styles.menuContainer, styles.shadowXY0]}>
        {menu.map((item, index) => {
          return (
            <View key={index} style={styles.menu}>
              <Text style={[styles.bold, styles.h2]}>{item.title}</Text>
              <View style={styles.menuBottom}>
                {findIcon(item)}
                {item.options.map((option, index) => {
                  return (
                    <Pressable
                      key={index}
                      style={({ pressed }) => [
                        styles.menuButton,
                        { borderColor: item.color },
                        pressed
                          ? [{ backgroundColor: "#ECECEC" }, styles.shadowY1R4]
                          : null,
                      ]}
                      onPress={() => handleMenuNavigation(option.screenName)}
                    >
                      <Text style={[styles.regular, styles.p]}>
                        {option.label}
                      </Text>
                      <ChevronRight width="25" height="25" fill="black" />
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
      <View style={styles.emptySpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  shadowY4R10: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    elevation: 4,
    shadowOpacity: 1,
  },
  shadowY1R4: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
  },
  shadowXY0: {
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "auto",
    backgroundColor: "rgb(59, 59, 137)",
    paddingVertical: 60,
    paddingHorizontal: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerLeft: {
    display: "flex",
  },
  headerRight: {
    display: "flex",
  },
  clockContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: "auto",
    aspectRatio: 1 / 1,
    backgroundColor: "white",
    borderRadius: 50,
  },
  regular: {
    fontFamily: "MontserratRegular",
  },
  bold: {
    fontFamily: "MontserratBold",
  },
  h1: {
    color: "white",
    fontSize: 20,
  },
  h2Style: {
    color: "white",
    marginLeft: 5,
  },
  h2: {
    fontSize: 14,
  },
  p: {
    fontSize: 12,
  },
  addTaskContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    bottom: -25,
    left: 30,
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 30,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
  },
  addIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    width: "25%",
    height: "80%",
    backgroundColor: "rgb(59, 59, 137)",
    borderRadius: 30,
  },
  tasksContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: 40,
    paddingHorizontal: 25,
    gap: 15,
  },
  taskHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  allTask: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "fit",
  },
  tasks: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  task: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ECECEC",
  },
  taskBottom: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
  },
  menuContainer: {
    display: "flex",
    flexDirection: "column",
    width: "95%",
    marginTop: 30,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    backgroundColor: "white",
    borderRadius: 30,
    gap: 20,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  menuBottom: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "auto",
    gap: 10,
  },
  menuButton: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
  },
  clicked: {
    backgroundColor: "#ECECEC",
    borderColor: "black",
    borderWidth: 1,
  },
  emptySpace: {
    display: "flex",
    margin: "20%",
  },
});
