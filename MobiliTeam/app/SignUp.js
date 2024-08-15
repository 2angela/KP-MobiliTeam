import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  SafeAreaView,
  Pressable,
} from "react-native";
import { HelperText, Icon } from "react-native-paper";
import { useState, useRef, Fragment, useEffect } from "react";
import set from "lodash/set";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dropdown } from "react-native-element-dropdown";
import ButtonClear from "../components/buttonClear";
import Back from "../assets/icons/back_fill.svg";
import background from "../assets/landing-photo.png";
import logo from "../assets/app-logo.png";

export default function SignUp({ navigation }) {
  const signUpFormat = {
    name: "",
    email: "",
    phone: "",
    nik: "",
    password: "",
    confirm: "",
    region: "",
    cluster: "",
    project: "",
    role: "",
  };
  const [user, setCurrentUser] = useState(signUpFormat);
  const fields = [
    { name: "Name", icon: "account-circle" },
    { name: "Email", icon: "at" },
    { name: "Phone Number", icon: "phone" },
    { name: "NIK KTP", icon: "card-account-details" },
    { name: "Password", icon: "lock-outline" },
    { name: "Confirm Password", icon: "lock-outline" },
    { name: "Region", icon: "earth" },
    { name: "Cluster", icon: "map-marker" },
    { name: "Project", icon: "clipboard-outline" },
    { name: "Role", icon: "briefcase" },
  ];
  const dropdownOptions = [
    ["Region 1", "Region 2", "Region 3", "Region 4", "Region 5"],
    ["Cluster 1", "Cluster 2", "Cluster 3", "Cluster 4", "Cluster 5"],
    ["Project 1", "Project 2", "Project 3", "Project 4", "Project 5"],
    ["Role 1", "Role 2", "Role 3", "Role 4", "Role 5"],
  ];

  const numOfField = Object.keys(user).length; // set number of fields with active/inactive states and error conditions

  // true if field is active (on Focus), false otherwise
  const [active, setActive] = useState(Array(numOfField).fill(false));

  const handleActiveState = (index) => {
    const newActive = active.map((item, i) => (i == index ? !item : item)); // change state of the item to the opposite
    setActive(newActive);
  };

  const handleChange = (field, value) => {
    const newUser = set({ ...user }, convertToPath(field), value);
    setCurrentUser(newUser);
  };

  // convert field name to user property name
  const convertToPath = (name) => {
    return name.split(" ")[0].toLowerCase();
  };

  // determine how many error conditions for each field
  const errArray1 = Array(2).fill(false);
  const errArray2 = Array(1).fill(false);
  // true if invalid/error input, false if valid input
  const [errors, setErrors] = useState(
    Array(6).fill(errArray1).concat(Array(4).fill(errArray2))
  );

  // helper text variations
  const [indexHT, setIndexHT] = useState(Array(6).fill(0));

  const firstNext = useRef(true);
  const firstSubmit = useRef(true);
  const [next, setNext] = useState(false);
  const validate = (step) => {
    if (!firstNext.current) {
      let tempUser = {};
      Object.keys(user).forEach((prop) => {
        tempUser[prop] = user[prop].trim();
      });
      tempUser["password"] = user.password;
      tempUser["confirm"] = user.confirm;
      // different error conditions for each fields
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // name must at least have first and last name (separated with space)
      const errName = [!tempUser.name, !tempUser.name.includes(" ")];
      // email must be in the foo@bar.com format and is poca email
      const errEmail = [
        !tempUser.email,
        regex.test(tempUser.email) == false || !tempUser.email.includes("poca"),
      ];
      // phone must be at least 11 chars long and start with either 0 or +
      const errPhone = [
        !tempUser.phone,
        tempUser.phone.length < 11 ||
          (!tempUser.phone[0] == 0 && !tempUser.phone[0] == "+"),
      ];
      // nik must be at least 15 chars long
      const errNik = [!tempUser.nik, tempUser.nik.length < 15];
      // nik must be at least 8 chars long
      const errPass = [!tempUser.password, tempUser.password.length < 8];
      // confirm pass must match with password
      const errConf = [
        !tempUser.confirm,
        tempUser.confirm !== tempUser.password,
      ];

      // set new errors
      let newErrors = [...errors];
      newErrors[0] = errName;
      newErrors[1] = errEmail;
      newErrors[2] = errPhone;
      newErrors[3] = errNik;
      newErrors[4] = errPass;
      newErrors[5] = errConf;
      setErrors(newErrors);

      // determine which helper text to use based on the error found
      const newIndexHT = indexHT.map((item, index) =>
        newErrors[index].indexOf(true)
      );
      setIndexHT(newIndexHT);

      if (step == "first") {
        //handle credential validation for the first 6 fields
        for (const item of newErrors) {
          if (item.includes(true)) {
            return false;
          }
        }
        return true;
      } else if (step == "second") {
        if (!firstSubmit.current) {
          const errReg = [!tempUser.region];
          const errClus = [!tempUser.cluster];
          const errProj = [!tempUser.project];
          const errRole = [!tempUser.role];
          newErrors[6] = errReg;
          newErrors[7] = errClus;
          newErrors[8] = errProj;
          newErrors[9] = errRole;
          //handle credential validation for the last 4 fields
          setErrors(newErrors);
          for (const item of newErrors) {
            if (item.includes(true)) {
              return false;
            }
          }
          console.log(tempUser);
          setCurrentUser(tempUser);
          return true;
        } else {
          console.log("Submit First!");
        }
      }
    } else {
      console.log("Next First!");
    }
  };
  const handleNext = () => {
    if (firstNext.current) {
      firstNext.current = false;
    }
    const isValid = validate("first");
    // const isValid = true;
    if (isValid) {
      setNext(true);
    }
  };

  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (firstSubmit.current) {
      firstSubmit.current = false;
    }
    const isValid = validate("second");
    if (isValid) {
      const currentUser = {
        name: user.name,
        email: user.email,
        role: user.role,
        project: user.project,
      };
      dispatch(setUser(currentUser));
      navigation.push("Notice");
    } else {
      return null;
    }
  };

  // useEffect(() => {

  // }, []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      bounces={false}
    >
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.background}
      >
        <SafeAreaView style={styles.container2}>
          <Image source={logo} style={styles.logo} resizeMode="fill" />
          <Text style={styles.screenname}>Sign Up</Text>
          <Pressable
            style={styles.back}
            onPress={() => (next ? setNext(false) : navigation.push("Login"))}
          >
            <Back width="20" height="20" fill="white" />
            <Text style={styles.textStyle}>back</Text>
          </Pressable>

          {/* Map the fields */}
          {fields.map((item, index) => {
            if (!next && index >= 0 && index < 6) {
              return (
                <View key={index} style={styles.field}>
                  <InputField
                    item={item}
                    index={index}
                    user={user}
                    active={active}
                    errors={errors}
                    indexHT={indexHT}
                    handleActiveState={handleActiveState}
                    handleChange={handleChange}
                  />
                </View>
              );
            } else if (next && index >= 6 && index < 10) {
              const activeState = active[index];
              const errorState = errors[index].includes(true);
              return (
                <View key={index} style={styles.field}>
                  <View
                    style={[
                      styles.input,
                      activeState ? styles.inputActive : null,
                      errorState ? styles.inputError : null,
                    ]}
                  >
                    <Icon source={item.icon} size={25} />
                    <Dropdown
                      style={styles.dropdown}
                      onFocus={() => {
                        handleActiveState(index);
                      }}
                      onBlur={() => {
                        handleActiveState(index);
                        validate();
                      }}
                      placeholder={"Choose your " + item.name.toLowerCase()}
                      placeholderStyle={[
                        styles.textFont,
                        { color: "#7F7F7F" },
                        errorState ? styles.textError : null,
                      ]}
                      itemTextStyle={styles.textFont}
                      labelField="label"
                      valueField="value"
                      data={dropdownOptions[index - 6].map((option) => ({
                        label: option,
                        value: option,
                      }))}
                      onChange={(e) => {
                        handleChange(item.name, e.value);
                      }}
                      value={Object.values(user)[index]}
                      selectedTextStyle={styles.textFont}
                      activeColor="#D8D8E7"
                    />
                  </View>
                  <HelperText
                    type="error"
                    visible={errorState}
                    style={styles.helper}
                  >
                    This field cannot be empty
                  </HelperText>
                </View>
              );
            }
          })}

          {/* Sign Up Button */}
          <ButtonClear
            label={next ? "Sign Up" : "Next"}
            action={next ? () => handleSubmit() : () => handleNext()}
            marginTop={10}
            marginBottom={70}
          />
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}

