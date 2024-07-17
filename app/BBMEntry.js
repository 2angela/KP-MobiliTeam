import { View, Text, TextInput, StyleSheet, SafeAreaView } from "react-native";
import { Fragment, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { Icon } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Tooltip, HelperText } from "react-native-paper";
import ScreenTitle from "../components/screenTitle";
import ButtonWhite from "../components/buttonWhite";
import ButtonClearHalf from "../components/buttonClearHalf";
import ButtonBlueHalf from "../components/buttonBlueHalf";
import Search from "../assets/icons/search.svg";
import Check from "../assets/icons/check.svg";

export default function BBMEntry({ navigation }) {
  const numOfField = 6; // set number of fields in the screen with active/inactive states
  // true if field is active (on Focus), false otherwise
  const [active, setActive] = useState(Array(numOfField).fill(false));
  const handleActiveState = (index) => {
    const newActive = active.map((item, i) => (i == index ? !item : item)); // change state of the item to the opposite
    setActive(newActive);
  };
  const checkSelected = (option) => {
    return option == selected;
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
  };

  const handleSave = () => {
    // save input to app cache (?)
  };

  const numOfErrors = Object.keys(input).length; // set number of fields in the screen with error conditions
  const [errors, setErrors] = useState(Array(numOfErrors).fill(false));
  const validate = () => {
    // customize valid conditions here
    const isEmpty = (input) => {
      return input ? false : true;
    };

    // check for errors
    const newErrors = Object.values(input).map((value) => {
      return isEmpty(value);
      // add more error checking here
    });

    setErrors(newErrors);
    return newErrors.includes(true);
  };
  const handleSubmit = () => {
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
      <KeyboardAwareScrollView
        style={{ display: "flex", width: "100%", height: "100%", marginTop: 5 }}
      >
        <View
          style={[
            styles.fieldsContainer,
            { borderTopLeftRadius: 30, borderTopRightRadius: 30 },
          ]}
        >
          {dropDownCategories.map((item, index) => {
            return (
              <View key={index}>
                <View
                  style={[
                    styles.field,
                    errors[index] ? styles.fieldError : null,
                  ]}
                >
                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>{item.category}</Text>
                  </View>
                  <Dropdown
                    search
                    style={styles.dropdown}
                    onFocus={() => handleActiveState(index)}
                    onBlur={() => {
                      handleActiveState(index);
                      validate();
                    }}
                    placeholder="Select"
                    placeholderStyle={[styles.input, { color: "#B8B8B8" }]}
                    inputSearchStyle={styles.searchText}
                    searchPlaceholder="Search"
                    containerStyle={styles.options}
                    itemTextStyle={[styles.input, { paddingTop: 0 }]}
                    labelField="label"
                    valueField="value"
                    data={item.options.map((option) => ({
                      label: option,
                      value: option,
                    }))}
                    onChange={(e) => {
                      handleInputChange(item.category, e.value);
                    }}
                    value={findItem(item.category).value}
                    selectedTextStyle={styles.input}
                    activeColor="#D8D8E7"
                  />
                </View>
                <HelperText
                  type="error"
                  visible={errors[findItem(item.category).index]}
                  style={styles.helper}
                >
                  This field cannot be empty
                </HelperText>
              </View>
            );
          })}
        </View>
        <View style={styles.fieldsContainer}>
          {inputCategories.map((item, index) => {
            if (index < 2)
              return (
                <View key={index}>
                  <View style={styles.field2}>
                    <View style={styles.label2Container}>
                      <Text style={styles.label}>{item.category}</Text>
                    </View>
                    <View
                      style={[
                        styles.input2,
                        errors[findItem(item.category).index]
                          ? styles.fieldError
                          : null,
                      ]}
                    >
                      <TextInput
                        placeholder="XX"
                        onChangeText={(e) =>
                          handleInputChange(item.category, e)
                        }
                        onBlur={validate}
                        value={findItem(item.category).value}
                        inputMode="decimal"
                        clearButtonMode="while-editing"
                        enterKeyHint="next"
                      />
                    </View>
                    <Text style={styles.inputUnit}>{item.unit}</Text>
                  </View>
                  <HelperText
                    type="error"
                    visible={errors[findItem(item.category).index]}
                    style={styles.helper}
                  >
                    This field cannot be empty
                  </HelperText>
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
                  <View key={index} style={styles.field2}>
                    <View style={styles.label2Container}>
                      <Text style={styles.label}>{item.category}</Text>
                    </View>
                    <View
                      style={[
                        styles.input2,
                        errors[findItem(item.category).index]
                          ? styles.fieldError
                          : null,
                      ]}
                    >
                      <TextInput
                        placeholder="XX"
                        onChangeText={(e) =>
                          handleInputChange(item.category, e)
                        }
                        onBlur={validate}
                        value={findItem(item.category).value}
                        inputMode="decimal"
                        clearButtonMode="while-editing"
                        enterKeyHint="next"
                      />
                    </View>
                    <Text style={styles.inputUnit}>{item.unit}</Text>
                  </View>
                  <HelperText
                    type="error"
                    visible={errors[findItem(item.category).index]}
                    style={styles.helper}
                  >
                    This field cannot be empty
                  </HelperText>
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
  field: {
    display: "flex",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 10,
    borderColor: "#B1B1D0",
    borderWidth: 1,
    backgroundColor: "white",
  },
  fieldError: {
    borderColor: "red",
    borderWidth: 1,
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
  input: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
    color: "black",
    marginTop: 10,
  },
  inputActive: {
    borderColor: "black",
  },
  labelActive: {
    backgroundColor: "#3B3B89",
    borderColor: "#3B3B89",
  },
  dropdown: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
    width: "80%",
  },
  inputPlaceholder: {
    fontFamily: "MontserratBold",
    fontSize: 12,
  },
  field2: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  label2Container: {
    display: "flex",
    flex: 3,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
  },
  input2: {
    display: "flex",
    flex: 3,
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "#B1B1D0",
    borderWidth: 1,
    borderLeftColor: "transparent",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
  inputUnit: {
    display: "flex",
    textAlign: "center",
    alignSelf: "center",
    flex: 1,
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    gap: 20,
  },
  helper: {
    fontFamily: "MontserratRegular",
    paddingVertical: 0,
    paddingHorizontal: 15,
  },
});
