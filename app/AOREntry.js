import { View, StyleSheet, SafeAreaView, Text, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState, useRef, Fragment } from "react";
import Svg from "react-native-svg";
import { inputFormat } from "../data/aorFormat";
import ScreenTitle from "../components/screenTitle";
import Back from "../assets/icons/back_fill.svg";
import Camera from "../assets/icons/photo-camera.svg";
import ButtonWhite from "../components/buttonWhite";
import DropdownField from "../components/dropdownField";
import ButtonClearHalf from "../components/buttonClearHalf";
import ButtonBlueHalf from "../components/buttonBlueHalf";
import NoPhoto from "../assets/no-photo.svg";

export default function AOREntry({ navigation }) {
  const [currentScreen, setCurrentScreen] = useState("Site Information");
  const screens = [
    {
      name: "Site Information",
      categories: [
        {
          category: "Region",
          options: ["Region 1", "Region 2", "Region 3"],
        },
        {
          category: "Cluster",
          options: ["Cluster 1", "Cluster 2", "Cluster 3"],
        },
        { category: "Site", options: ["Site 1", "Site 2", "Site 3"] },
      ],
    },
    {
      name: "Rigger Photo On Site",
      categories: ["Tower", "Rigger", "Tag"],
    },
    { name: "Fuel Meter", categories: ["0", "30", "60"] },
    {
      name: "Antenna",
      categories: ["Height SEC 1", "Type SEC 2", "Height SEC 3"],
    },
    {
      name: "Azimuth",
      categories: ["SEC 1 = 0", "SEC 2 = 90", "SEC 3 = 270", "View SEC 1"],
    },
    {
      name: "Tilting",
      categories: [
        "M-Tilt SEC 1",
        "E-Tilt SEC 1",
        "M-Tilt SEC 2",
        "E-Tilt SEC 1",
      ],
    },
    {
      name: "RF Config Azimuth",
      categories: ["SEC 1", "SEC 2", "SEC 3"],
    },
    {
      name: "AOR Capture Entry",
      categories: ["SEC 1", "SEC 2", "SEC 3"],
    },
    {
      name: "RF Config E-Tilt",
      categories: ["SEC 1", "SEC 2", "SEC 3"],
    },
  ];

  const numOfField = 6; // set number of fields in the screen with active/inactive states
  // true if field is active (on Focus), false otherwise
  const [active, setActive] = useState(Array(numOfField).fill(false));
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

  // customize valid conditions here
  // example checking empty condition
  const isEmpty = (input) => {
    return input ? false : true;
  };

  const firstSubmit = useRef(true);
  const validate = () => {
    // if (!firstSubmit.current) {
    //   // check for errors
    //   const newErrors = Object.values(input).map((value) => {
    //     return isEmpty(value);
    //     // add more error checking here
    //   });
    //   setErrors(newErrors);
    //   return newErrors.includes(true);
    // } else {
    //   console.log("Submit First!");
    //   return true;
    // }
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

  // find index and value of an item from its category
  const findValue = (category) => {
    switch (category) {
      case "Region":
        return input.region;
      case "Cluster":
        return input.cluster;
      case "Site":
        return input.site;
      default:
        return "";
    }
  };

  const getScreenNames = () => {
    return screens.map((screen) => screen.name);
  };
  const currentScreenIndex = () => {
    return getScreenNames().findIndex((screen) => screen == currentScreen);
  };
  const isFirstStep = () => {
    const index = currentScreenIndex();
    return index == 0;
  };
  const isLastStep = () => {
    const index = currentScreenIndex();
    const screenNames = getScreenNames();
    return index == screenNames.length - 1;
  };
  const handleStep = (direction) => {
    const index = currentScreenIndex();
    const screenNames = getScreenNames();
    if (direction == "next") {
      if (!isLastStep()) {
        setCurrentScreen(screenNames[index + 1]);
      }
    } else if (direction == "back") {
      if (!isFirstStep()) {
        setCurrentScreen(screenNames[index - 1]);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle screenName="AOR Capture Entry" navigation={navigation} />
      <View style={styles.topButtons}>
        <ButtonWhite label="Clear" action={clearInput} marginRight={20} />
        {isFirstStep() ? null : (
          <Pressable style={styles.back} onPress={() => handleStep("back")}>
            <Back width="20" height="20" fill="black" />
            <Text style={styles.textStyle}>previous</Text>
          </Pressable>
        )}
      </View>

      <KeyboardAwareScrollView style={styles.innerContainer}>
        <View style={styles.fieldsContainer}>
          {screens.map((item) => {
            // Site Information
            if (
              currentScreen == "Site Information" &&
              item.name == currentScreen
            ) {
              console.log("current screen =", item);
              return item.categories.map((category, index) => {
                console.log(category.category);
                return (
                  <View key={index}>
                    <DropdownField
                      item={category}
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
              });
            } else if (item.name == currentScreen) {
              console.log("current screen =", item);
              return item.categories.map((category, index) => {
                return (
                  <Fragment key={index}>
                    <Pressable style={styles.container2}>
                      <NoPhoto
                        width="50"
                        height="50"
                        marginTop={5}
                        marginBottom={5}
                      />
                      <View style={styles.textContent}>
                        <Text style={styles.title}>{category}</Text>
                        <Text style={styles.capture}>Capture Photo</Text>
                      </View>
                      <View style={styles.cameraContainer}>
                        <Camera
                          width="100"
                          height="100"
                          fill="#3B3B89"
                          right="-5%"
                          top="5%"
                        />
                      </View>
                    </Pressable>
                  </Fragment>
                );
              });
            }
          })}
        </View>
        <View style={styles.buttonsContainer}>
          <ButtonClearHalf
            label={
              currentScreen == "Site Information" ? "Save Site" : "Save Changes"
            }
            action={null}
            marginTop={0}
            marginBottom={0}
          />
          {isLastStep() ? null : (
            <ButtonBlueHalf
              label="Next"
              action={() => handleStep("next")}
              marginTop={0}
              marginBottom={0}
            />
          )}
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
    backgroundColor: "white",
  },
  innerContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    marginTop: 5,
  },
  fieldsContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "auto",
    paddingHorizontal: 25,
    paddingVertical: 10,
    gap: 8,
  },
  topButtons: {
    display: "flex",
    flexDirection: "row-reverse",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  back: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    backgroundColor: "white",
  },
  textStyle: {
    fontFamily: "MontserratRegular",
    fontSize: 12,
  },
  buttonsContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    gap: 10,
    paddingLeft: 30,
    borderRadius: 50,
    borderColor: "#B1B1D0",
    borderWidth: 1,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    elevation: 4,
    shadowOpacity: 1,
  },
  textContent: {
    display: "flex",
    gap: 5,
    paddingVertical: 5,
  },
  title: {
    fontFamily: "MontserratLight",
    fontSize: 12,
  },
  capture: {
    fontFamily: "MontserratBold",
    fontSize: 12,
  },
  cameraContainer: {
    opacity: 0.2,
    width: 100,
    height: "100%",
    position: "absolute",
    overflow: "hidden",
    right: 0,
    borderBottomRightRadius: 30,
  },
});
