import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
} from "react-native";
import { HelperText, Icon } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ButtonBlue from "../components/buttonBlue";
import ButtonClear from "../components/buttonClear";
import background from "../assets/landing-photo.png";
import logo from "../assets/app-logo.png";
import poca from "../assets/poca-logo.png";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const numOfField = 2; // set number of fields in the screen with active/inactive states
  const numOfErrors = 2; // set number of fields in the screen with error conditions
  const [active, setActive] = useState(Array(numOfField).fill(false));
  const [errors, setErrors] = useState(Array(numOfErrors).fill(false));

  const handleActiveState = (index) => {
    const newActive = active.map((item, i) => (i == index ? !item : item)); // change state of the item to the opposite
    setActive(newActive);
  };
  const handleError = (index) => {
    const newErrors = active.map((item, i) => (i == index ? !item : item)); // change state of the item to the opposite
    setErrors(newErrors);
  };

  const validate = () => {
    //handle credential validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || regex.test(email) == false) {
      handleError(0);
      // console.error("Email is required");
      // console.log("state email:", active[0]);
      return false;
    }
    if (!password) {
      handleError(1);
      // console.error("Password is required");
      // console.log("state password", active[1]);
      return false;
    } else {
      // console.log(regex.test(email));
      // console.log("state email:", active[0]);
      // console.log("state password", active[1]);
      navigation.push("Home");
      return true;
    }
  };

  const handleLogin = () => {
    if (validate() == true) {
      return navigation.push("Home");
    } else return null;
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.background}
      >
        <SafeAreaView style={styles.container2}>
          <Image source={logo} style={styles.logo} resizeMode="fill" />
          <Text style={[styles.textFont, { marginBottom: 15 }]}>
            Login as user
          </Text>

          {/* Email */}
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <View
              style={[
                styles.input,
                active[0] ? styles.inputActive : null,
                errors[0] ? styles.inputError : null,
              ]}
            >
              <Icon source="at" size={30} />
              <TextInput
                style={[
                  styles.textFont,
                  { color: "black" },
                  errors[0] ? styles.textError : null,
                ]}
                placeholder="Enter your email"
                placeholderTextColor={errors[0] ? "red" : "black"}
                onFocus={() => handleActiveState(0)}
                onBlur={() => handleActiveState(0)}
                name="email"
                value={email}
                inputMode="email"
                onChangeText={(e) => setEmail(e)}
              />
            </View>
            <HelperText type="error" visible={errors[0]} style={styles.helper}>
              Poca email is required
            </HelperText>
          </View>

          {/* Password */}
          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View
              style={[
                styles.input,
                active[1] ? styles.inputActive : null,
                errors[1] ? styles.inputError : null,
              ]}
            >
              <Icon source="lock-outline" size={30} />
              <TextInput
                style={[
                  styles.textFont,
                  { color: "black" },
                  errors[1] ? styles.textError : null,
                ]}
                placeholder="Enter your password"
                placeholderTextColor={errors[1] ? "red" : "black"}
                secureTextEntry={true}
                onFocus={() => handleActiveState(1)}
                onBlur={() => handleActiveState(1)}
                name="password"
                type="password"
                value={password}
                onChangeText={(e) => setPassword(e)}
              />
            </View>
            <HelperText type="error" visible={errors[1]} style={styles.helper}>
              Password is required
            </HelperText>
          </View>

          {/* Login Button */}
          <ButtonBlue
            label="Login"
            action={handleLogin}
            marginTop={5}
            marginBottom={40}
          />

          {/* Sign Up Button */}
          <Text style={styles.textFont}>or Sign Up as a new user</Text>
          <ButtonClear
            label="Sign Up"
            action={null}
            marginTop={10}
            marginBottom={70}
          />
          <Text style={styles.textFont}>Powered by</Text>
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
    backgroundColor: "rgba(255, 255, 255, 0.5)",
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
  },
  pocaLogo: {
    width: "10%",
    marginBottom: 0,
    marginTop: 5,
  },
});
