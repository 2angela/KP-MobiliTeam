import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import { HelperText, Icon } from "react-native-paper";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ButtonBlue from "../components/buttonBlue";
import ButtonClear from "../components/buttonClear";
import background from "../assets/landing-photo.png";
import logo from "../assets/app-logo.png";
import poca from "../assets/poca-logo.png";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // temporary login credential
  const loginCreds = {
    email: "admin@poca.com",
    password: "admin123",
  };

  const numOfField = 2; // set number of fields in the screen with active/inactive states

  // true if field is active (on Focus), false otherwise
  const [active, setActive] = useState(Array(numOfField).fill(false));

  // determine how many error conditions for each field
  const emailErr = Array(3).fill(false);
  const passErr = Array(2).fill(false);
  // true if invalid/error input, false if valid input
  const [errors, setErrors] = useState([emailErr, passErr]);

  // helper text variations
  const [emailHT, setEmailHT] = useState(0);
  const [passHT, setPassHT] = useState(0);
  const helpers = {
    email: [
      "This field cannot be empty",
      "Please enter a valid poca email",
      "Incorrect email or password",
    ],
    password: ["This field cannot be empty", "Incorrect email or password"],
  };

  const handleActiveState = (index) => {
    const newActive = active.map((item, i) => (i == index ? !item : item)); // change state of the item to the opposite
    setActive(newActive);
  };

  const firstSubmit = useRef(true);
  const validate = () => {
    if (!firstSubmit.current) {
      setEmail(email.trim());
      setPassword(password.trim());
      //handle credential validation
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const newEmailErr = [
        !email,
        regex.test(email) == false || !email.includes("poca"),
        email !== loginCreds.email,
      ];
      const newPassErr = [!password, password !== loginCreds.password];
      setEmailHT(() =>
        newEmailErr.includes(true) ? newEmailErr.indexOf(true) : 0
      );
      setPassHT(() =>
        newPassErr.includes(true) ? newPassErr.indexOf(true) : 0
      );

      const newErrors = [newEmailErr, newPassErr];
      setErrors(newErrors);

      if (!newEmailErr.includes(true) && !newPassErr.includes(true)) {
        return true;
      } else return false;
    } else {
      console.log("Submit First!");
    }
  };

  const dispatch = useDispatch();
  const handleNavigate = (screen) => {
    if (screen == "SignUp") {
      navigation.push("SignUp");
    } else if (screen == "Login") {
      if (firstSubmit.current) {
        firstSubmit.current = false;
      }
      const isValid = validate();
      if (isValid) {
        const currentUser = {
          name: "Admin KP",
          email: email,
          role: "Project Manager",
          project: "IOH NPM",
        };
        dispatch(setUser(currentUser));
        navigation.push("ClockIn");
      } else {
        // set firstSubmit back to true to validate only after submit is cliked
        firstSubmit.current = true;
        return null;
      }
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
          <Text
            style={[styles.textFont, { marginBottom: 15, textAlign: "center" }]}
          >
            Login as user
          </Text>

          {/* Email */}
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <View
              style={[
                styles.input,
                active[0] ? styles.inputActive : null,
                errors[0].includes(true) ? styles.inputError : null,
              ]}
            >
              <Icon source="at" size={30} />
              <TextInput
                style={[
                  styles.textFont,
                  { color: "black" },
                  errors[0].includes(true) ? styles.textError : null,
                ]}
                placeholder="Enter your email"
                placeholderTextColor={
                  errors[0].includes(true) ? "red" : "#7F7F7F"
                }
                onFocus={() => handleActiveState(0)}
                onBlur={() => {
                  handleActiveState(0);
                }}
                name="email"
                value={email}
                inputMode="email"
                onChangeText={(e) => setEmail(e)}
              />
            </View>
            <HelperText
              type="error"
              visible={errors[0].includes(true)}
              style={styles.helper}
            >
              {helpers.email[emailHT]}
            </HelperText>
          </View>

          {/* Password */}
          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View
              style={[
                styles.input,
                active[1] ? styles.inputActive : null,
                errors[1].includes(true) ? styles.inputError : null,
              ]}
            >
              <Icon source="lock-outline" size={30} />
              <TextInput
                style={[
                  styles.textFont,
                  { color: "black" },
                  errors[1].includes(true) ? styles.textError : null,
                ]}
                placeholder="Enter your password"
                placeholderTextColor={
                  errors[1].includes(true) ? "red" : "#7F7F7F"
                }
                secureTextEntry={true}
                onFocus={() => handleActiveState(1)}
                onBlur={() => {
                  handleActiveState(1);
                }}
                name="password"
                type="password"
                value={password}
                onChangeText={(e) => setPassword(e)}
              />
            </View>
            <HelperText
              type="error"
              visible={errors[1].includes(true)}
              style={styles.helper}
            >
              {helpers.password[passHT]}
            </HelperText>
          </View>

          {/* Login Button */}
          <ButtonBlue
            label="Login"
            action={() => handleNavigate("Login")}
            marginTop={5}
            marginBottom={40}
          />

          {/* Sign Up Button */}
          <Text style={[styles.textFont, { textAlign: "center" }]}>
            or Sign Up as a new user
          </Text>
          <ButtonClear
            label="Sign Up"
            action={() => handleNavigate("SignUp")}
            marginTop={10}
            marginBottom={70}
          />
          <Text style={[styles.textFont, { textAlign: "center" }]}>
            Powered by
          </Text>
          <Image source={poca} style={[styles.logo, styles.pocaLogo]} />
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}

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
    width: "37%",
    height: "auto",
    aspectRatio: 1 / 1,
    marginBottom: 40,
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
    paddingVertical: 15,
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
  textFont: {
    display: "flex",
    width: "100%",
    fontFamily: "MontserratRegular",
    color: "white",
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
  },
  pocaLogo: {
    width: "10%",
    marginBottom: 0,
    marginTop: 5,
  },
});
