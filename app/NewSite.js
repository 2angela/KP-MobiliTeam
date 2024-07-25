import { View, StyleSheet, SafeAreaView } from "react-native";
import { useState, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import get from "lodash/get";
import set from "lodash/set";
import { siteFormat as inputFormat } from "../data/inputFormat";
import ScreenTitle from "../components/screenTitle";
import DropdownField from "../components/dropdownField";
import NumberField from "../components/numberField";
import TextField from "../components/textField";
import ButtonClearHalf from "../components/buttonClearHalf";
import ButtonBlueHalf from "../components/buttonBlueHalf";
import ButtonWhite from "../components/buttonWhite";

export default function NewSite({ navigation }) {
  const categories = [
    { category: "Site ID" },
    { category: "Site Name" },
    { category: "Latitude", unit: "degrees" },
    { category: "Longitude", unit: "degrees" },
    {
      category: "Region",
      options: ["Region 1", "Region 2", "Region 3"],
    },
    {
      category: "Cluster",
      options: ["Cluster 1", "Cluster 2", "Cluster 3"],
    },
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
    setErrors(Array(numOfErrors).fill(false));
    firstSubmit.current = true;
  };

  const handleSave = () => {
    // save input to app cache (?)
  };

  const numOfErrors = Object.keys(input).length; // set number of fields in the screen with error conditions
  const [errors, setErrors] = useState(Array(numOfErrors).fill(false));

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
      }));

      navigation.push("MainPage");
    }
  };

  const findPath = (category) => {
    switch (category) {
      case "Site ID":
        return "site";
      case "Site Name":
        return "name";
      case "Latitude":
        return "latitude";
      case "Longitude":
        return "longitude";
      case "Region":
        return "region";
      case "Cluster":
        return "cluster";
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
      <ScreenTitle
        screenName="Register New Project Site"
        navigation={navigation}
      />
      <ButtonWhite label="Clear" action={clearInput} marginRight={20} />
      <KeyboardAwareScrollView style={styles.innerContainer} bounces={false}>
        <View
          style={[
            styles.fieldsContainer,
            { borderTopLeftRadius: 30, borderTopRightRadius: 30 },
          ]}
        >
          {categories.map((item, index) => {
            if (index <= 1)
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
                    numOfLines={0}
                  />
                </View>
              );
          })}
        </View>
        <View style={styles.fieldsContainer}>
          {categories.map((item, index) => {
            if (index >= 2 && index <= 3)
              return (
                <View key={index}>
                  <NumberField
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
            if (index >= 4)
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
        <View style={styles.buttonsContainer}>
          <ButtonClearHalf
            label="Save Entry"
            action={null}
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