const InputField = ({
  item,
  index,
  user,
  active,
  errors,
  indexHT,
  handleActiveState,
  handleChange,
}) => {
  // helper text variations
  const helper1 = "This field cannot be empty";
  const helpers = [
    [helper1, "Must consist of First Name and Last Name"],
    [helper1, "Please enter a valid poca email"],
    [helper1, "Please enter a valid phone number"],
    [helper1, "Please enter a valid NIK"],
    [helper1, "Password must be at least 8 characters long"],
    [helper1, "Confirm password does not match"],
  ];

  const activeState = active[index];
  const errorState = errors[index].includes(true);
  return (
    <Fragment>
      <Text style={styles.label}>{item.name}</Text>
      <View
        style={[
          styles.input,
          activeState ? styles.inputActive : null,
          errorState ? styles.inputError : null,
        ]}
      >
        <Icon source={item.icon} size={25} />
        <TextInput
          style={[styles.textFont, errorState ? styles.textError : null]}
          placeholder={
            item.name == "Confirm Password"
              ? "Re-enter your password"
              : "Enter your " + item.name.toLowerCase()
          }
          placeholderTextColor={errorState ? "red" : "#7F7F7F"}
          onFocus={() => handleActiveState(index)}
          onBlur={() => {
            handleActiveState(index);
          }}
          value={Object.values(user)[index]}
          inputMode={
            item.name == "Phone Number"
              ? "tel"
              : item.name == "NIK KTP"
              ? "numeric"
              : "email"
          }
          onChangeText={(e) => handleChange(item.name, e)}
          secureTextEntry={item.name.includes("Password")}
        />
      </View>
      <HelperText type="error" visible={errorState} style={styles.helper}>
        {errors[index].length > 1 ? helpers[index][indexHT[index]] : helper1}
      </HelperText>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    height: "100%",
    width: "100%",
  },
  logo: {
    position: "flex",
    width: "25%",
    height: "auto",
    aspectRatio: 1 / 1,
    marginBottom: 20,
    marginTop: "10%",
  },
  field: {
    display: "flex",
    width: "80%",
  },
  label: {
    paddingBottom: 5,
    paddingLeft: 30,
    color: "white",
    fontFamily: "MontserratBold",
  },
  input: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  inputActive: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderRadius: 30,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
  },
  screenname: {
    display: "flex",
    width: "100%",
    fontFamily: "MontserratRegular",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  textFont: {
    display: "flex",
    width: "100%",
    fontFamily: "MontserratRegular",
    color: "black",
    fontSize: 12,
  },
  inputError: {
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 2,
  },
  textError: {
    color: "red",
  },
  helper: {
    fontFamily: "MontserratRegular",
    paddingVertical: 0,
    color: "white",
    fontSize: 11,
  },
  pocaLogo: {
    width: "10%",
    marginBottom: 0,
    marginTop: 5,
  },
  back: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginLeft: 10,
    paddingBottom: 15,
  },
  textStyle: {
    fontFamily: "MontserratRegular",
    fontSize: 12,
    color: "white",
  },
  dropdown: {
    display: "flex",
    width: "85%",
  },
});
