import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Landing from "./app/Landing";
import SignUp from "./app/SignUp";
import MainPage from "./app/MainPage";
import Home from "./app/Home";
import Profile from "./app/Profile";
import Notice from "./app/Notice";
import Notify from "./app/Notify";
import BBMEntry from "./app/BBMEntry";
import Tasks from "./app/Tasks";
import AOREntry from "./app/AOREntry";
import { useFonts } from "expo-font";
import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";
const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    MontserratLight: Montserrat_300Light,
    MontserratRegular: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
    MontserratExtraBold: Montserrat_800ExtraBold,
  });
  if (!fontsLoaded) {
    console.log("Loading fonts...");
    return null;
  } else {
    console.log("Fonts Loaded!");

    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Landing" component={Landing}></Stack.Screen>
          <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
          <Stack.Screen name="MainPage" component={MainPage}></Stack.Screen>
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
          <Stack.Screen name="Notice" component={Notice}></Stack.Screen>
          <Stack.Screen name="Notify" component={Notify}></Stack.Screen>
          <Stack.Screen name="BBMEntry" component={BBMEntry}></Stack.Screen>
          <Stack.Screen name="Tasks" component={Tasks}></Stack.Screen>
          <Stack.Screen name="AOREntry" component={AOREntry}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
