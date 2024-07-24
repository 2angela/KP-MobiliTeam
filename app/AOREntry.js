import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Image,
  Modal,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState, useRef, Fragment, useEffect } from "react";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";
import { inputFormat } from "../data/aorFormat.js";
import ScreenTitle from "../components/screenTitle";
import Back from "../assets/icons/back_fill.svg";
import Camera from "../assets/icons/photo-camera.svg";
import ButtonWhite from "../components/buttonWhite";
import DropdownField from "../components/dropdownField";
import ButtonClearHalf from "../components/buttonClearHalf";
import ButtonBlueHalf from "../components/buttonBlueHalf";
import InputField from "../components/inputField";
import NoPhoto from "../assets/no-photo.svg";
import Connector from "../assets/connector.svg";
import Divider from "../assets/divider.svg";

export default function AOREntry({ navigation }) {
  // track current screen
  const [currentScreen, setCurrentScreen] = useState("Site Information");
  // modify form steps here
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
    {
      name: "Panoramic",
      categories: [
        "0",
        "30",
        "60",
        "90",
        "120",
        "150",
        "180",
        "210",
        "240",
        "270",
        "300",
        "330",
      ],
    },
    {
      name: "Antenna",
      categories: [
        "Height SEC 1",
        "Type SEC 1",
        "Height SEC 2",
        "Type SEC 2",
        "Height SEC 3",
        "Type SEC 3",
      ],
    },
    {
      name: "Azimuth",
      categories: [
        "SEC 1 = 0",
        "SEC 2 = 90",
        "SEC 3 = 270",
        "View SEC 1",
        "View SEC 2",
        "View SEC 3",
      ],
    },
    {
      name: "Tilting",
      categories: [
        "M-Tilt SEC 1",
        "E-Tilt SEC 1",
        "M-Tilt SEC 2",
        "E-Tilt SEC 2",
        "M-Tilt SEC 3",
        "E-Tilt SEC 3",
      ],
    },
    {
      name: "RF Config Azimuth",
      categories: ["SEC 1", "SEC 2", "SEC 3", "SEC 1", "SEC 2", "SEC 3"],
    },
    {
      name: "RF Config M-Tilt",
      categories: ["SEC 1", "SEC 2", "SEC 3", "SEC 1", "SEC 2", "SEC 3"],
    },
    {
      name: "RF Config E-Tilt",
      categories: ["SEC 1", "SEC 2", "SEC 3", "SEC 1", "SEC 2", "SEC 3"],
    },
  ];

  const numOfField = 4; // set number of fields in the screen with active/inactive states
  // true if field (excluding textInput for photos) is active (on Focus), false otherwise
  const [active, setActive] = useState(Array(numOfField).fill(false));
  const [input, setInput] = useState(cloneDeep(inputFormat));
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
      case "Frequency":
        setInput({ ...input, azimuth: { ...input.azimuth, frequency: value } });
        break;
      default:
        console.warn(`Unhandled category: ${category}`);
        break;
    }
  };

  // clear all input for specific step
  const clearInput = () => {
    let temp = cloneDeep(input);
    // clear only for 1 step
    switch (currentScreen) {
      case "Site Information":
        temp.region = "";
        temp.cluster = "";
        temp.site = "";
        break;
      case "Rigger Photo On Site":
        temp.tower = null;
        temp.rigger = null;
        temp.tag = null;
        break;
      case "Panoramic":
        temp.panoramic = cloneDeep(inputFormat.panoramic);
        break;
      case "Antenna":
        temp.antenna = cloneDeep(inputFormat.antenna);
        break;
      case "Azimuth":
        temp.azimuth = cloneDeep(inputFormat.azimuth);
        break;
      case "Tilting":
        temp.tilting = cloneDeep(inputFormat.tilting);
        break;
      case "RF Config Azimuth":
        temp.rfa = cloneDeep(inputFormat.rfa);
        break;
      case "RF Config M-Tilt":
        temp.rfm = cloneDeep(inputFormat.rfm);
        break;
      case "RF Config E-Tilt":
        temp.rfe = cloneDeep(inputFormat.rfe);
        break;
      default:
        console.error("Clear Input: Screen undefined");
        break;
    }
    setInput(temp);
    setErrors(Array(numOfField).fill(false));
    firstSubmit.current = true;
  };

  const handleSave = () => {
    // save input to app cache (?)
  };

  // get random photo from Lorem Picsum
  const randomPhoto = () => {
    return "https://picsum.photos/50?random=1";
  };

  // Generate Random Photo component
  const RandomPhoto = () => {
    return (
      <Image
        source={{ uri: randomPhoto() }}
        style={{
          minWidth: 50,
          minHeight: 50,
          width: 50,
          height: 50,
          marginTop: 5,
          marginBottom: 5,
          marginLeft: "10%",
        }}
      />
    );
  };

  // Get data path for the input (every input has different paths)
  const getInputPath = (screen, category, type, optionalType) => {
    let mainPath = "";
    switch (screen) {
      case "Panoramic":
      case "Antenna":
      case "Azimuth":
      case "Tilting":
        mainPath = screen.toLowerCase() + ".";
        break;
      case "RF Config Azimuth":
        mainPath = "rfa.";
        break;
      case "RF Config M-Tilt":
        mainPath = "rfm.";
        break;
      case "RF Config E-Tilt":
        mainPath = "rfe.";
        break;
      case "Rigger Photo On Site":
        mainPath = "";
        break;
      default:
        console.log("Screen is undefined");
        break;
    }
    const splitCategory = category[0] + category[category.length - 1];
    const typePath = type + ".";
    switch (screen) {
      case "Rigger Photo On Site":
        return category.toLowerCase();
      case "Panoramic":
        return mainPath + category;
      case "Antenna":
      case "Tilting":
        return mainPath + typePath + splitCategory;
      case "Azimuth":
        return (
          mainPath +
          typePath +
          `${category.includes("=") ? category.substring(8) : splitCategory}`
        );
      case "RF Config Azimuth":
      case "RF Config M-Tilt":
      case "RF Config E-Tilt":
        return mainPath + optionalType + "." + typePath + splitCategory;
      default:
        console.error("Input path is not defined");
        return null;
    }
  };
  // find value of an item from its path
  const findValueFromPath = (path) => {
    const value = path.split(".").reduce((acc, key) => acc && acc[key], input);
    return value;
  };

  // Find value for dropdown field and input field
  const findValue = (category) => {
    switch (category) {
      case "Region":
      case "Cluster":
      case "Site":
        return findValueFromPath(category.toLowerCase());
      case "Frequency":
        return input.azimuth.frequency;
      default: {
        console.error("No value found");
        return null;
      }
    }
  };

  // value change handler for photo upload and input field
  const handleInputUpload = (path, value) => {
    const newInput = set({ ...input }, path, value);
    setInput(newInput);
    console.log("input changed!");
  };

  // error checking for dropdown and input fields
  const [errors, setErrors] = useState(Array(numOfField).fill(false));
  // error checking per screens
  const [errorScreen, setErrorScreen] = useState(
    Array(screens.length).fill(false)
  );

  // customize valid conditions for dropdown and input fields here
  // example: checking empty condition
  const isEmpty = (input) => {
    return input ? false : true;
  };
  // error checking if found an empty field in one of the screen
  const foundEmpty = (category) => {
    let values = [];
    const isLeaf = (val) => {
      // is leaf if it's not an object or if it's null
      return typeof val !== "object" || val == null;
    };
    const traverse = (currentObj) => {
      for (const key in currentObj) {
        const value = currentObj[key];
        if (isLeaf(value)) {
          values.push(isEmpty(value));
        } else traverse(value);
      }
    };

    traverse(category);
    return values.includes(true);
  };

  // only check errors after submit button is first pressed
  const firstSubmit = useRef(true);

  // validation per screens
  const findErrorInScreens = () => {
    if (!firstSubmit.current) {
      const newErrorScreen = screens.map((screen) => {
        switch (screen.name) {
          case "Site Information":
            console.log("checking site information... errors =", errors);
            return (
              isEmpty(input.region) ||
              isEmpty(input.cluster) ||
              isEmpty(input.site)
            );
          case "Rigger Photo On Site":
            return (
              input.tower === inputFormat.tower ||
              input.rigger === inputFormat.rigger ||
              input.tag === inputFormat.tag
            );
          case "Panoramic":
            return foundEmpty(input.panoramic);
          case "Antenna":
            return (
              isEmpty(input.azimuth.frequency) || foundEmpty(input.antenna)
            );
          case "Azimuth":
            return foundEmpty(input.azimuth);
          case "Tilting":
            return foundEmpty(input.tilting);
          case "RF Config Azimuth":
            return foundEmpty(input.rfa);
          case "RF Config M-Tilt":
            return foundEmpty(input.rfm);
          case "RF Config E-Tilt":
            return foundEmpty(input.rfe);
          default:
            console.error(
              "Error Checking: Screen undefined, Screen:",
              screen.name
            );
            return false;
        }
      });
      setErrorScreen(newErrorScreen);
      console.log("new error screen =", newErrorScreen);
      return newErrorScreen.includes(true);
    } else {
      console.log("Submit First!");
      return true;
    }
  };
  // validation for dropdown/input fields
  const validate = () => {
    if (!firstSubmit.current) {
      // check for errors (only dropdown and input fields)
      const inputOnly = [
        input.region,
        input.cluster,
        input.site,
        input.azimuth.frequency,
      ];
      const newErrors = Object.values(inputOnly).map((value) => {
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
    const validate1 = validate();
    const validate2 = findErrorInScreens();
    const isInvalid = validate1 || validate2;
    if (isInvalid) {
      setErrorModal(true);
      console.log("Some fields are empty!");
    } else {
      setErrorModal(false);
      const date = new Date();
      setInput((prevState) => ({
        ...prevState,
        createdAt: date.toLocaleString(),
        status: "Pending",
      }));

      navigation.navigate("MainPage");
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

  // different input styles
  const inputStyle = (category, index) => {
    if (category == "Antenna" || category == "Tilting") return "PhotoInput";
    else if (category == "Azimuth" && index >= 0 && index <= 2)
      return "PhotoInput";
    else if (
      category == "RF Config Azimuth" ||
      category == "RF Config M-Tilt" ||
      category == "RF Config E-Tilt"
    )
      return "BeforeAfter";
    else return "Photo";
  };

  // handle automatic focus for form steps
  const [coordinate, setCoordinate] = useState([]);
  const xScroll = useRef(0);
  const yScroll = useRef(0);
  const stepScroll = (index) => {
    xScroll.current?.scrollTo({ x: coordinate[index] - 50, animated: true });
    yScroll.current?.scrollToPosition(0, 0, true);
  };

  // Submit modal
  const [submitModal, setSubmitModal] = useState(false);
  // Error invalid data modal
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    console.log(errorScreen);
  }, [errorScreen]);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle screenName="AOR Capture Entry" navigation={navigation} />

      {/* Interactive Form Steps */}
      <ScrollView
        contentContainerStyle={styles.formSteps}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={false}
        ref={xScroll}
      >
        {getScreenNames().map((screen, index) => {
          return (
            <Fragment key={index}>
              <Pressable
                style={[
                  styles.step,
                  currentScreen == screen
                    ? { backgroundColor: "#D8D8E7" }
                    : null,
                  errorScreen[index] ? { borderColor: "red" } : null,
                ]}
                onLayout={(event) => {
                  const layout = event.nativeEvent.layout;
                  coordinate[index] = layout.x;
                }}
                onPress={() => {
                  stepScroll(index);
                  setCurrentScreen(screen);
                }}
              >
                <Text style={styles.label}>{screen}</Text>
              </Pressable>
              <Connector
                height="100%"
                zIndex="2"
                display={index < getScreenNames().length - 1 ? "flex" : "none"}
                marginHorizontal="-1%"
              />
            </Fragment>
          );
        })}
      </ScrollView>

      {/* Form Top Buttons */}
      <View style={styles.topButtons}>
        <ButtonWhite label="Clear" action={clearInput} marginRight={20} />
        {isFirstStep() ? null : (
          <Pressable style={styles.back} onPress={() => handleStep("back")}>
            <Back width="20" height="20" fill="black" />
            <Text style={styles.textStyle}>previous</Text>
          </Pressable>
        )}
      </View>

      {/* fields */}
      <KeyboardAwareScrollView
        style={styles.innerContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
        ref={yScroll}
      >
        {currentScreen == "Azimuth" ? (
          <View style={styles.inputContainer}>
            <InputField
              item={{ category: "Frequency", unit: "Hz" }}
              index="0"
              errors={errors}
              setErrors={setErrors}
              active={active}
              setActive={setActive}
              findValue={findValue}
              handleInputChange={handleInputChange}
              validate={validate}
            />
          </View>
        ) : null}

        <View style={styles.fieldsContainer}>
          {/* Maping Screens Array */}
          {screens.map((item) => {
            // Site Information
            if (
              currentScreen == "Site Information" &&
              item.name == currentScreen
            ) {
              return item.categories.map((category, index) => {
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
            }
            // Photo Entries
            else if (currentScreen == item.name) {
              return item.categories.map((category, index) => {
                // Photo Only
                if (inputStyle(item.name, index) == "Photo") {
                  const currentPhotoPath = getInputPath(
                    item.name,
                    category,
                    "photo"
                  );
                  const photoVal = findValueFromPath(currentPhotoPath);
                  return (
                    <Fragment key={index}>
                      <Pressable
                        style={({ pressed }) => [
                          styles.container2,
                          pressed ? styles.fieldPressed : null,
                        ]}
                        onPress={() =>
                          handleInputUpload(currentPhotoPath, randomPhoto())
                        }
                      >
                        {!photoVal ? (
                          <NoPhoto
                            width="50"
                            height="50"
                            marginTop={5}
                            marginBottom={5}
                            marginLeft="10%"
                          />
                        ) : (
                          <RandomPhoto />
                        )}

                        <View style={styles.textContent}>
                          <Text style={styles.title}>
                            {category.toUpperCase()}
                          </Text>
                          <Text style={styles.capture}>Capture Photo</Text>
                        </View>
                        <View
                          style={[
                            styles.cameraContainer,
                            { borderBottomRightRadius: "30%" },
                          ]}
                        >
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
                }
                // Photo and Text Input
                else if (inputStyle(item.name, index) == "PhotoInput") {
                  const currentPhotoPath = getInputPath(
                    item.name,
                    category,
                    "photo"
                  );
                  const currentInputPath = getInputPath(
                    item.name,
                    category,
                    "input"
                  );
                  const photoVal = findValueFromPath(currentPhotoPath);
                  const inputVal = findValueFromPath(currentInputPath);
                  return (
                    <Fragment key={index}>
                      <Pressable
                        style={({ pressed }) => [
                          styles.container4,
                          pressed ? styles.fieldPressed : null,
                        ]}
                        onPress={() =>
                          handleInputUpload(currentPhotoPath, randomPhoto())
                        }
                      >
                        <View style={styles.container3}>
                          {!photoVal ? (
                            <NoPhoto
                              width="50"
                              height="50"
                              marginTop={5}
                              marginBottom={5}
                              marginLeft="10%"
                            />
                          ) : (
                            <RandomPhoto />
                          )}
                          <View style={styles.textContent}>
                            <Text style={styles.title}>
                              {category.toUpperCase()}
                            </Text>
                            <Text style={styles.capture}>Capture Photo</Text>
                          </View>
                        </View>
                        <TextInput
                          placeholder={category}
                          style={[styles.input, styles.textStyle]}
                          inputMode="decimal"
                          value={inputVal}
                          onChangeText={(e) =>
                            handleInputUpload(currentInputPath, e)
                          }
                        />
                        <View
                          style={[
                            styles.cameraContainer,
                            { borderRadius: "47%" },
                          ]}
                        >
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

                  // Photo and Text Input with Before and After
                } else if (inputStyle(item.name, index) == "BeforeAfter") {
                  const currentPhotoPath = getInputPath(
                    item.name,
                    category,
                    "photo",
                    `${index < 3 ? "before" : "after"}`
                  );
                  const currentInputPath = getInputPath(
                    item.name,
                    category,
                    "input",
                    `${index < 3 ? "before" : "after"}`
                  );
                  const photoVal = findValueFromPath(currentPhotoPath);
                  const inputVal = findValueFromPath(currentInputPath);
                  return (
                    <Fragment key={index}>
                      {index == 0 ? (
                        <View style={styles.divider}>
                          <Text style={styles.dividerText}>BEFORE</Text>
                          <Divider width="100%" />
                        </View>
                      ) : null}
                      {index == 3 ? (
                        <View style={[styles.divider, { marginTop: "5%" }]}>
                          <Text style={styles.dividerText}>AFTER</Text>
                          <Divider width="100%" />
                        </View>
                      ) : null}
                      <Pressable
                        style={({ pressed }) => [
                          styles.container4,
                          pressed ? styles.fieldPressed : null,
                        ]}
                        onPress={() =>
                          handleInputUpload(currentPhotoPath, randomPhoto())
                        }
                      >
                        <View style={styles.container3}>
                          {!photoVal ? (
                            <NoPhoto
                              width="50"
                              height="50"
                              marginTop={5}
                              marginBottom={5}
                              marginLeft="10%"
                            />
                          ) : (
                            <RandomPhoto />
                          )}
                          <View style={styles.textContent}>
                            <Text style={styles.title}>
                              {category.toUpperCase()}
                            </Text>
                            <Text style={styles.capture}>Capture Photo</Text>
                          </View>
                        </View>
                        <TextInput
                          placeholder={category}
                          style={[styles.input, styles.textStyle]}
                          inputMode="decimal"
                          value={inputVal}
                          onChangeText={(e) =>
                            handleInputUpload(currentInputPath, e)
                          }
                        />
                        <View
                          style={[
                            styles.cameraContainer,
                            { borderRadius: "47%" },
                          ]}
                        >
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
                }
              });
            } else {
              return null;
            }
          })}
        </View>

        {/* Form Bottom Buttons */}
        <View style={styles.buttonsContainer}>
          <ButtonClearHalf
            label={
              currentScreen == "Site Information" ? "Save Site" : "Save Changes"
            }
            action={null}
            marginTop={0}
            marginBottom={0}
          />
          {isLastStep() ? (
            <ButtonBlueHalf
              label="Submit"
              action={() => setSubmitModal(true)}
              marginTop={0}
              marginBottom={0}
            />
          ) : (
            <ButtonBlueHalf
              label="Next"
              action={() => {
                stepScroll(currentScreenIndex() + 1);
                handleStep("next");
              }}
              marginTop={0}
              marginBottom={0}
            />
          )}
        </View>
      </KeyboardAwareScrollView>

      {/* Submit Modal */}
      <Modal
        animationType="fade"
        visible={submitModal}
        transparent={true}
        onRequestClose={() => setSubmitModal(!submitModal)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Ready to submit?</Text>
            <Text style={styles.modalText}>
              Make sure every field has been entered before you submit the
              entry!
            </Text>
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <ButtonClearHalf
                label="Back"
                action={() => setSubmitModal(false)}
                marginTop={0}
                marginBottom={0}
              />
              <ButtonBlueHalf
                label="Submit"
                action={() => {
                  handleSubmit();
                  setSubmitModal(false);
                }}
                marginTop={0}
                marginBottom={0}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* Error Modal */}
      <Modal
        animationType="fade"
        visible={errorModal}
        transparent={true}
        onRequestClose={() => setErrorModal(!errorModal)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={[styles.modalTitle, { color: "red" }]}>Error</Text>
            <Text style={styles.modalText}>
              All fields must be entered before entry is submitted
            </Text>
            <ButtonClearHalf
              label="OK"
              action={() => setErrorModal(false)}
              marginTop={0}
              marginBottom={0}
            />
          </View>
        </View>
      </Modal>
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
  inputContainer: {
    display: "flex",
    paddingHorizontal: 25,
    marginTop: "5%",
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
    paddingVertical: 10,
  },
  divider: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  dividerText: {
    fontFamily: "MontserratBold",
    fontSize: 14,
    letterSpacing: 4.2,
    color: "#3B3B89",
  },
  fieldPressed: {
    backgroundColor: "#ECECEC",
  },
  container4: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "white",
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
  container3: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    gap: 10,
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
  input: {
    display: "flex",
    width: "80%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#D8D8E7",
    padding: 10,
    marginHorizontal: "10%",
    marginBottom: 5,
  },
  textContent: {
    display: "flex",
    gap: 5,
    paddingVertical: 5,
  },
  title: {
    fontFamily: "MontserratLight",
    fontSize: 11,
  },
  capture: {
    fontFamily: "MontserratBold",
    fontSize: 12,
  },
  cameraContainer: {
    opacity: 0.2,
    display: "flex",
    alignItems: "flex-end",
    height: "100%",
    position: "absolute",
    overflow: "hidden",
    right: 0,
    zIndex: -1,
  },
  formSteps: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "10%",
    paddingHorizontal: "5%",
  },
  step: {
    display: "flex",
    height: "100%",
    borderColor: "#B1B1D0",
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  label: {
    fontFamily: "MontserratBold",
    fontSize: 14,
  },
  modalBackground: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    display: "flex",
    flexDirection: "column",
    height: "25%",
    width: "80%",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    marginVertical: "75%",
    borderWidth: 1,
    borderRadius: "10",
  },
  modalTitle: {
    fontFamily: "MontserratBold",
    fontSize: 16,
    textAlign: "center",
  },
  modalText: {
    fontFamily: "MontserratRegular",
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: "10%",
  },
});
