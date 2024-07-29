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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ButtonClear from "../components/buttonClear";
import Back from "../assets/icons/back_fill.svg";
import background from "../assets/landing-photo.png";
import logo from "../assets/app-logo.png";

export default function Landing({ navigation }) {
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
  const [user, setUser] = useState(signUpFormat);
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

  const numOfField = Object.keys(user).length; // set number of fields with active/inactive states and error conditions

  // true if field is active (on Focus), false otherwise
  const [active, setActive] = useState(Array(numOfField).fill(false));

  // true if invalid/error input, false if valid input
  const [errors, setErrors] = useState(Array(numOfField).fill(false));

  const firstNext = useRef(true);
  const firstSubmit = useRef(true);
  const [next, setNext] = useState(false);
  const validate = (step) => {
    if (!firstNext.current) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const errName = !user.name;
      const errEmail = !user.email || regex.test(user.email) == false;
      const errPhone = !user.phone;
      const errNik = !user.nik;
      const errPass = !user.password;
      const errConf = !user.confirm || user.confirm != user.password;
      let newErrors = [...errors];
      newErrors[0] = errName;
      newErrors[1] = errEmail;
      newErrors[2] = errPhone;
      newErrors[3] = errNik;
      newErrors[4] = errPass;
      newErrors[5] = errConf;
      setErrors(newErrors);
      if (step == "first") {
        //handle credential validation for the first 6 fields
        const tempErr = errors.slice(0, 6);
        if (newErrors.includes(true)) {
          return false;
        } else return true;
      } else if (step == "second") {
        if (!firstSubmit.current) {
          const errReg = !user.region;
          const errClus = !user.cluster;
          const errProj = !user.project;
          const errRole = !user.role;
          newErrors[6] = errReg;
          newErrors[7] = errClus;
          newErrors[8] = errProj;
          newErrors[9] = errRole;
          //handle credential validation for the last 4 fields
          setErrors(newErrors);
          if (newErrors.includes(true)) {
            return false;
          } else return true;
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
    if (isValid) {
      setNext(true);
    }
  };
  const handleSubmit = () => {
    if (firstSubmit.current) {
      firstSubmit.current = false;
    }
    const isValid = validate("second");
    if (isValid) {
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
          {next ? (
            <Pressable style={styles.back} onPress={() => setNext(false)}>
              <Back width="20" height="20" fill="white" />
              <Text style={styles.textStyle}>back</Text>
            </Pressable>
          ) : null}

          {/* Map the fields */}
          {fields.map((item, index) => {
            if (!next && index >= 0 && index < 6) {
              return (
                <View key={index} style={styles.field}>
                  <InputField
                    item={item}
                    index={index}
                    user={user}
                    setUser={setUser}
                    active={active}
                    setActive={setActive}
                    errors={errors}
                    validate={validate}
                  />
                </View>
              );
            } else if (next && index >= 6 && index < 10) {
              return (
                <View key={index} style={styles.field}>
                  <InputField
                    item={item}
                    index={index}
                    user={user}
                    setUser={setUser}
                    active={active}
                    setActive={setActive}
                    errors={errors}
                    validate={validate}
                  />
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
  setUser,
  active,
  setActive,
  errors,
  validate,
}) => {
  // convert field name to user property name
  const convertToPath = (name) => {
    return name.split(" ")[0].toLowerCase();
  };

  const handleActiveState = (index) => {
    const newActive = active.map((item, i) => (i == index ? !item : item)); // change state of the item to the opposite
    setActive(newActive);
  };

  const handleChange = (field, value) => {
    const newUser = set({ ...user }, convertToPath(field), value);
    setUser(newUser);
  };
  return (
    <Fragment>
      <Text style={styles.label}>{item.name}</Text>
      <View
        style={[
          styles.input,
          active[index] ? styles.inputActive : null,
          errors[index] ? styles.inputError : null,
        ]}
      >
        <Icon source={item.icon} size={25} />
        <TextInput
          style={[styles.textFont, errors[index] ? styles.textError : null]}
          placeholder={
            item.name == "Confirm Password"
              ? "Re-enter your password"
              : "Enter your " + item.name.toLowerCase()
          }
          placeholderTextColor={errors[index] ? "red" : "#7F7F7F"}
          onFocus={() => handleActiveState(index)}
          onBlur={() => {
            handleActiveState(index);
            validate();
          }}
          name={convertToPath(item.name)}
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
      <HelperText type="error" visible={errors[index]} style={styles.helper}>
        This field cannot be empty
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
});
