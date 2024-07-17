import { View, Text, TextInput, StyleSheet, SafeAreaView } from "react-native";
import { useState, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { HelperText } from "react-native-paper";
import ScreenTitle from "../components/screenTitle";
import ButtonWhite from "../components/buttonWhite";
import DropdownField from "../components/dropdownField";
import InputField from "../components/inputField";
import ButtonClearHalf from "../components/buttonClearHalf";
import ButtonBlueHalf from "../components/buttonBlueHalf";

export default function BBMEntry({ navigation }) {
  const numOfField = 6; // set number of fields in the screen with active/inactive states
  // true if field is active (on Focus), false otherwise
  const [active, setActive] = useState(Array(numOfField).fill(false));
  const handleActiveState = (index) => {
    const newActive = active.map((item, i) => (i == index ? !item : item)); // change state of the item to the opposite
    setActive(newActive);
    resetError(index);
  };

  const inputCategories = [
    { category: "BBM Request Amount", unit: "liter" },
    { category: "Fuel Meter", unit: "liter" },
    { category: "Running Hour", unit: "hours" },
  ];
  const dropDownCategories = [
    {
      category: "Region",
      options: ["Region 1", "Region 2", "Region 3"],
    },
    {
      category: "Cluster",
      options: ["Cluster 1", "Cluster 2", "Cluster 3"],
    },
    { category: "Site", options: ["Site 1", "Site 2", "Site 3"] },
  ];

  const inputFormat = {
    region: "",
    cluster: "",
    site: "",
    volume: "",
    fuel: "",
    runninghour: "",
  };
  const [input, setInput] = useState(inputFormat);
  const handleInputChange = (category, value) => {
    switch (category) {
      case "Region":
        setInput({ ...input, region: value });
        break;
      case "Cluster":
        setInput({ ...input, cluster: value });
        break;
      case "Site":
        setInput({ ...input, site: value });
        break;
      case "BBM Request Amount":
        setInput({ ...input, volume: value });
        break;
      case "Fuel Meter":
        setInput({ ...input, fuel: value });
        break;
      case "Running Hour":
        setInput({ ...input, runninghour: value });
        break;
      default:
        console.warn(`Unhandled category: ${category}`);
    }
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
  const resetError = (index) => {
    const newErrors = errors.map((item, i) => (i == index ? false : item));
    setErrors(newErrors);
  };
  // customize valid conditions here
  // example checking empty condition
  const isEmpty = (input) => {
    return input ? false : true;
  };
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
  const firstSubmit = useRef(true);
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

  // find index and value of an item from its category
  const findItem = (category) => {
    switch (category) {
      case "Region":
        return { index: 0, value: input.region };
      case "Cluster":
        return { index: 1, value: input.cluster };
      case "Site":
        return { index: 2, value: input.site };
      case "BBM Request Amount":
        return { index: 3, value: input.volume };
      case "Fuel Meter":
        return { index: 4, value: input.fuel };
      case "Running Hour":
        return { index: 5, value: input.runninghour };
      default:
        return undefined;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle screenName="BBM Request Entry" navigation={navigation} />
      <ButtonWhite label="Clear" action={clearInput} marginRight={20} />
      <KeyboardAwareScrollView style={styles.innerContainer}>
        <View
          style={[
            styles.fieldsContainer,
            { borderTopLeftRadius: 30, borderTopRightRadius: 30 },
          ]}
        >
          {dropDownCategories.map((item, index) => {
            return (
              <View key={index}>
                <DropdownField
                  item={item}
                  findItem={findItem}
                  errors={errors}
                  active={active}
                  handleActiveState={handleActiveState}
                  handleInputChange={handleInputChange}
                  validate={validate}
                />
              </View>
            );
          })}
        </View>
        <View style={styles.fieldsContainer}>
          {inputCategories.map((item, index) => {
            if (index < 2)
              return (
                <View key={index}>
                  <InputField
                    item={item}
                    findItem={findItem}
                    errors={errors}
                    active={active}
                    handleActiveState={handleActiveState}
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
          {inputCategories.map((item, index) => {
            if (index == 2)
              return (
                <View key={index}>
                  <InputField
                    item={item}
                    findItem={findItem}
                    errors={errors}
                    active={active}
                    handleActiveState={handleActiveState}
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
  },
});
