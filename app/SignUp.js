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

  const numOfField = Object.keys(user).length; // set number of fields with active/inactive states and error conditions

  // true if field is active (on Focus), false otherwise
  const [active, setActive] = useState(Array(numOfField).fill(false));

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
      // different error conditions for each fields
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // name must at least have first and last name (separated with space)
      const errName = [!user.name, !user.name.includes(" ")];
      // email must be in the foo@bar.com format and is poca email
      const errEmail = [
        !user.email,
        regex.test(user.email) == false || !user.email.includes("poca"),
      ];
      // phone must be at least 11 chars long and start with either 0 or +
      const errPhone = [
        !user.phone,
        user.phone.length < 11 ||
          (!user.phone[0] == 0 && !user.phone[0] == "+"),
      ];
      // nik must be at least 15 chars long
      const errNik = [!user.nik, user.nik.length < 15];
      // nik must be at least 8 chars long
      const errPass = [!user.password, user.password.length < 8];
      // confirm pass must match with password
      const errConf = [!user.confirm, user.confirm != user.password];

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
          const errReg = [!user.region];
          const errClus = [!user.cluster];
          const errProj = [!user.project];
          const errRole = [!user.role];
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

  useEffect(() => {
    const temp = [false];
    console.log("does error 6 have false", errors[6].includes(false));
    console.log(errors);
  }, [errors]);

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
            onPress={() => (next ? setNext(false) : navigation.goBack())}
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
                    setCurrentUser={setCurrentUser}
                    active={active}
                    setActive={setActive}
                    errors={errors}
                    indexHT={indexHT}
                  />
                </View>
              );
            } else if (next && index >= 6 && index < 10) {
              console.log(
                "is errors on index",
                index,
                "true ?",
                errors[index].includes(true)
              );
              return (
                <View key={index} style={styles.field}>
                  <InputField
                    item={item}
                    index={index}
                    user={user}
                    setCurrentUser={setCurrentUser}
                    active={active}
                    setActive={setActive}
                    errors={errors}
                    indexHT={indexHT}
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
  setCurrentUser,
  active,
  setActive,
  errors,
  indexHT,
}) => {
  // convert field name to user property name
  const convertToPath = (name) => {
    return name.split(" ")[0].toLowerCase();
  };

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

  const handleActiveState = (index) => {
    const newActive = active.map((item, i) => (i == index ? !item : item)); // change state of the item to the opposite
    setActive(newActive);
  };

  const handleChange = (field, value) => {
    const newUser = set({ ...user }, convertToPath(field), value);
    setCurrentUser(newUser);
  };
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
});
