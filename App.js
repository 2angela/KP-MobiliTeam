import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./app/Home";
import Landing from "./app/Landing";
import Notice from "./app/Notice";
import {
  useFonts,
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
    MontserratThin: Montserrat_300Light,
    MonserratRegular: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
    MontserratBold: Montserrat_700Bold,
    MontserratExtraBold: Montserrat_800ExtraBold,
    MontserratSemiBold: Montserrat_600SemiBold,
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
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen name="Notice" component={Notice}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
