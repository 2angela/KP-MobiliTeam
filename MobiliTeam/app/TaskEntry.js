import { View, StyleSheet, SafeAreaView } from "react-native";
import { useState, useRef, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import get from "lodash/get";
import set from "lodash/set";
import { useDispatch, useSelector } from "react-redux";
import { saveTask } from "../redux/actions";
import { taskFormat as inputFormat } from "../data/inputFormat";
import ScreenTitle from "../components/screenTitle";
import DropdownField from "../components/dropdownField";
import TextField from "../components/textField";
import ButtonClearHalf from "../components/buttonClearHalf";
import ButtonBlueHalf from "../components/buttonBlueHalf";
import ButtonWhite from "../components/buttonWhite";
import SaveModal from "../components/saveModal";
import GradientBG from "../components/gradientBG";

export default function TaskEntry({ navigation }) {
  const categories = [
    {
      category: "Region",
      options: ["Region 1", "Region 2", "Region 3", "Region 4", "Region 5"],
    },
    {
      category: "Cluster",
      options: [
        "Cluster 1",
        "Cluster 2",
        "Cluster 3",
        "Cluster 4",
        "Cluster 5",
      ],
    },
    {
      category: "Site",
      options: ["Site 1", "Site 2", "Site 3", "Site 4", "Site 5"],
    },
    {
      category: "Task Type",
      options: ["Type 1", "Type 2", "Type 3", "Type 4", "Type 5"],
    },
    {
      category: "Task Category",
      options: [
        "Category 1",
        "Category 2",
        "Category 3",
        "Category 4",
        "Category 5",
      ],
    },
    { category: "Description" },
  ];

  const numOfField = categories.length; // set number of fields in the screen with active/inactive states
  // true if field is active (on Focus), false otherwise
  const [active, setActive] = useState(Array(numOfField).fill(false));
  const [input, setInput] = useState(inputFormat);
  const handleInputChange = (category, value) => {
    const newInput = set({ ...input }, findPath(category), value);
    setInput(newInput);
  };
  const clearInput = () => {
    const temp = { ...inputFormat };
    setInput(temp);
    setErrors(Array(numOfField).fill(false));
    firstSubmit.current = true;
  };

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const handleSave = () => {
    // save input to global state
    setShowModal(true);
    dispatch(saveTask(input));
  };

  const [errors, setErrors] = useState(Array(numOfField).fill(false));

  // customize valid conditions here
  // example checking empty condition
  const isEmpty = (input) => {
    return input || input !== "" ? false : true;
  };

  const firstSubmit = useRef(true);
  const validate = () => {
    if (!firstSubmit.current) {
      // check for errors
      const newErrors = Object.values(input).map((value) => {
        return isEmpty(value);
        // add more error checking here
      });
      setErrors(newErrors);
      return newErrors.includes(true);
    } else {
      console.log("Submit First!");
      return true;
    }
  };
  const handleSubmit = () => {
    if (firstSubmit.current) {
      firstSubmit.current = false;
    }
    const isInvalid = validate();
    if (isInvalid) {
      console.log("Some fields are empty!");
    } else {
      const date = new Date();
      setInput((prevState) => ({
        ...prevState,
        createdAt: date.toLocaleString(),
        status: "Pending",
      }));

      navigation.push("MainPage");
    }
  };

  const savedInput = useSelector((state) => state.task);
  useEffect(() => {
    setInput(savedInput);
  }, [savedInput]);

  const findPath = (category) => {
    switch (category) {
      case "Region":
        return "region";
      case "Cluster":
        return "cluster";
      case "Site":
        return "site";
      case "Task Type":
        return "type";
      case "Task Category":
        return "category";
      case "Description":
        return "description";
      default:
        return undefined;
    }
  };
  // find index and value of an item from its category
  const findValue = (category) => {
    return get(input, findPath(category));
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientBG />
      <ScreenTitle screenName="New Task Entry" navigation={navigation} />
      <ButtonWhite label="Clear" action={clearInput} marginRight={20} />
      <KeyboardAwareScrollView style={styles.innerContainer} bounces={false}>
        <View
          style={[
            styles.fieldsContainer,
            { borderTopLeftRadius: 30, borderTopRightRadius: 30 },
          ]}
        >
          {categories.map((item, index) => {
            if (index <= 2)
              return (
                <View key={index}>
                  <DropdownField
                    item={item}
                    index={index}
                    errors={errors}
                    setErrors={setErrors}
                    active={active}
                    setActive={setActive}
                    findValue={findValue}
                    handleInputChange={handleInputChange}
                    validate={validate}
                  />
                </View>
              );
          })}
        </View>
        <View style={styles.fieldsContainer}>
          {categories.map((item, index) => {
            if (index >= 3 && index <= 4)
              return (
                <View key={index}>
                  <DropdownField
                    item={item}
                    index={index}
                    errors={errors}
                    setErrors={setErrors}
                    active={active}
                    setActive={setActive}
                    findValue={findValue}
                    handleInputChange={handleInputChange}
                    validate={validate}
                  />
                </View>
              );
          })}
        </View>
        <View
          style={[
            styles.fieldsContainer,
            { borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
          ]}
        >
          {categories.map((item, index) => {
            if (index == 5)
              return (
                <View key={index}>
                  <TextField
                    item={item}
                    index={index}
                    errors={errors}
                    setErrors={setErrors}
                    active={active}
                    setActive={setActive}
                    findValue={findValue}
                    handleInputChange={handleInputChange}
                    validate={validate}
                    numOfLines={5}
                  />
                </View>
              );
          })}
        </View>
        <View style={styles.buttonsContainer}>
          <ButtonClearHalf
            label="Save Entry"
            action={handleSave}
            marginTop={15}
            marginBottom={0}
          />
          <ButtonBlueHalf
            label="Submit"
            action={handleSubmit}
            marginTop={15}
            marginBottom={0}
          />
        </View>
        {showModal ? <SaveModal setShowModal={setShowModal} /> : null}
      </KeyboardAwareScrollView>
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
  fieldsContainer: {
    display: "flex",
    width: "100%",
    height: "auto",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    gap: 8,
  },
  innerContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    marginTop: 5,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    gap: 20,
    paddingBottom: "10%",
  },
});
