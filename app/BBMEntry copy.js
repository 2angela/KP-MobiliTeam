import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import ScreenTitle from "../components/screenTitle";
import ButtonWhite from "../components/buttonWhite";
import { Fragment, useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import DropDown from "../assets/icons/drop-down.svg";
import DropUp from "../assets/icons/drop-up.svg";
import Search from "../assets/icons/search.svg";
import Check from "../assets/icons/check.svg";

export default function BBMEntry({ navigation }) {
  const numOfField = 6; // set number of fields in the screen with active/inactive states
  // true if field is active (on Focus), false otherwise
  const [active, setActive] = useState(Array(numOfField).fill(false));
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleActiveState = (index) => {
    console.log("size =", fieldRef.current.measure());
    fieldRef.current.measure((fx, fy, width, height, px, py) => {
      setPosition({ x: px, y: py + height });
    });
    const newActive = active.map((item, i) => (i == index ? !item : item)); // change state of the item to the opposite
    setActive(newActive);
  };

  const [selected, setSelected] = useState("");
  const checkSelected = (option) => {
    return option == selected;
  };

  const inputFormat = {
    region: "",
    site: "",
    cluster: "",
    volume: "",
    runninghour: "",
    status: "",
    createdAt: "",
  };
  const [input, setInput] = useState(inputFormat);
  const options = [
    {
      category: "Region",
      option: [
        "Region 1",
        "Region 2",
        "Region 3",
        "Region 3",
        "Region 3",
        "Region 3",
        "Region 3",
        "Region 3",
      ],
    },
    { category: "Cluster", option: ["Cluster 1", "Cluster 2", "Cluster 3"] },
    { category: "Site", option: ["Site 1", "Site 2", "Site 3"] },
  ];

  const clearInput = () => {
    const temp = { ...inputFormat };
    setInput(temp);
    setSelected("");
  };

  const handleSave = (data) => {
    setInput(data);
  };

  const handleSubmit = () => {};

  const fieldRef = useRef(null);
  const ShowModal = (item, index) => {
    return (
      <Modal
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        isVisible={active[index]}
        coverScreen={false}
        backdropOpacity={0}
        avoidKeyboard={true}
        onBackdropPress={() => handleActiveState(index)}
        style={styles.modal}
      >
        <View
          style={[
            styles.dropdown,
            { position: "absolute", top: position.y, left: position.x },
          ]}
        >
          <View style={styles.search}>
            <Search width="25" height="25" fill="black" />
            <TextInput placeholder="Search" style={styles.searchText} />
          </View>
          <ScrollView style={styles.options}>
            {item.option.map((option, index) => {
              return (
                <Pressable
                  key={index}
                  onPressIn={() => setSelected("Lorem Ipsum")}
                  style={[
                    styles.option,
                    checkSelected(option)
                      ? { backgroundColor: "#D8D8E7" }
                      : null,
                  ]}
                >
                  {checkSelected(option) ? (
                    <Check width="24" height="24" fill="#3B3B89" />
                  ) : null}
                  <Text style={styles.dropdownText}>{option}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle screenName="BBM Request Entry" navigation={navigation} />
      <ButtonWhite label="Clear" action={() => clearInput} />
      <View style={styles.containerTop}>
        {options.map((item, index) => {
          return (
            <Fragment key={index}>
              <Pressable
                ref={fieldRef}
                style={styles.field}
                onPressIn={() => handleActiveState(index)}
              >
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>{item.category}</Text>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.input}>Select</Text>
                  {active[index] ? (
                    <DropUp width="30" height="30" fill="black" />
                  ) : (
                    <DropDown width="30" height="30" fill="black" />
                  )}
                </View>
              </Pressable>
              {active[index] && ShowModal(item, index)}
            </Fragment>
          );
        })}
      </View>
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
    backgroundColor: "#DEDEFF",
  },
  containerTop: {
    display: "flex",
    width: "100%",
    height: "auto",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    gap: 20,
  },
  field: {
    display: "flex",
    width: "100%",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 5,
    marginTop: 10,
    borderRadius: 10,
    borderColor: "#B1B1D0",
    borderWidth: 1,
    backgroundColor: "white",
  },
  labelContainer: {
    display: "flex",
    position: "absolute",
    top: "-50%",
    left: "5%",
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  label: {
    fontFamily: "MontserratBold",
    fontSize: 12,
    textAlign: "center",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
    color: "#B8B8B8",
  },
  inputActive: {
    borderColor: "black",
  },
  labelActive: {
    backgroundColor: "#3B3B89",
    borderColor: "#3B3B89",
  },
  modal: {
    display: "flex",
    width: "80%",
    height: "100%",
  },
  dropdown: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
  },
  search: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    margin: 10,
    marginBottom: 0,
    gap: 10,
    borderColor: "#C4C4C4",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  searchText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
  },
  options: {
    display: "flex",
    width: "90%",
    marginVertical: 5,
  },
  option: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "auto",
    paddingVertical: 5,
    backgroundColor: "white",
  },
  dropdownText: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
  },
});
